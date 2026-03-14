import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/Input";
import { ToggleCard } from "../../../components/ui/ToggleCard";
import { OnboardingStepLayout } from "../components/OnboardingStepLayout";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../store";
import type { IdentityId, IdentityOption } from "../types";

const IDENTITIES: readonly IdentityOption[] = [
	{ id: "athlete", icon: "🏃", label: "An athlete" },
	{ id: "reader", icon: "📚", label: "A reader" },
	{ id: "artist", icon: "✏️", label: "An artist" },
	{ id: "finance", icon: "💰", label: "Financially responsible" },
	{ id: "learner", icon: "🇯🇵", label: "A polyglot" },
];

const MAX = 3;

export function OnboardingIdentityPage() {
	const { t } = useTranslation("onboarding");
	const { t: tMisc } = useTranslation("misc");
	const { goContinue } = useOnboardingNavigation();
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
			onContinue={goContinue}
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
					label={tMisc("other")}
					selected={selectedIdentityKeys.includes("other")}
					onClick={() => toggle("other")}
				/>
			</div>

			{selectedIdentityKeys.includes("other") && (
				<Input
					className="mt-2.5"
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
