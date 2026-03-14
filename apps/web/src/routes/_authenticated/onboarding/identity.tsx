import { createFileRoute } from "@tanstack/react-router";
import { OnboardingIdentityPage } from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding/identity")({
	component: OnboardingIdentityPage,
});
