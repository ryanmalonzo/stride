import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSession } from "../lib/auth-client";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		const { data: session } = await getSession();
		if (!session) {
			throw redirect({ to: "/sign-in" });
		}
		if (session.user.onboardingCompletedAt) {
			throw redirect({ to: "/dashboard" });
		}
		throw redirect({ to: "/onboarding" });
	},
});
