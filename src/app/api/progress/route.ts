import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const videoId = searchParams.get("videoId") ?? "";

  const session = await getServerSession(authOptions);

  const userVideo = await db.video.findUnique({
    where: {
      id: videoId,
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
}

export async function PATCH(req: NextRequest) {
  const { chapterId } = await req.json();

  const mutation = await db.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      completed: true,
    },
  });

  return NextResponse.json({ data: mutation });
}

export async function PUT(req: NextRequest) {
  const { videoId } = await req.json();

  const mutation = await db.chapter.updateMany({
    where: {
      videoId,
    },
    data: {
      completed: false,
    },
  });

  return NextResponse.json({ data: mutation });
}
