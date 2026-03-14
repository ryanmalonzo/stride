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

export function isOnboardingStep(path: string): path is OnboardingStep {
	return (ONBOARDING_STEPS as readonly string[]).includes(path);
}

export function getOnboardingStepIndex(step: OnboardingStep) {
	return ONBOARDING_STEPS.indexOf(step);
}

export function getPreviousOnboardingStep(step: OnboardingStep) {
	const index = getOnboardingStepIndex(step);

	return index > 0 ? ONBOARDING_STEPS[index - 1] : undefined;
}

export function getNextOnboardingStep(step: OnboardingStep) {
	const index = getOnboardingStepIndex(step);

	return index < ONBOARDING_STEPS.length - 1
		? ONBOARDING_STEPS[index + 1]
		: undefined;
}

export function isOnboardingStepUnlocked(
	step: OnboardingStep,
	unlockedStep: OnboardingStep,
) {
	return getOnboardingStepIndex(step) <= getOnboardingStepIndex(unlockedStep);
}
