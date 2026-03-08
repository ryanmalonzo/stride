import { createFileRoute } from "@tanstack/react-router";
import { OnboardingIdentityPage } from "../../pages/onboarding/OnboardingIdentityPage";

export const Route = createFileRoute("/onboarding/identity")({
	component: OnboardingIdentityPage,
});
