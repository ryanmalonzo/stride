import { createFileRoute } from "@tanstack/react-router";
import { OnboardingHabitTypePage } from "../../pages/onboarding/OnboardingHabitTypePage";

export const Route = createFileRoute("/onboarding/habit-type")({
	component: OnboardingHabitTypePage,
});
