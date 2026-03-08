import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Navbar } from "../../components/Navbar";
import { OnboardingProgress } from "../../components/onboarding/OnboardingProgress";
import { ONBOARDING_STEPS } from "../../constants/onboardingSteps";

export const Route = createFileRoute("/onboarding")({
	component: OnboardingLayout,
});

function OnboardingLayout() {
	const { pathname } = useLocation();

	const stepIndex = ONBOARDING_STEPS.indexOf(
		pathname as (typeof ONBOARDING_STEPS)[number],
	);
	const totalSteps = ONBOARDING_STEPS.length - 1;
	const currentStep = Math.max(stepIndex, 0) + 1;

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
