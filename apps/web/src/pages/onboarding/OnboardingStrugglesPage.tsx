import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { OnboardingStepLayout } from "../../components/onboarding/OnboardingStepLayout";
import { CheckRow } from "../../components/ui/CheckRow";
import { ONBOARDING_STEPS } from "../../constants/onboardingSteps";
import { STRUGGLES, useOnboardingStore } from "../../stores/onboardingStore";

export function OnboardingStrugglesPage() {
	const { t } = useTranslation("onboarding");
	const navigate = useNavigate();
	const { data, setData } = useOnboardingStore();
	const { selectedStruggleKeys } = data;

	function toggle(id: string) {
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
			onBack={() => navigate({ to: ONBOARDING_STEPS[0] })}
			onContinue={() => navigate({ to: ONBOARDING_STEPS[2] })}
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
