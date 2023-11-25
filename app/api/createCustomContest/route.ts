import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  //   console.log(body);
  const { name, authorId, startTime, duration, problemIds, participantIds } =
    body;
  console.log(name, authorId, startTime, duration, problemIds, participantIds);
  const author = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
  });
  const contest = await prisma.contest.create({
    data: {
      name: name,
      authorId: authorId,
      authorName: author?.name!,
      startTime: startTime,
      duration: duration,
      problems: {
        connect: problemIds.map((id: string) => ({ id })),
      },
      participants: {
        connect: participantIds.map((id: string) => ({ id })),
      },
    },
  });
  return NextResponse.json(contest, { status: 200 });
}
