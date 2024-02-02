import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const userVideos = await db.video.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const userVideosWithChapters = await Promise.all(
      userVideos.map(async (video) => {
        const chapters = await db.chapter.findMany({
          where: {
            videoId: video.id,
          },
        });
        return {
          ...video,
          chapters,
        };
      })
    );

    return NextResponse.json({
      videos: userVideosWithChapters,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const {
      userDetails: { name },
    } = await req.json();

    if (!session) {
      return NextResponse.error();
    }

    const mutation = await db.user.update({
      data: {
        name,
      },
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json({ data: mutation });
  } catch (error) {
    return NextResponse.error();
  }
}
