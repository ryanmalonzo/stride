import { pgTable, varchar } from "drizzle-orm/pg-core";
import { nanoidPrimaryKey, timestamps } from "./common";

export const users = pgTable("users", {
  id: nanoidPrimaryKey(),
  email: varchar({ length: 255 }).unique().notNull(),
  hashedPassword: varchar().notNull(),
  ...timestamps(),
});

export type User = typeof users.$inferSelect;
