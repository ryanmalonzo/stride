import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OnboardingStepLayout } from "../../components/onboarding/OnboardingStepLayout";
import { ToggleCard } from "../../components/ui/ToggleCard";
import { ONBOARDING_STEPS } from "../../constants/onboardingSteps";
import {
	IDENTITIES,
	type IdentityId,
	useOnboardingStore,
} from "../../stores/onboardingStore";

const MAX = 3;

export function OnboardingIdentityPage() {
	const { t } = useTranslation("onboarding");
	const navigate = useNavigate();
	const { data, setData } = useOnboardingStore();
	const { selectedIdentityKeys, otherIdentity } = data;

	function toggle(id: IdentityId) {
		if (selectedIdentityKeys.includes(id)) {
			setData({
				selectedIdentityKeys: selectedIdentityKeys.filter((k) => k !== id),
			});
		} else if (selectedIdentityKeys.length < MAX) {
			setData({ selectedIdentityKeys: [...selectedIdentityKeys, id] });
		}
	}

	const remaining = MAX - selectedIdentityKeys.length;

	const isContinueEnabled = useMemo(() => {
		if (selectedIdentityKeys.includes("other")) {
			return otherIdentity.length > 0;
		}
		return selectedIdentityKeys.length > 0;
	}, [selectedIdentityKeys, otherIdentity]);

	return (
		<OnboardingStepLayout
			title={t("identity.title")}
			subtitle={t("identity.subtitle")}
			onContinue={() => navigate({ to: ONBOARDING_STEPS[1] })}
			isContinueEnabled={isContinueEnabled}
		>
			<div className="grid grid-cols-2 gap-2.5">
				{IDENTITIES.map(({ id, icon, label }) => (
					<ToggleCard
						key={id}
						icon={icon}
						label={t(`identity.options.${id}`, { defaultValue: label })}
						selected={selectedIdentityKeys.includes(id)}
						onClick={() => toggle(id)}
					/>
				))}
				<ToggleCard
					icon="✨"
					label={t("identity.other")}
					selected={selectedIdentityKeys.includes("other")}
					onClick={() => toggle("other")}
				/>
			</div>

			{selectedIdentityKeys.includes("other") && (
				<input
					className="mt-2.5 w-full rounded-[10px] border-[1.5px] border-stone-border bg-surface px-3.5 py-2.75 font-sans text-[14px] text-bark placeholder:text-stone-soft transition-[border-color] duration-150 focus:border-bark focus:outline-none"
					placeholder={t("identity.otherPlaceholder")}
					value={otherIdentity}
					onChange={(e) => setData({ otherIdentity: e.target.value })}
				/>
			)}

			{selectedIdentityKeys.length > 0 && (
				<p className="mt-3 text-center text-[12px] text-stone-soft">
					{remaining === 0
						? t("identity.hintComplete")
						: t("identity.hintRemaining", { count: remaining })}
				</p>
			)}
		</OnboardingStepLayout>
	);
}
