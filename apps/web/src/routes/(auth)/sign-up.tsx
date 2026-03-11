import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpPage } from "../../features/auth";
import { getSession } from "../../lib/auth-client";

export const Route = createFileRoute("/(auth)/sign-up")({
	beforeLoad: async () => {
		const { data: session } = await getSession();
		if (!session) {
			return;
		}
		if (session.user.onboardingCompletedAt) {
			throw redirect({ to: "/dashboard" });
		}
		throw redirect({ to: "/onboarding" });
	},
	component: SignUpPage,
});
