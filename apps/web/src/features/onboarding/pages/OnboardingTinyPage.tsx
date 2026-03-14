import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { InputWithLabel } from "../../../components/InputWithLabel";
import { Callout } from "../../../components/ui/Callout";
import { OnboardingStepLayout } from "../components/OnboardingStepLayout";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../store";

export function OnboardingTinyPage() {
	const navigate = useNavigate();
	const { t } = useTranslation("onboarding");
	const { goBack, goContinue } = useOnboardingNavigation();
	const { data, setData } = useOnboardingStore();
	const { habitType, intention, stack, tinyVersion } = data;

	useEffect(() => {
		if (habitType === null) {
			navigate({ to: "/onboarding/habit-type" });
		}
	}, [habitType, navigate]);

	if (habitType === null) {
		return null;
	}

	const habitName =
		habitType === "intention"
			? intention.action.trim() || t("tiny.fallbackHabit")
			: stack.newHabit.trim() || t("tiny.fallbackHabit");

	return (
		<OnboardingStepLayout
			title={t("tiny.title")}
			subtitle={t("tiny.subtitle")}
			onBack={goBack}
			onContinue={goContinue}
			isContinueEnabled={tinyVersion.trim().length > 0}
		>
			<div className="flex flex-col">
				<div className="rounded-[12px] border border-stone-border bg-surface px-4 py-3.5">
					<span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.08em] text-stone-soft">
						{t("tiny.habitLabel")}
					</span>
					<p className="text-[15px] font-medium text-bark">{habitName}</p>
				</div>

				<p className="mt-1 text-center text-[18px] leading-none text-stone-hover">
					↓
				</p>

				<div className="mt-1.5">
					<InputWithLabel
						label={t("tiny.inputLabel")}
						placeholder={t("tiny.placeholder")}
						value={tinyVersion}
						onChange={(e) => setData({ tinyVersion: e.target.value })}
						className="py-2.75 text-[14px]"
					/>
				</div>

				<Callout variant="info" className="mt-2">
					<p>{t("tiny.hint")}</p>
				</Callout>
			</div>
		</OnboardingStepLayout>
	);
}
