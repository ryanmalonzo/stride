import {
	createFileRoute,
	Outlet,
	redirect,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ErrorFallback } from "../../../components/ErrorFallback";
import { Navbar } from "../../../components/Navbar";
import {
	getOnboardingStepIndex,
	isOnboardingStep,
	isOnboardingStepUnlocked,
	ONBOARDING_STEPS,
	OnboardingProgressBar,
	useOnboardingStore,
} from "../../../features/onboarding";

export const Route = createFileRoute("/_authenticated/onboarding")({
	beforeLoad: ({ context }) => {
		if (context.session?.user.onboardingCompletedAt) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: OnboardingLayout,
	errorComponent: ErrorFallback,
});

function OnboardingLayout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation("onboarding");
	const unlockedStep = useOnboardingStore((state) => state.unlockedStep);

	useEffect(() => {
		if (!isOnboardingStep(pathname)) {
			navigate({ to: unlockedStep, replace: true });
			return;
		}

		if (!isOnboardingStepUnlocked(pathname, unlockedStep)) {
			navigate({ to: unlockedStep, replace: true });
		}
	}, [navigate, pathname, unlockedStep]);

	const stepIndex = isOnboardingStep(pathname)
		? getOnboardingStepIndex(pathname)
		: getOnboardingStepIndex(unlockedStep);
	const totalSteps = ONBOARDING_STEPS.length - 1;
	const currentStep = stepIndex + 1;

	return (
		<div className="flex min-h-screen flex-col bg-cream">
			<Navbar
				right={
					<OnboardingProgressBar
						currentStep={currentStep}
						totalSteps={totalSteps}
						className="hidden lg:flex"
					/>
				}
			/>
			<div className="flex justify-center px-6 pt-10 lg:hidden">
				<p className="w-full max-w-140 text-[11px] font-bold uppercase tracking-widest text-success">
					{t("progress.stepLabel", { current: currentStep, total: totalSteps })}
				</p>
			</div>
			<Outlet />
		</div>
	);
}
