import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export function GET() {
  return getServerSession()
    .then((session) => {
      return db.video.findMany({
        where: {
          userId: session?.user.id,
        },
      });
    })
    .then((userVideos) => {
      return Promise.all(
        userVideos.map((video) => {
          return db.chapter
            .findMany({
              where: {
                videoId: video.id,
              },
            })
            .then((chapters) => {
              return {
                ...video,
                chapters,
              };
            });
        })
      );
    })
    .then((userVideosWithChapters) => {
      return NextResponse.json({ videos: userVideosWithChapters });
    })
    .catch(() => {
      return NextResponse.error();
    });
}
