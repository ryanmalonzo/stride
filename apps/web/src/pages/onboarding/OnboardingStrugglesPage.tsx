import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button";
import { CheckRow } from "../../components/ui/CheckRow";
import { ONBOARDING_STEPS } from "../../constants/onboardingSteps";
import { STRUGGLES, useOnboardingStore } from "../../stores/onboardingStore";

export function OnboardingStrugglesPage() {
	const { t } = useTranslation("onboarding");
	const { t: tMisc } = useTranslation("misc");
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
		<main className="flex flex-1 items-start justify-center px-6 pt-4 lg:pt-12 pb-20">
			<div className="flex w-full max-w-140 flex-col gap-8">
				<div className="flex flex-col">
					<h1 className="mb-2.5 font-serif text-[30px] font-semibold leading-[1.2] tracking-[-0.5px]">
						{t("struggles.title")}
					</h1>
					<p className="mb-8 text-[15px] leading-[1.6] text-stone-muted">
						{t("struggles.subtitle")}
					</p>

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
				</div>

				<div className="flex items-center justify-between">
					<Button
						fullWidth={false}
						variant="ghost"
						onClick={() => navigate({ to: ONBOARDING_STEPS[0] })}
					>
						{tMisc("back")}
					</Button>
					<Button
						fullWidth={false}
						disabled={selectedStruggleKeys.length === 0}
						// onClick={() => navigate({ to: ONBOARDING_STEPS[2] })}
						icon={<ArrowRight size={16} />}
					>
						{tMisc("continue")}
					</Button>
				</div>
			</div>
		</main>
	);
}
