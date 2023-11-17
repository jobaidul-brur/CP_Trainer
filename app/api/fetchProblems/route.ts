import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import axios from "axios";
import cheerio from "cheerio";

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
  const ScrapProblem = async (link: string) => {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    const problem_statement = $(
      "div.problem-statement > div:nth-child(2)"
    ).html();
    const input_specification = $(
      ".problem-statement .input-specification"
    ).html();
    const output_specification = $(
      ".problem-statement .output-specification"
    ).html();
    return {
      problem_statement,
      input_specification,
      output_specification,
    };
  };

  for (const problem of problems["result"]["problems"].slice(0, 100)) {
    const problemId = `${problem["contestId"]}${problem["index"]}`;
    const problem_link = `https://codeforces.com/problemset/problem/${problem["contestId"]}/${problem["index"]}`;
    const { problem_statement, input_specification, output_specification } =
      await ScrapProblem(problem_link);

    await prisma.problem.upsert({
      where: {
        id: problemId,
      },
      update: {
        name: `${problem["name"]} updated`,
        rating: problem["rating"],
        problem_statement,
        input_specification,
        output_specification,
      },
      create: {
        id: problemId,
        contestId: problem["contestId"],
        index: problem["index"],
        name: problem["name"],
        rating: problem["rating"],
        problem_statement,
        input_specification,
        output_specification,
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
  }

  return NextResponse.json(
    { message: `Fetched ${problems["result"]["problems"].length} problems` },
    { status: 200 }
  );
}
