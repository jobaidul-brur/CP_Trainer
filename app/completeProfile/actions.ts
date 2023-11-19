"use server";

import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { userSchema } from "./schema";
import authOptions from "../api/auth/[...nextauth]/authOptions";

const onSubmit = async (dataStr: string) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session!.user!.email!,
    },
  });

  const jsonData = JSON.parse(dataStr);
  const validation = userSchema.safeParse(jsonData);
  if (!validation.success) {
    throw new Error("Invalid data");
  }
  const data = validation.data;

  await prisma.user.update({
    where: {
      id: user!.id,
    },
    data: {
      cfHandle: data.cfHandle,
      fullName: data.fullName,
    },
  });
  return { ok: true };
};

export { onSubmit };
