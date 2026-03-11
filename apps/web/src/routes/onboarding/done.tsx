import { createFileRoute } from "@tanstack/react-router";
import { OnboardingDonePage } from "../../features/onboarding";

export const Route = createFileRoute("/onboarding/done")({
	component: OnboardingDonePage,
});
