import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const videoId = searchParams.get("videoId") ?? "";

  const { videoDetails } = await ytdl.getInfo(videoId);

  return NextResponse.json({ videoDetails });
}
