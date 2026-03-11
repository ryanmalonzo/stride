export const ONBOARDING_STEPS = [
	"/onboarding/identity",
	"/onboarding/struggles",
	"/onboarding/habit-type",
	"/onboarding/habit-build",
	"/onboarding/tiny",
	"/onboarding/reminder",
	"/onboarding/done",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
