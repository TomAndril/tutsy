import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const videoId = searchParams.get("videoId") ?? "";

    const session = await getServerSession(authOptions);

    const userVideo = await db.video.findUnique({
      where: {
        youtubeId: videoId,
        userId: session?.user.id,
      },
    });

    const videoChapters = await db.chapter.findMany({
      where: {
        videoId: userVideo?.id,
      },
      orderBy: {
        startTime: "asc",
      },
    });
    return NextResponse.json({
      ...userVideo,
      chapters: videoChapters,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { chapterId } = await req.json();

    const mutation = await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ data: mutation });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { videoId } = await req.json();

    const mutation = await db.chapter.updateMany({
      where: {
        videoId,
      },
      data: {
        completed: false,
        completedAt: null,
      },
    });

    return NextResponse.json({ data: mutation });
  } catch (error) {
    return NextResponse.error();
  }
}
