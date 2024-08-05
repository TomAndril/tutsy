import { getVideoId } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req: NextRequest) {
  console.log("reached route");

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
        stack: err.stack,
        cause: err.cause,
        name: err.name,
      },
      {
        status: 500,
      }
    );
  }
}
