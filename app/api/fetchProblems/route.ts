import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ScrapProblem from "./scrap";

export async function GET(request: NextRequest) {
  const res = await fetch("https://codeforces.com/api/problemset.problems", {
    cache: "no-store",
  });
  if (res["status"] !== 200) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }

  const problems = await res.json();
  let cnt = 0;
  for (const problem of problems["result"]["problems"]) {
    if (problem["contestId"] > 959) continue;
    const problemId = `${problem["contestId"]}${problem["index"]}`;
    const problem_link = `https://codeforces.com/problemset/problem/${problem["contestId"]}/${problem["index"]}`;
    const {
      time_limit,
      memory_limit,
      problem_statement,
      input_specification,
      output_specification,
      sample_tests,
      note,
    } = await ScrapProblem(problem_link);

    await prisma.problem.upsert({
      where: {
        id: problemId,
      },
      update: {
        name: `${problem["name"]}`,
        rating: problem["rating"],
        time_limit: time_limit,
        memory_limit: memory_limit,
        problem_statement: problem_statement,
        input_specification: input_specification,
        output_specification: output_specification,
        sample_tests: sample_tests,
        note: note,
      },
      create: {
        id: problemId,
        contestId: problem["contestId"],
        index: problem["index"],
        name: problem["name"],
        rating: problem["rating"],
        time_limit: time_limit,
        memory_limit: memory_limit,
        problem_statement: problem_statement,
        input_specification: input_specification,
        output_specification: output_specification,
        sample_tests: sample_tests,
        note: note,
      },
    });
    for (const tag of problem["tags"]) {
      const tagId = `${problemId}${tag}`;
      await prisma.tag.upsert({
        where: {
          id: tagId,
        },
        update: {
          name: tag,
          problemId: problemId,
        },
        create: {
          id: tagId,
          name: tag,
          problemId: problemId,
        },
      });
    }
    console.log(`Problem ${problemId} updated`);
    cnt++;
    if (cnt == 50) break;
  }
  console.log("All problems updated");

  return NextResponse.json(
    { message: `Fetched ${problems["result"]["problems"].length} problems` },
    { status: 200 }
  );
}
