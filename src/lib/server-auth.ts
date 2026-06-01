import crypto from "node:crypto";
import { cookies } from "next/headers";

import type { AuthUser } from "@/lib/auth";

export const SESSION_COOKIE = "scribbled_session";

function sessionSecret() {
  return (
    process.env.AUTH_SECRET ??
    process.env.DATABASE_URL ??
    "scribbled-local-dev-session-secret"
  );
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionValue(user: AuthUser) {
  const payload = Buffer.from(JSON.stringify(user), "utf8").toString(
    "base64url",
  );
  return `${payload}.${sign(payload)}`;
}

export function parseSessionValue(value?: string): AuthUser | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");

  if (!payload || !signature || signature !== sign(payload)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AuthUser;

    if (!parsed.username || !parsed.email || !parsed.name) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return parseSessionValue(cookieStore.get(SESSION_COOKIE)?.value);
}
