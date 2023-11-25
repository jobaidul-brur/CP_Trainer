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
interface Cell {
  isSolved: boolean;
  problemId: string;
  solveAt: Date;
  waCnt: number;
}
interface Row {
  userId: string;
  userName: string;
  solveCnt: number;
  totalPenalty: number;
  cells: Cell[];
}

export async function POST(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const { rank } = body;
  console.log(rank);
  const contest = await prisma.contest.findUnique({
    where: {
      id,
    },
    include: {
      problems: {
        select: {
          id: true,
        },
      },
      participants: {
        select: {
          id: true,
          userName: true,
        },
      },
    },
  });
  if (!contest) {
    return NextResponse.json({ message: "Contest not found" }, { status: 404 });
  }
  let result = [];
  for (const participant of contest.participants) {
    let solveCnt = 0;
    let totalPenalty = 0;

    let cells = [];
    for (const problem of contest.problems) {
      const submissions = await prisma.submission.findMany({
        where: {
          contestId: contest.id,
          userId: participant.id,
          problemId: problem.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      let waCnt = 0;
      let isAC = false;
      for (const submission of submissions) {
        if (submission.verdict === "OK") {
          isAC = true;
          cells.push({
            isSolved: isAC,
            problemId: problem.id,
            solveAt: new Date(
              new Date(submission.createdAt).getTime() -
                new Date(contest.startTime!).getTime()
            ),
            waCnt: waCnt,
          });
          console.log(new Date(submission.createdAt).toISOString());
          console.log(new Date(contest.startTime!).toISOString());
          console.log(new Date(submission.createdAt).getTime());
          console.log(new Date(contest.startTime!).getTime());
          console.log(
            new Date(submission.createdAt).getTime() -
              new Date(contest.startTime!).getTime()
          );
          totalPenalty +=
            Math.floor(
              (new Date(submission.createdAt).getTime() -
                new Date(contest.startTime!).getTime()) /
                1000 /
                60
            ) +
            waCnt * 20;
          break;
        }
        waCnt++;
      }
      if (isAC) {
        solveCnt++;
      } else {
        cells.push({
          isSolved: isAC,
          problemId: problem.id,
          waCnt: waCnt,
          solveAt: new Date(),
        });
      }
    }
    result.push({
      userId: participant.id,
      userName: participant.userName,
      solveCnt: solveCnt,
      totalPenalty: totalPenalty,
      cells: cells,
    });
  }
  result.sort((a, b) => {
    if (a.solveCnt === b.solveCnt) {
      return a.totalPenalty - b.totalPenalty;
    }
    return b.solveCnt - a.solveCnt;
  });
  return NextResponse.json(result, { status: 200 });
}
