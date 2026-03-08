import { useTranslation } from "react-i18next";

interface OnboardingProgressProps {
	currentStep: number;
	totalSteps: number;
}

export function OnboardingProgress({
	currentStep,
	totalSteps,
}: OnboardingProgressProps) {
	const { t } = useTranslation("onboarding");
	const progress = currentStep / totalSteps;

	return (
		<div className="flex w-full max-w-xs flex-col gap-1">
			<div className="h-0.75 w-full rounded-full bg-stone-border">
				<div
					className="h-0.75 rounded-full bg-success transition-[width] duration-400 ease-in-out"
					style={{ width: `${progress * 100}%` }}
				/>
			</div>
			<span className="text-[11px] font-medium text-stone-soft">
				{t("progress.stepLabel", { current: currentStep, total: totalSteps })}
			</span>
		</div>
	);
}
