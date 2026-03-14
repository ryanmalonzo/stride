import { useTranslation } from "react-i18next";
import { CueCard } from "../../../components/ui/CueCard";
import { OnboardingStepLayout } from "../components/OnboardingStepLayout";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../store";

export function OnboardingReminderPage() {
	const { t } = useTranslation("onboarding");
	const { goBack, goContinue } = useOnboardingNavigation();
	const { data, setData } = useOnboardingStore();
	const { reminder } = data;

	return (
		<OnboardingStepLayout
			title={t("reminder.title")}
			subtitle={t("reminder.subtitle")}
			onBack={goBack}
			onContinue={goContinue}
		>
			<div className="flex flex-col gap-2.5">
				<CueCard
					icon="🔔"
					title={t("reminder.options.browser.title")}
					description={t("reminder.options.browser.description")}
					selected={reminder === "browser"}
					onClick={() =>
						setData({ reminder: reminder === "browser" ? null : "browser" })
					}
					selectedLabel={t("reminder.selected")}
					recommended
					horizontal
				/>

				<CueCard
					icon="⚙️"
					title={t("reminder.options.advanced.title")}
					description={t("reminder.options.advanced.description")}
					selected={reminder === "advanced"}
					onClick={() =>
						setData({ reminder: reminder === "advanced" ? null : "advanced" })
					}
					selectedLabel={t("reminder.selected")}
					muted
					horizontal
				/>
			</div>
		</OnboardingStepLayout>
	);
}
