import { sql } from "drizzle-orm";
import { char, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const ID_LENGTH = 12;

export const usersTable = pgTable("users", {
  id: char({ length: ID_LENGTH })
    .$defaultFn(() => nanoid(ID_LENGTH))
    .primaryKey()
    .notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  hashedPassword: varchar().notNull(),
  createdAt: timestamp()
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp()
    .notNull()
    .default(sql`now()`),
});

export const sessionsTable = pgTable("sessions", {
  token: char({ length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .notNull(),
  userId: char({ length: ID_LENGTH })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp().notNull(),
});
