import ytdl from "ytdl-core";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { videoId } = await req.json();

    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const userVideos = await db.video.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    const videoAlreadyExists = userVideos.some(
      (video) => video.youtubeId === videoId
    );

    if (videoAlreadyExists) {
      return NextResponse.json(
        { message: "Video already exists" },
        {
          status: 409,
        }
      );
    }

    const { videoDetails } = await ytdl.getInfo(videoId);

    await db.video.create({
      data: {
        youtubeId: videoDetails.videoId,
        userId: session?.user.id,
        title: videoDetails.title,
        youtubeURL: videoDetails.video_url,
        chapters: {
          create: videoDetails.chapters?.map((chapter) => ({
            title: chapter.title,
            startTime: chapter.start_time,
          })),
        },
        duration: Number(videoDetails.lengthSeconds),
        thumbnail: videoDetails.thumbnails[3].url,
        author: videoDetails.author.name,
      },
    });

    return NextResponse.json(
      { message: "Video added" },
      {
        status: 200,
      }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { videoId } = await req.json();

    const session = await auth();

    const video = await db.video.findUnique({
      where: {
        id: videoId,
        userId: session?.user.id,
      },
    });

    if (!video) {
      return NextResponse.json(
        { message: "Video not found" },
        {
          status: 404,
        }
      );
    }

    await db.$transaction([
      db.chapter.deleteMany({
        where: {
          videoId,
        },
      }),
      db.video.delete({
        where: {
          userId: session?.user.id,
          id: videoId,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Video deleted" },
      {
        status: 200,
      }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
