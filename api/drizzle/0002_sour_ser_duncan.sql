CREATE TYPE "public"."habit_type" AS ENUM('binary', 'counter', 'duration');--> statement-breakpoint
CREATE TABLE "habit_logs" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"habit_id" char(12) NOT NULL,
	"date" timestamp NOT NULL,
	"value" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"user_id" char(12) NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "habit_type" NOT NULL,
	"configuration" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;