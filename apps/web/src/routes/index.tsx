import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	beforeLoad: ({ context }) => {
		if (!context.session) {
			throw redirect({ to: "/sign-in" });
		}
		if (context.session.user.onboardingCompletedAt) {
			throw redirect({ to: "/dashboard" });
		}
		throw redirect({ to: "/onboarding" });
	},
});
