import { relations } from "drizzle-orm";
import { char, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const ID_LENGTH = 12;

export const users = pgTable("users", {
  id: char({ length: ID_LENGTH })
    .$defaultFn(() => nanoid(ID_LENGTH))
    .primaryKey()
    .notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  hashedPassword: varchar().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  token: char({ length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey()
    .notNull(),
  userId: char({ length: ID_LENGTH })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp().notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export type User = typeof users.$inferSelect;
