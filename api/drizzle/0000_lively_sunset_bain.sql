CREATE TABLE "sessions" (
	"token" char(36) PRIMARY KEY NOT NULL,
	"userId" char(12) NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"hashedPassword" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;