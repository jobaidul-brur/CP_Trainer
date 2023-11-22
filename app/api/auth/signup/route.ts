import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// i want to create a new user username and password and cfHandle
// i want to check if the username is already taken

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body: ", body);
  const { username, password, cfHandle } = body;
  const user = await prisma.user.findFirst({
    where: { userName: username },
  });
  if (user) {
    console.log("user already exists");
    return NextResponse.json(
      { message: "Username already taken" },
      { status: 400 }
    );
  }
  const newUser = await prisma.user.create({
    data: {
      userName: username,
      password: password,
      cfHandle: cfHandle,
    },
  });

  return NextResponse.json({ message: "User created!" }, { status: 200 });
}
