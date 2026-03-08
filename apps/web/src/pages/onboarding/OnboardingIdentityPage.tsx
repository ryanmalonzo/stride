import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ToggleCard } from "../../components/ui/ToggleCard";
import { ONBOARDING_STEPS } from "../../constants/onboardingSteps";
import { IDENTITIES, useOnboardingStore } from "../../stores/onboardingStore";

const MAX = 3;

export function OnboardingIdentityPage() {
	const { t } = useTranslation("onboarding");
	const { t: tMisc } = useTranslation("misc");
	const navigate = useNavigate();
	const { data, setData } = useOnboardingStore();
	const { selectedIdentityKeys, otherIdentity } = data;

	function toggle(id: string) {
		if (selectedIdentityKeys.includes(id)) {
			setData({
				selectedIdentityKeys: selectedIdentityKeys.filter((k) => k !== id),
			});
		} else if (selectedIdentityKeys.length < MAX) {
			setData({ selectedIdentityKeys: [...selectedIdentityKeys, id] });
		}
	}

	const remaining = MAX - selectedIdentityKeys.length;

	return (
		<main className="flex flex-1 items-start justify-center px-6 pt-12 pb-20">
			<div className="flex w-full max-w-140 flex-col gap-8">
				<div className="flex flex-col">
					<h1 className="mb-2.5 font-serif text-[30px] font-semibold leading-[1.2] tracking-[-0.5px]">
						{t("identity.title")}
					</h1>
					<p className="mb-8 text-[15px] leading-[1.6] text-stone-muted">
						{t("identity.subtitle")}
					</p>

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
				</div>

				<div className="flex items-center justify-end">
					<button
						type="button"
						disabled={selectedIdentityKeys.length === 0}
						// TODO: Uncomment once implemented
						// onClick={() => navigate({ to: ONBOARDING_STEPS[1] })}
						className="cursor-pointer rounded-[10px] bg-bark px-7 py-3.25 text-[15px] font-semibold text-cream transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-35 hover:opacity-88"
					>
						{tMisc("continue")}
					</button>
				</div>
			</div>
		</main>
	);
}
