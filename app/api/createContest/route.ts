import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { copyFileSync } from "fs";
interface CodeforcesProblem {
  contestId: number;
  index: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  //   console.log(body);
  const { name, authorId, startTime, duration, participantIds, totalProblems } =
    body;
  console.log(
    `Contest Name: ${name}, AuthorId: ${authorId}, startTime: ${startTime}, duration: ${duration}, participantIds: ${participantIds}, totalProblems: ${totalProblems}`
  );
  const author = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
  });

  const allProblems = await prisma.problem.findMany({
    select: {
      id: true,
    },
  });

  let candidates = new Set(allProblems.map((problem) => problem.id));
  console.log(`Total Problems: ${candidates.size}`);
  if (participantIds) {
    for (const participantId of participantIds) {
      const acSubmissions = await prisma.submission.findMany({
        where: {
          userId: participantId,
          verdict: "OK",
        },
        select: {
          problemId: true,
        },
      });
      for (const submission of acSubmissions) {
        candidates.delete(submission.problemId);
      }
    }
  }
  const cfHandles = await prisma.user.findMany({
    where: {
      id: {
        in: participantIds,
      },
    },
    select: {
      cfHandle: true,
    },
  });
  console.log(cfHandles);
  for (const cfHandle of cfHandles) {
    const cfSubmissions = await fetch(
      `https://codeforces.com/api/user.status?handle=${cfHandle.cfHandle}`
    ).then((res) => res.json());
    for (const submission of cfSubmissions.result) {
      if (submission.verdict === "OK") {
        // console.log(`${cfHandle.cfHandle} solved ${submission.problem.name}`);
        candidates.delete(
          `${submission.problem.contestId}${submission.problem.index}`
        );
      }
    }
  }
  console.log(`Candidates: ${candidates.size}`);
  const problemIds = Array.from(candidates)
    .sort(() => Math.random() - 0.5)
    .slice(0, totalProblems);
  console.log(problemIds);
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

  return NextResponse.json({ contestId: contest.id }, { status: 200 });
}
