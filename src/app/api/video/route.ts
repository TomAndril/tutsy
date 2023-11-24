import ytdl from "ytdl-core";

import { getVideoId } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const videoId = searchParams.get("videoId") ?? "";

    const parsedVideoId = getVideoId(videoId);

    const { videoDetails } = await ytdl.getInfo(parsedVideoId);

    return NextResponse.json({ videoDetails });
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

export async function POST(req: NextRequest) {
  try {
    const { videoId } = await req.json();

    const session = await getServerSession(authOptions);

    const videoAlreadyExists = await db.video.findUnique({
      where: {
        id: videoId,
        userId: session?.user.id,
      },
    });

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

    const session = await getServerSession(authOptions);

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
