import { char, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const ID_LENGTH = 12;

export const nanoidPrimaryKey = () =>
  char({ length: ID_LENGTH })
    .$defaultFn(() => nanoid(ID_LENGTH))
    .primaryKey()
    .notNull();

export const timestamps = () => ({
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
