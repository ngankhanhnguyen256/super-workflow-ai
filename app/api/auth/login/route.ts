import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

// MVP fake user DB (replace with real DB later)
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

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Login failed", detail: err.message },
      { status: 500 }
    );
  }
}
