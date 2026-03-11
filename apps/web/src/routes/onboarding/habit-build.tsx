import { createFileRoute } from "@tanstack/react-router";
import { OnboardingHabitBuildPage } from "../../pages/onboarding/OnboardingHabitBuildPage";

export const Route = createFileRoute("/onboarding/habit-build")({
	component: OnboardingHabitBuildPage,
});
