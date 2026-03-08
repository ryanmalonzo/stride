import {
	createFileRoute,
	Outlet,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { OnboardingProgress } from "../../components/onboarding/OnboardingProgress";
import {
	ONBOARDING_STEPS,
	type OnboardingStep,
} from "../../constants/onboardingSteps";

export const Route = createFileRoute("/onboarding")({
	component: OnboardingLayout,
});

function isOnboardingStep(path: string): path is OnboardingStep {
	return (ONBOARDING_STEPS as readonly string[]).includes(path);
}

function OnboardingLayout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isOnboardingStep(pathname)) {
			navigate({ to: ONBOARDING_STEPS[0] });
		}
	}, [pathname, navigate]);

	const stepIndex = isOnboardingStep(pathname)
		? ONBOARDING_STEPS.indexOf(pathname)
		: 0;
	const totalSteps = ONBOARDING_STEPS.length - 1;
	const currentStep = stepIndex + 1;

	return (
		<div className="flex min-h-screen flex-col bg-cream">
			<Navbar
				right={
					<OnboardingProgress
						currentStep={currentStep}
						totalSteps={totalSteps}
					/>
				}
			/>
			<Outlet />
		</div>
	);
}
