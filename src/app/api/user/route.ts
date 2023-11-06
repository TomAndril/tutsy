import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  const userVideos = await db.video.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const userVideosWithChapters = await Promise.all(
    userVideos.map(async (video) => {
      const chapters = await db.chapter.findMany({
        where: {
          videoId: video.id,
        },
      });
      return {
        ...video,
        chapters,
      };
    })
  );

  return NextResponse.json({ videos: userVideosWithChapters });
}
