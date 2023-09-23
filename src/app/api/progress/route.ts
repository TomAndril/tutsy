import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const videoId = searchParams.get("videoId") ?? "";

  const session = await getServerSession(authOptions);

  const userId = await db.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  const userVideo = await db.video.findUnique({
    where: {
      id: videoId,
      userId: userId?.id,
    },
  });

  const videoChapters = await db.chapter.findMany({
    where: {
      videoId: userVideo?.id,
    },
  });
  return NextResponse.json({
    ...userVideo,
    chapters: videoChapters,
  });
}
