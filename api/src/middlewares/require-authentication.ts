import type { Context, Next } from "hono";
import { deleteCookie, getSignedCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import type { User } from "../db/schema";

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
    if (sessionToken === false) {
      deleteCookie(c, "session");
    }
    return c.body(null, StatusCodes.UNAUTHORIZED);
  }

  const session = await db.query.sessions.findFirst({
    where: (sessions, { and, eq, gt }) =>
      and(eq(sessions.token, sessionToken), gt(sessions.expiresAt, new Date())),
    with: {
      user: true,
    },
  });

  if (!session) {
    deleteCookie(c, "session");
    return c.body(null, StatusCodes.UNAUTHORIZED);
  }

  c.set("user", session.user);

  await next();
});
