import { useTranslation } from "react-i18next";
import { OnboardingStepLayout } from "../../components/onboarding/OnboardingStepLayout";
import { CheckRow } from "../../components/ui/CheckRow";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import {
	STRUGGLES,
	type StruggleId,
	useOnboardingStore,
} from "../../stores/onboardingStore";

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
