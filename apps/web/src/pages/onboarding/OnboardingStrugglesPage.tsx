import { useTranslation } from "react-i18next";
import { OnboardingStepLayout } from "../../components/onboarding/OnboardingStepLayout";
import { CheckRow } from "../../components/ui/CheckRow";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import type { StruggleId, StruggleOption } from "../../onboarding/types";
import { useOnboardingStore } from "../../stores/onboardingStore";

const STRUGGLES: readonly StruggleOption[] = [
	{ id: "consistency", label: "I start habits but don't stick with them" },
	{ id: "forgetting", label: "I forget to do things I want to do" },
	{ id: "motivation", label: "I know what to do but don't feel motivated" },
	{ id: "busy", label: "I'm too tired or busy for new habits" },
	{ id: "tracking", label: "I lose track of my progress" },
];

export function OnboardingStrugglesPage() {
	const { t } = useTranslation("onboarding");
	const { goBack, goContinue } = useOnboardingNavigation();
	const { data, setData } = useOnboardingStore();
	const { selectedStruggleKeys } = data;

	function toggle(id: StruggleId) {
		setData({
			selectedStruggleKeys: selectedStruggleKeys.includes(id)
				? selectedStruggleKeys.filter((k) => k !== id)
				: [...selectedStruggleKeys, id],
		});
	}

	return (
		<OnboardingStepLayout
			title={t("struggles.title")}
			subtitle={t("struggles.subtitle")}
			onBack={goBack}
			onContinue={goContinue}
			isContinueEnabled={selectedStruggleKeys.length > 0}
		>
			<div className="flex flex-col gap-2.5">
				{STRUGGLES.map(({ id, label }) => (
					<CheckRow
						key={id}
						label={t(`struggles.options.${id}`, { defaultValue: label })}
						checked={selectedStruggleKeys.includes(id)}
						onClick={() => toggle(id)}
					/>
				))}
			</div>
		</OnboardingStepLayout>
	);
}
