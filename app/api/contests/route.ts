import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const contests = await prisma.contest.findMany({
    orderBy: {
      startTime: "desc",
    },
  });

  return NextResponse.json(contests, { status: 200 });
}
