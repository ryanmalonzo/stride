import { useTranslation } from "react-i18next";
import type { OnboardingData } from "../../stores/onboardingStore";
import { SentenceField } from "../ui/SentenceField";

type HabitBuildStackFormProps = {
	value: OnboardingData["stack"];
	onAnchorChange: (value: string) => void;
	onNewHabitChange: (value: string) => void;
};

export function HabitBuildStackForm({
	value,
	onAnchorChange,
	onNewHabitChange,
}: HabitBuildStackFormProps) {
	const { t } = useTranslation("onboarding");
	const showPreview =
		value.anchor.trim().length > 0 && value.newHabit.trim().length > 0;

	return (
		<div className="flex flex-col gap-5">
			<SentenceField
				label={t("habitBuild.stack.anchorLabel")}
				placeholder={t("habitBuild.stack.anchorPlaceholder")}
				value={value.anchor}
				onChange={onAnchorChange}
			/>

			<SentenceField
				label={t("habitBuild.stack.newHabitLabel")}
				placeholder={t("habitBuild.stack.newHabitPlaceholder")}
				value={value.newHabit}
				onChange={onNewHabitChange}
			/>

			{showPreview && (
				<div className="mt-1 rounded-[12px] border border-stone-border bg-surface px-4 py-3.5">
					<span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-stone-soft">
						{t("habitBuild.stack.previewLabel")}
					</span>
					<p className="font-serif text-[14px] leading-[1.6] text-bark/80 italic">
						"After I <strong>{value.anchor}</strong>, I will{" "}
						<strong>{value.newHabit}</strong>."
					</p>
				</div>
			)}
		</div>
	);
}
