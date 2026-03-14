import { createFileRoute } from "@tanstack/react-router";
import { OnboardingStrugglesPage } from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding/struggles")({
	component: OnboardingStrugglesPage,
});
