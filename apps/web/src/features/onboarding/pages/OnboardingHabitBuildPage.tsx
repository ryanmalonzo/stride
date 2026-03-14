import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HabitBuildIntentionForm } from "../components/HabitBuildIntentionForm";
import { HabitBuildStackForm } from "../components/HabitBuildStackForm";
import { OnboardingStepLayout } from "../components/OnboardingStepLayout";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../store";

export function OnboardingHabitBuildPage() {
	const navigate = useNavigate();
	const { t } = useTranslation("onboarding");
	const { goBack, goContinue } = useOnboardingNavigation();
	const { data, setData } = useOnboardingStore();
	const { habitType, intention, stack } = data;

	useEffect(() => {
		if (habitType === null) {
			navigate({ to: "/onboarding/habit-type" });
		}
	}, [habitType, navigate]);

	if (habitType === null) {
		return null;
	}

	const isContinueEnabled =
		habitType === "intention"
			? intention.action.trim().length > 0 &&
				(intention.time !== "specificTime" ||
					intention.specificTime.trim().length > 0)
			: stack.anchor.trim().length > 0 && stack.newHabit.trim().length > 0;

	return (
		<OnboardingStepLayout
			title={t(`habitBuild.${habitType}.title`)}
			subtitle={t(`habitBuild.${habitType}.subtitle`)}
			onBack={goBack}
			onContinue={goContinue}
			isContinueEnabled={isContinueEnabled}
		>
			{habitType === "intention" ? (
				<HabitBuildIntentionForm
					value={intention}
					onActionChange={(action) =>
						setData({ intention: { ...intention, action } })
					}
					onTimeChange={(time) =>
						setData({ intention: { ...intention, time } })
					}
					onSpecificTimeChange={(specificTime) =>
						setData({ intention: { ...intention, specificTime } })
					}
					onLocationChange={(location) =>
						setData({
							intention: {
								...intention,
								location,
								otherLocation:
									location === "other" ? intention.otherLocation : "",
							},
						})
					}
					onOtherLocationChange={(otherLocation) =>
						setData({ intention: { ...intention, otherLocation } })
					}
				/>
			) : (
				<HabitBuildStackForm
					value={stack}
					onAnchorChange={(anchor) => setData({ stack: { ...stack, anchor } })}
					onNewHabitChange={(newHabit) =>
						setData({ stack: { ...stack, newHabit } })
					}
				/>
			)}
		</OnboardingStepLayout>
	);
}
