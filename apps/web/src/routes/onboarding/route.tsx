import {
	createFileRoute,
	Outlet,
	redirect,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "../../components/Navbar";
import { OnboardingProgressBar } from "../../components/onboarding/OnboardingProgress";
import {
	ONBOARDING_STEPS,
	type OnboardingStep,
} from "../../constants/onboardingSteps";
import { getSession } from "../../lib/auth-client";

export const Route = createFileRoute("/onboarding")({
	beforeLoad: async () => {
		const { data: session } = await getSession();
		if (session?.user.onboardingCompletedAt) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: OnboardingLayout,
});

function isOnboardingStep(path: string): path is OnboardingStep {
	return (ONBOARDING_STEPS as readonly string[]).includes(path);
}

function OnboardingLayout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation("onboarding");

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
