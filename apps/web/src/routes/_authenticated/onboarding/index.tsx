import { createFileRoute, redirect } from "@tanstack/react-router";
import { useOnboardingStore } from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding/")({
	beforeLoad: () => {
		throw redirect({ to: useOnboardingStore.getState().unlockedStep });
	},
});
