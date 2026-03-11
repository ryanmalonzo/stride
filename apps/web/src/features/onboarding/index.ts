export {
	HabitBuildIntentionForm,
	HabitBuildStackForm,
	OnboardingProgressBar,
	OnboardingStepLayout,
} from "./components";
export type { OnboardingStep } from "./constants";
export { ONBOARDING_STEPS } from "./constants";
export { useOnboardingNavigation } from "./hooks/useOnboardingNavigation";
export {
	OnboardingDonePage,
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
