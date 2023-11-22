import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  code: z.string(),
  problemId: z.string(),
  languageId: z.string(),
  userId: z.string(),
  contestID: z.string(),
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
  const { code, problemId, languageId, userId, contestID } = schema.parse(body);
  console.log(code, problemId, languageId);
  const remoteRunID: string = await submitCode(code, problemId, languageId);
  console.log("REmote run id", remoteRunID);
  if (remoteRunID === "error") {
    return NextResponse.json({ message: "Error!" }, { status: 500 });
  }

  // sleep for 5 seconds
  await new Promise((r) => setTimeout(r, 5000));

  const res = await fetch(
    "https://codeforces.com/api/user.status?handle=marjia321&from=1&count=10"
  );
  const data = await res.json();
  if (data.status !== "OK") {
    return NextResponse.json({ message: "Error!" }, { status: 500 });
  }
  const verdict: string = data.result[0].verdict;
  const time: number = data.result[0].timeConsumedMillis;
  const memory: number = data.result[0].memoryConsumedBytes;

  console.log(verdict);
  console.log(time);
  console.log(memory);
  if (verdict === "Pending") {
    return NextResponse.json({ message: "Error!" }, { status: 500 });
  }

  const newSubmission = await prisma.submission.create({
    data: {
      remoteRunId: remoteRunID,
      problemId: problemId,
      userId: userId,
      contestId: contestID,
      verdict: verdict,
      language: languageId,
      sourceCode: code,
      time: time,
      memory: memory,
    },
  });
  return NextResponse.json(
    { message: "Submitted!", id: newSubmission.id },
    { status: 200 }
  );
}
