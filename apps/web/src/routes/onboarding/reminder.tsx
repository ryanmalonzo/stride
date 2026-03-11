import { createFileRoute } from "@tanstack/react-router";
import { OnboardingReminderPage } from "../../features/onboarding";

export const Route = createFileRoute("/onboarding/reminder")({
	component: OnboardingReminderPage,
});
