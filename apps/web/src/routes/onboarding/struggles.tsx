import { createFileRoute } from "@tanstack/react-router";
import { OnboardingStrugglesPage } from "../../pages/onboarding/OnboardingStrugglesPage";

export const Route = createFileRoute("/onboarding/struggles")({
	component: OnboardingStrugglesPage,
});
