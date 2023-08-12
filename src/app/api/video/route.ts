import ytdl from "ytdl-core";

import { getVideoId } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const videoId = searchParams.get("videoId") ?? "";

  const parsedVideoId = getVideoId(videoId);

  const { videoDetails } = await ytdl.getInfo(parsedVideoId);

  return NextResponse.json({ videoDetails });
}
