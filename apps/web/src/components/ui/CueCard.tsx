import { SelectableCard } from "./SelectableCard";

interface CueCardProps {
	icon: string;
	title: string;
	description: string;
	example?: string;
	selected: boolean;
	onClick: () => void;
	selectedLabel: string;
	recommended?: boolean;
	muted?: boolean;
	horizontal?: boolean;
}

export function CueCard({
	icon,
	title,
	description,
	example,
	selected,
	onClick,
	selectedLabel,
	recommended,
	muted,
	horizontal,
}: CueCardProps) {
	const recommendedBadge = recommended && (
		<span className="rounded-chip border border-success/30 bg-success/8 px-2 py-0.5 text-2xs font-bold uppercase tracking-[0.06em] text-success">
			Recommended
		</span>
	);

	if (horizontal) {
		return (
			<SelectableCard
				selected={selected}
				onClick={onClick}
				muted={muted}
				className="items-center gap-3.5 rounded-cue px-4.5 py-4"
			>
				<span className="shrink-0 text-icon-lg" role="img" aria-hidden="true">
					{icon}
				</span>
				<div className="flex flex-1 flex-col gap-0.5">
					<div className="flex items-center gap-2">
						<span className="text-body font-semibold text-bark">{title}</span>
						{recommendedBadge}
					</div>
					<p
						className={`text-callout leading-normal ${muted ? "text-stone-soft" : "text-stone-muted"}`}
					>
						{description}
					</p>
				</div>
				<span
					className={`ml-auto shrink-0 text-[16px] font-bold text-success ${selected ? "visible" : "invisible"}`}
				>
					✓
				</span>
			</SelectableCard>
		);
	}

	return (
		<SelectableCard
			selected={selected}
			onClick={onClick}
			muted={muted}
			className="flex-col gap-2 rounded-cue px-4.5 py-5"
		>
			<span className="text-2xl" role="img" aria-hidden="true">
				{icon}
			</span>
			<div className="flex items-center gap-2">
				<span className="text-body font-bold text-bark">{title}</span>
				{recommendedBadge}
			</div>
			<p
				className={`text-callout leading-normal ${muted ? "text-stone-soft" : "text-stone-muted"}`}
			>
				{description}
			</p>
			{example && (
				<p className="font-serif text-footnote italic leading-normal text-stone-soft">
					{example}
				</p>
			)}
			<span
				className={`mt-1 text-footnote font-semibold text-success ${selected ? "visible" : "invisible"}`}
			>
				✓ {selectedLabel}
			</span>
		</SelectableCard>
	);
}
