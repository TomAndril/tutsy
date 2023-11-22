import { NextRequest, NextResponse } from "next/server";
import ytsr from "ytsr";
import ytdl from "ytdl-core";
import { VideoSearchResult } from "@/types/video";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");
  let searchResults;
  try {
    searchResults = await ytsr.getFilters(query as string);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }

  const filter = searchResults.get("Type")?.get("Video");

  let result;
  try {
    result = await ytsr(filter?.url as string, {
      safeSearch: true,
      limit: 20,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }

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
  let videosRequests;
  try {
    videosRequests = await Promise.all(
      ids.map((id) => ytdl.getInfo(id as string))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }

  const parsedVideos = videosRequests
    .filter((result) => result.videoDetails.chapters.length > 0)
    .map((video) => {
      return {
        author: video.videoDetails.author,
        chapters: video.videoDetails.chapters,
        description: video.videoDetails.description,
        lengthSeconds: video.videoDetails.lengthSeconds,
        thumbnails: video.videoDetails.thumbnails,
        title: video.videoDetails.title,
        videoId: video.videoDetails.videoId,
        video_url: video.videoDetails.video_url,
        viewCount: video.videoDetails.viewCount,
        category: video.videoDetails.category,
        publishDate: video.videoDetails.publishDate,
      } as VideoSearchResult;
    });

  return NextResponse.json({
    data: parsedVideos,
  });
}
