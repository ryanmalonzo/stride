import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	COOKIE_SECRET: z.string().min(1),
	DATABASE_URL: z.url(),
});

export const env = EnvSchema.parse(process.env);
