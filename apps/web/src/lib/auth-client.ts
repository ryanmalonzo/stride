import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "../env";

export const { signIn, signUp, useSession, getSession } = createAuthClient({
	baseURL: env.VITE_API_URL,
	plugins: [
		inferAdditionalFields({
			user: {
				onboardingCompletedAt: {
					type: "date",
					required: false,
					defaultValue: null,
					input: false,
				},
			},
		}),
	],
});
