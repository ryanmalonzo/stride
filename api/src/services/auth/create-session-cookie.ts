import type { Context } from "hono";
import { setSignedCookie } from "hono/cookie";
import { db } from "../../db";
import { sessionsTable } from "../../db/schema";

const sevenDaysInSeconds = 7 * 24 * 60 * 60;

export async function createSessionCookie(c: Context, userId: string) {
  const [session] = await db
    .insert(sessionsTable)
    .values({
      userId,
      expiresAt: new Date(Date.now() + sevenDaysInSeconds * 1000),
    })
    .returning();

  await setSignedCookie(
    c,
    "session",
    session.token,
    process.env.SESSION_COOKIE_SECRET,
    {
      httpOnly: true,
      maxAge: sevenDaysInSeconds,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    },
  );
}
