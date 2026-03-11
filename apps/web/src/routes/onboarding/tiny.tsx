import { createFileRoute } from "@tanstack/react-router";
import { OnboardingTinyPage } from "../../features/onboarding";

export const Route = createFileRoute("/onboarding/tiny")({
	component: OnboardingTinyPage,
});
