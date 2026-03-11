import { useTranslation } from "react-i18next";
import { CueCard } from "../../../components/ui/CueCard";
import { OnboardingStepLayout } from "../components/OnboardingStepLayout";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../store";

const EMPTY_INTENTION = {
	action: "",
	time: "",
	specificTime: "",
	location: "",
	otherLocation: "",
};

const EMPTY_STACK = {
	anchor: "",
	newHabit: "",
};

export function OnboardingHabitTypePage() {
	const { t } = useTranslation("onboarding");
	const { goBack, goContinue } = useOnboardingNavigation();
	const { data, setData } = useOnboardingStore();
	const { habitType } = data;

	function selectHabitType(nextHabitType: "intention" | "stack") {
		if (habitType != null && habitType !== nextHabitType) {
			setData({
				habitType: nextHabitType,
				intention: EMPTY_INTENTION,
				stack: EMPTY_STACK,
			});
			return;
		}

		setData({ habitType: nextHabitType });
	}

	return (
		<OnboardingStepLayout
			title={t("habitType.title")}
			subtitle={t("habitType.subtitle")}
			onBack={goBack}
			onContinue={goContinue}
			isContinueEnabled={habitType != null}
		>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<CueCard
					icon="📅"
					title={t("habitType.options.intention.title")}
					description={t("habitType.options.intention.description")}
					example={t("habitType.options.intention.example")}
					selected={habitType === "intention"}
					onClick={() => selectHabitType("intention")}
					selectedLabel={t("habitType.selected")}
				/>

				<CueCard
					icon="🔗"
					title={t("habitType.options.stack.title")}
					description={t("habitType.options.stack.description")}
					example={t("habitType.options.stack.example")}
					selected={habitType === "stack"}
					onClick={() => selectHabitType("stack")}
					selectedLabel={t("habitType.selected")}
				/>
			</div>
		</OnboardingStepLayout>
	);
}
