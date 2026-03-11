import { createFileRoute } from "@tanstack/react-router";
import { OnboardingHabitTypePage } from "../../features/onboarding";

export const Route = createFileRoute("/onboarding/habit-type")({
	component: OnboardingHabitTypePage,
});
