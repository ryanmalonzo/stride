import { createFileRoute } from "@tanstack/react-router";
import { OnboardingTinyPage } from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding/tiny")({
	component: OnboardingTinyPage,
});
