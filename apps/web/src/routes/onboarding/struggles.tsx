import { createFileRoute } from "@tanstack/react-router";
import { OnboardingStrugglesPage } from "../../features/onboarding";

export const Route = createFileRoute("/onboarding/struggles")({
	component: OnboardingStrugglesPage,
});
