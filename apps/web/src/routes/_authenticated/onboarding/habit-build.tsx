import { createFileRoute } from "@tanstack/react-router";
import { OnboardingHabitBuildPage } from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding/habit-build")({
	component: OnboardingHabitBuildPage,
});
