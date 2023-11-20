import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
interface Props {
  params: {
    id: string;
  };
}
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const submission = await prisma.submission.findUnique({
    where: {
      id,
    },
  });
  if (!submission) {
    return NextResponse.json(
      { message: "Submission not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(submission, { status: 200 });
}
