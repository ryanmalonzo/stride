import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: ["http://localhost:5173"],
	user: {
		additionalFields: {
			onboardingCompletedAt: {
				type: "date",
				required: false,
				defaultValue: null,
				input: false,
			},
		},
	},
});
