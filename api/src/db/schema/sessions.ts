import { char, pgTable, timestamp } from "drizzle-orm/pg-core";
import { ID_LENGTH } from "./common";
import { users } from "./users";

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
