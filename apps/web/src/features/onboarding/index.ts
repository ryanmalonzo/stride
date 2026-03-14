export {
	HabitBuildIntentionForm,
	HabitBuildStackForm,
	OnboardingProgressBar,
	OnboardingStepLayout,
} from "./components";
export type { OnboardingStep } from "./constants";
export {
	getNextOnboardingStep,
	getOnboardingStepIndex,
	getPreviousOnboardingStep,
	isOnboardingStep,
	isOnboardingStepUnlocked,
	ONBOARDING_STEPS,
} from "./constants";
export { useOnboardingNavigation } from "./hooks/useOnboardingNavigation";
export {
	OnboardingHabitBuildPage,
	OnboardingHabitTypePage,
	OnboardingIdentityPage,
	OnboardingReminderPage,
	OnboardingStrugglesPage,
	OnboardingTinyPage,
} from "./pages";
export type { OnboardingData } from "./store";
export { useOnboardingStore } from "./store";

export type {
	IdentityId,
	IdentityOption,
	StruggleId,
	StruggleOption,
} from "./types";
