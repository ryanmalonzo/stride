import { Hono } from "hono";
import { vValidator } from "@hono/valibot-validator";
import { object, parse, string } from "valibot";
import { db } from "../db";
import { userInsertSchema, usersTable } from "../db/schema";
import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";

const auth = new Hono();

const registerSchema = object({
  email: string(),
  plainPassword: string(),
});
auth.post("/register", vValidator("json", registerSchema), async (c) => {
  const { email, plainPassword } = c.req.valid("json");

  const parsed = parse(userInsertSchema, {
    email,
    hashedPassword: await argon2.hash(plainPassword),
  });

  await db.insert(usersTable).values(parsed);

  return c.body(null, StatusCodes.CREATED);
});

export default auth;
