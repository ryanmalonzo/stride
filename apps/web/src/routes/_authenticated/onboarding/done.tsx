import { createFileRoute } from "@tanstack/react-router";
import { OnboardingDonePage } from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding/done")({
	component: OnboardingDonePage,
});
