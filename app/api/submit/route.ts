import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  code: z.string(),
  problemId: z.string(),
  languageId: z.string(),
});

import { submitCode } from "./test";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  await submitCode("compilation error", "1895F", "54");
  return NextResponse.json({ message: "Submitted!" });
}

// post request
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code, problemId, languageId } = schema.parse(body);
  console.log(code, problemId, languageId);
  const remoteRunID: string = await submitCode(code, problemId, languageId);

  if (remoteRunID === "error") {
    return NextResponse.json({ message: "Error!" }, { status: 500 });
  }

  const newSubmission = await prisma.submission.create({
    data: {
      remoteRunId: remoteRunID,
      problemId: problemId,
      userId: "clp2in1yf0000nqxcvcdx0tx7",
      contestId: "practice",
      verdict: "Pending",
      language: languageId,
      sourceCode: code,
      time: 0,
      memory: 0,
    },
  });
  return NextResponse.json(
    { message: "Submitted!", id: newSubmission.id },
    { status: 200 }
  );
}
