import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export interface UserPayload {
  id: string;
  email: string;
}

export function signToken(payload: UserPayload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): UserPayload | null {
  try {
    const [header, body, signature] = token.split(".");

    const expectedSig = crypto
      .createHmac("sha256", SECRET)
      .update(`${header}.${body}`)
      .digest("base64url");

    if (expectedSig !== signature) return null;

    return JSON.parse(Buffer.from(body, "base64url").toString());
  } catch {
    return null;
  }
}
