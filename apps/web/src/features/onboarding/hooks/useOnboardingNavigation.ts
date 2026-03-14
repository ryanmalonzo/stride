import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	getNextOnboardingStep,
	getPreviousOnboardingStep,
	isOnboardingStep,
} from "../constants";
import { useOnboardingStore } from "../store";

export function useOnboardingNavigation() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const setUnlockedStep = useOnboardingStore((state) => state.setUnlockedStep);

	const currentStep = isOnboardingStep(pathname) ? pathname : undefined;
	const previousStep = currentStep
		? getPreviousOnboardingStep(currentStep)
		: undefined;
	const nextStep = currentStep ? getNextOnboardingStep(currentStep) : undefined;

	return {
		goBack: previousStep ? () => navigate({ to: previousStep }) : undefined,
		goContinue: nextStep
			? () => {
					setUnlockedStep(nextStep);
					navigate({ to: nextStep });
				}
			: undefined,
	};
}
