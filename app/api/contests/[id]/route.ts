import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const contest = await prisma.contest.findUnique({
    where: {
      id,
    },
    include: {
      problems: {
        select: {
          id: true,
          name: true,
          time_limit: true,
          memory_limit: true,
        },
      },
      participants: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!contest) {
    return NextResponse.json({ message: "Contest not found" }, { status: 404 });
  }
  return NextResponse.json(contest, { status: 200 });
}
