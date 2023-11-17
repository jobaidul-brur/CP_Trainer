import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  code: z.string(),
  problemId: z.string(),
  languageId: z.string(),
});

import { submitCode } from "./test";

export async function GET(request: NextRequest) {
  await submitCode("compilation error", "1895F", "54");
  return NextResponse.json({ message: "Submitted!" });
}

// // post request
// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const { code, problemId, languageId } = schema.parse(body);
//   await submitCode(code, problemId, languageId);
//   return NextResponse.json({ message: "Submitted!" });
// }
