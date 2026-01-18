import { and, eq, gt } from "drizzle-orm";
import type { Context, Next } from "hono";
import { deleteCookie, getSignedCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import { sessionsTable, type User, usersTable } from "../db/schema";

export const getSessionToken = async (
  c: Context,
): Promise<string | undefined | false> => {
  return await getSignedCookie(c, process.env.SESSION_COOKIE_SECRET, "session");
};

export const requireAuth = createMiddleware<{
  Variables: {
    user: User;
  };
}>(async (c: Context, next: Next) => {
  const sessionToken = await getSessionToken(c);
  if (!sessionToken) {
    return c.body(null, StatusCodes.UNAUTHORIZED);
  }

  const [session] = await db
    .select()
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(
      and(
        eq(sessionsTable.token, sessionToken),
        gt(sessionsTable.expiresAt, new Date()),
      ),
    );
  if (!session) {
    deleteCookie(c, "session");
    return c.body(null, StatusCodes.UNAUTHORIZED);
  }

  c.set("user", session.users);

  await next();
});
