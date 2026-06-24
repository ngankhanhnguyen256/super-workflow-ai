import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

const USERS = [
  {
    id: "1",
    email: "admin@ai.com",
    password: "123456"
  }
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      email: user.email
    });

    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email
      }
    });

    // ✅ FIX DEPLOY: HttpOnly cookie cho middleware Vercel
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: "Login failed", detail: err.message },
      { status: 500 }
    );
  }
}
