import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function POST(req: Request) {
  const { name } = await req.json();

  const videoDetails = await ytdl.getBasicInfo(
    "https://www.youtube.com/watch?v=xirQ7AMyTM8"
  );

  console.log(videoDetails);

  return NextResponse.json({ details: videoDetails });
}
