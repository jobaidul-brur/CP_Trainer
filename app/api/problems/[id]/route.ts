import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const problem = await prisma.problem.findUnique({
    where: {
      id,
    },
    include: {
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!problem) {
    return NextResponse.json({ message: "Problem not found" }, { status: 404 });
  }
  return NextResponse.json(problem, { status: 200 });
}
