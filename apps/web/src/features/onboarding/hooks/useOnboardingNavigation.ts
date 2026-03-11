import { useLocation, useNavigate } from "@tanstack/react-router";
import { ONBOARDING_STEPS, type OnboardingStep } from "../constants";

export function useOnboardingNavigation() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const currentIndex = ONBOARDING_STEPS.indexOf(pathname as OnboardingStep);
	const previousStep =
		currentIndex > 0 ? ONBOARDING_STEPS[currentIndex - 1] : undefined;
	const nextStep =
		currentIndex < ONBOARDING_STEPS.length - 1
			? ONBOARDING_STEPS[currentIndex + 1]
			: undefined;

	return {
		goBack: previousStep ? () => navigate({ to: previousStep }) : undefined,
		goContinue: nextStep ? () => navigate({ to: nextStep }) : undefined,
	};
}
