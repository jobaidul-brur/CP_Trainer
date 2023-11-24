import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    await prisma.submission.findMany({
      orderBy: {
        id: "desc",
      },
    })
  );
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { contestId, userId } = body;
  console.log(
    `Querying submissions for contest ${contestId} and user ${userId}`
  );
  if (!contestId || !userId) {
    return NextResponse.json(
      // return 0 row
      await prisma.submission.findMany({
        where: {
          id: "-1",
        },
      })
    );
  }
  return NextResponse.json(
    await prisma.submission.findMany({
      where: {
        contestId: contestId,
        userId: userId,
      },
      orderBy: {
        id: "desc",
      },
    })
  );
}
