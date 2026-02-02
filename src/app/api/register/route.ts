import { prisma } from "@/src/lib/prisma";
import { hashPassword } from "@/src/lib/password";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status: 409 });
  }

  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      auth: {
        create: { password: hashed },
      },
      profile: {
        create: { username },
      },
      roles: {
        create: { role: "USER" },
      },
    },
  });

  return NextResponse.json({ success: true });
}
