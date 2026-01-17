import { Hono } from "hono";
import { vValidator } from "@hono/valibot-validator";
import { object, string } from "valibot";
import { db } from "../db";
import { usersTable } from "../db/schema";
import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { DrizzleQueryError } from "drizzle-orm";
import { SQL } from "bun";

const auth = new Hono();

const registerSchema = object({
  email: string(),
  plainPassword: string(),
});
auth.post("/register", vValidator("json", registerSchema), async (c) => {
  const { email, plainPassword } = c.req.valid("json");

  const hashedPassword = await argon2.hash(plainPassword);

  try {
    await db.insert(usersTable).values({
      email,
      hashedPassword,
    });
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

export default auth;
