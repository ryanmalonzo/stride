import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface OnboardingProgressProps {
	currentStep: number;
	totalSteps: number;
	className?: string;
}

export function OnboardingProgressBar({
	currentStep,
	totalSteps,
	className,
}: OnboardingProgressProps) {
	const { t } = useTranslation("onboarding");
	const progress = currentStep / totalSteps;

	return (
		<div className={twMerge("flex w-full max-w-xs flex-col gap-1", className)}>
			<div className="h-1 w-full rounded-full bg-stone-border">
				<div
					className="h-1 rounded-full bg-success transition-[width] duration-400 ease-in-out"
					style={{ width: `${progress * 100}%` }}
				/>
			</div>
			<span className="text-label font-medium text-stone-soft">
				{t("progress.stepLabel", { current: currentStep, total: totalSteps })}
			</span>
		</div>
	);
}
