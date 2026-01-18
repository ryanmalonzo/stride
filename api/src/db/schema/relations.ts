import { relations } from "drizzle-orm";
import { habitLogs, habits } from "./habits";
import { sessions } from "./sessions";
import { users } from "./users";

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
