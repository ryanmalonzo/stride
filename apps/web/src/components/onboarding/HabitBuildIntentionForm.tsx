import { useTranslation } from "react-i18next";
import type { OnboardingData } from "../../stores/onboardingStore";
import { Input } from "../Input";
import { Chip } from "../ui/Chip";
import { SentenceField } from "../ui/SentenceField";

type HabitBuildIntentionFormProps = {
	value: OnboardingData["intention"];
	onActionChange: (value: string) => void;
	onTimeChange: (value: string) => void;
	onLocationChange: (value: string) => void;
	onOtherLocationChange: (value: string) => void;
};

const TIME_OPTIONS = [
	"morning",
	"afternoon",
	"evening",
	"specificTime",
] as const;
const LOCATION_OPTIONS = [
	"home",
	"work",
	"gym",
	"kitchen",
	"outside",
	"other",
] as const;

export function HabitBuildIntentionForm({
	value,
	onActionChange,
	onTimeChange,
	onLocationChange,
	onOtherLocationChange,
}: HabitBuildIntentionFormProps) {
	const { t } = useTranslation("onboarding");
	const selectedTimeLabel = value.time
		? t(`habitBuild.intention.timeOptions.${value.time}`)
		: "";
	const selectedLocationLabel = value.location
		? value.location === "other"
			? value.otherLocation
			: t(`habitBuild.intention.locationOptions.${value.location}`)
		: "";

	return (
		<div className="flex flex-col gap-5">
			<SentenceField
				label={t("habitBuild.intention.actionLabel")}
				placeholder={t("habitBuild.intention.actionPlaceholder")}
				value={value.action}
				onChange={onActionChange}
			/>

			<div className="flex items-start gap-3">
				<span className="min-w-15 pt-1.5 text-[15px] font-semibold text-bark">
					{t("habitBuild.intention.timeLabel")}
				</span>
				<div className="flex flex-wrap gap-2">
					{TIME_OPTIONS.map((option) => (
						<Chip
							key={option}
							label={t(`habitBuild.intention.timeOptions.${option}`)}
							selected={value.time === option}
							onClick={() => onTimeChange(value.time === option ? "" : option)}
						/>
					))}
				</div>
			</div>

			<div className="flex items-start gap-3">
				<span className="min-w-15 pt-1.5 text-[15px] font-semibold text-bark">
					{t("habitBuild.intention.locationLabel")}
				</span>
				<div className="flex-1">
					<div className="flex flex-wrap gap-2">
						{LOCATION_OPTIONS.map((option) => (
							<Chip
								key={option}
								label={t(`habitBuild.intention.locationOptions.${option}`)}
								selected={value.location === option}
								onClick={() =>
									onLocationChange(value.location === option ? "" : option)
								}
							/>
						))}
					</div>

					{value.location === "other" && (
						<Input
							className="mt-2.5 py-2.75 text-[14px]"
							placeholder={t("habitBuild.intention.otherLocationPlaceholder")}
							value={value.otherLocation}
							onChange={(e) => onOtherLocationChange(e.target.value)}
						/>
					)}
				</div>
			</div>

			{value.action.trim().length > 0 && (
				<div className="mt-1 rounded-[12px] border border-stone-border bg-surface px-4 py-3.5">
					<span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-stone-soft">
						{t("habitBuild.intention.previewLabel")}
					</span>
					<p className="font-serif text-[14px] leading-[1.6] text-bark/80 italic">
						"I will <strong>{value.action}</strong>
						{selectedTimeLabel ? ` at ${selectedTimeLabel.toLowerCase()}` : ""}
						{selectedLocationLabel
							? ` in ${selectedLocationLabel.toLowerCase()}`
							: ""}
						."
					</p>
				</div>
			)}
		</div>
	);
}
