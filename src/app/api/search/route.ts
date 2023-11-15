import { NextRequest, NextResponse } from "next/server";
import ytsr from "ytsr";
import ytdl from "ytdl-core";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");
  const searchResults = await ytsr.getFilters(query as string);
  const filter = searchResults.get("Type")?.get("Video");

  const result = await ytsr(filter?.url as string, {
    safeSearch: true,
    limit: 20,
    pages: 1,
  });

  // get the video ids
  const ids = result.items
    .map((item) => {
      if (item.type === "video") {
        if (item.id) {
          return item.id;
        }
      }
    })
    .filter((id) => id !== undefined);

  // get the videos with chapters
  const videosRequests = await Promise.all(
    ids.map((id) => ytdl.getInfo(id as string))
  ).then((results) =>
    results
      .filter((result) => result.videoDetails.chapters.length > 0)
      .map((video) => video.videoDetails)
  );

  return NextResponse.json({
    data: videosRequests.length > 0 ? videosRequests : [],
  });
}
