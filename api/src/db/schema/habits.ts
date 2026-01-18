import {
  char,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ID_LENGTH, nanoidPrimaryKey, timestamps } from "./common";
import { users } from "./users";

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

export const habits = pgTable("habits", {
  id: nanoidPrimaryKey(),
  userId: char({ length: ID_LENGTH })
    .notNull()
    .references(() => users.id),
  name: varchar({ length: 255 }).notNull(),
  type: habitTypesEnum("type").notNull(),
  configuration: jsonb("configuration").$type<HabitConfiguration>().notNull(),
  ...timestamps(),
  deletedAt: timestamp(),
});

export const habitLogs = pgTable("habit_logs", {
  id: nanoidPrimaryKey(),
  habitId: char({ length: ID_LENGTH })
    .notNull()
    .references(() => habits.id),
  date: timestamp().notNull(),
  value: jsonb("value").$type<HabitCompletionValue>().notNull(),
  ...timestamps(),
});
