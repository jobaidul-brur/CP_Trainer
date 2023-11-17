import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  // const res = await fetch("https://codeforces.com/api/problemset.problems", {
  //   cache: "no-store",
  // });
  // if (res["status"] !== 200) {
  //   return NextResponse.json(
  //     { message: "Error fetching data" },
  //     { status: 500 }
  //   );
  // }
  // const problems = await res.json();

  // for (const problem of problems["result"]["problems"]) {
  //   await prisma.problem.upsert({
  //     where: {
  //       id: `${problem["contestId"]}${problem["index"]}`,
  //     },
  //     update: {
  //       name: problem["name"],
  //     },
  //     create: {
  //       id: `${problem["contestId"]}${problem["index"]}`,
  //       contestId: problem["contestId"],
  //       index: problem["index"],
  //       name: problem["name"],
  //     },
  //   });
  // }

  // return NextResponse.json(
  //   { message: `Fetched ${problems["result"]["problems"].length} problems` },
  //   { status: 200 }
  // );

  const problems = await prisma.problem.findMany();
  return NextResponse.json(problems, { status: 200 });
}
