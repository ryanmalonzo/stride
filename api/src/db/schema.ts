import { relations } from "drizzle-orm";
import {
  char,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const ID_LENGTH = 12;

const habitTypes = ["binary", "counter", "duration"] as const;
const habitTypesEnum = pgEnum("habit_type", habitTypes);

type HabitConfiguration =
  | { type: "binary" }
  | { type: "counter"; target: number }
  | { type: "duration"; target: number };

type HabitCompletionValue =
  | { type: "binary"; completed: boolean }
  | { type: "counter"; count: number }
  | { type: "duration"; minutes: number };

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

export const habits = pgTable("habits", {
  id: char({ length: ID_LENGTH })
    .$defaultFn(() => nanoid(ID_LENGTH))
    .primaryKey()
    .notNull(),
  userId: char({ length: ID_LENGTH })
    .notNull()
    .references(() => users.id),
  name: varchar({ length: 255 }).notNull(),
  type: habitTypesEnum("type").notNull(),
  configuration: jsonb("configuration").$type<HabitConfiguration>().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  deletedAt: timestamp(),
});

export const habitLogs = pgTable("habit_logs", {
  id: char({ length: ID_LENGTH })
    .$defaultFn(() => nanoid(ID_LENGTH))
    .primaryKey()
    .notNull(),
  habitId: char({ length: ID_LENGTH })
    .notNull()
    .references(() => habits.id),
  date: timestamp().notNull(),
  value: jsonb("value").$type<HabitCompletionValue>().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  habits: many(habits),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const habitRelations = relations(habits, ({ many, one }) => ({
  habitLogs: many(habitLogs),
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
}));

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, {
    fields: [habitLogs.habitId],
    references: [habits.id],
  }),
}));

export type User = typeof users.$inferSelect;
