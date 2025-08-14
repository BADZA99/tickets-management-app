import { prisma } from "@/prisma/prisma";
// import { ticketSchema } from "@/ValidationSchemas/ticket";
import { userSchema } from "@/ValidationSchemas/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not Unauthorized" }, { status: 401 });
  }
  console.log("session", session);

  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  const duplicateUser = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplicateUser) {
    return NextResponse.json(
      { message: "Username already exists" },
      { status: 400 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(newUser, {
    status: 201,
  });
}
