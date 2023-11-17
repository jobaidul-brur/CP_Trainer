import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    await prisma.problem.findMany({
      orderBy: {
        contestId: "asc",
        // index: "asc",
      },
    })
  );
}
