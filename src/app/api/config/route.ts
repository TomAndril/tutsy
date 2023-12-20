import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const userConfigurations = await db.config.findFirst({
      where: {
        userId: session?.user?.id,
      },
    });

    return NextResponse.json({
      config: userConfigurations,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const { config } = await req.json();

    const isConfigAlreadyExists = await db.config.findFirst({
      where: {
        userId: session?.user?.id,
      },
    });

    if (isConfigAlreadyExists) {
      const mutation = await db.config.update({
        where: {
          userId: session?.user?.id,
        },
        data: {
          ...config,
        },
      });

      return NextResponse.json({
        mutation,
      });
    }

    const mutation = await db.config.create({
      data: {
        ...config,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json({
      mutation,
    });
  } catch (error) {
    return NextResponse.error();
  }
}
