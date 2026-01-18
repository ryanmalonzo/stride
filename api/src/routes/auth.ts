import { Hono } from "hono";
import { vValidator } from "@hono/valibot-validator";
import { object, string } from "valibot";
import { db } from "../db";
import { usersTable } from "../db/schema";
import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { SQL } from "bun";
import { createSessionCookie } from "../services/auth/create-session-cookie";

const auth = new Hono();

const registerSchema = object({
  email: string(),
  plainPassword: string(),
});
auth.post("/register", vValidator("json", registerSchema), async (c) => {
  const { email, plainPassword } = c.req.valid("json");

  const hashedPassword = await argon2.hash(plainPassword);

  try {
    const [user] = await db
      .insert(usersTable)
      .values({
        email,
        hashedPassword,
      })
      .returning();

    await createSessionCookie(c, user.id);
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (error.cause instanceof SQL.PostgresError) {
        // TODO create helper for Postgres error codes
        if (error.cause.errno === "23505") {
          return c.body(null, StatusCodes.CONFLICT);
        }
      }
    }
    return c.body(null, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return c.body(null, StatusCodes.CREATED);
});

const loginSchema = object({
  email: string(),
  plainPassword: string(),
});
auth.post("/login", vValidator("json", loginSchema), async (c) => {
  const { email, plainPassword } = c.req.valid("json");

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (!user) {
    return c.body(null, StatusCodes.UNAUTHORIZED);
  }

  if (await argon2.verify(user.hashedPassword, plainPassword)) {
    await createSessionCookie(c, user.id);
    return c.body(null, StatusCodes.OK);
  }

  return c.body(null, StatusCodes.UNAUTHORIZED);
});

export default auth;
