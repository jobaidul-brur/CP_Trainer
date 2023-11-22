import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// i want to create a new user username and password and cfHandle
// i want to check if the username is already taken

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { username, password } = body;
  const user = await prisma.user.findFirst({
    where: { userName: username, password: password },
  });

  console.log("user: ", user);
  if (user) {
    user.password = "fak";

    return NextResponse.json(
      { message: "User logged inssssssss!", data: user },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Username or password is incorrect" },
    { status: 400 }
  );
}
