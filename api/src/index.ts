import { Hono } from "hono";
import { drizzle } from "drizzle-orm/bun-sql";

const app = new Hono();

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
