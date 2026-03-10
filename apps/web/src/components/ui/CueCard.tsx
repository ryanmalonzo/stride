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
}: CueCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-[14px] border-[1.5px] bg-surface px-4.5 py-5 text-left transition-colors duration-150 ${selected ? "border-bark bg-bark/4" : "border-stone-border"} ${muted ? "border-dashed" : ""}`}
		>
			<span className="text-2xl" role="img" aria-hidden="true">
				{icon}
			</span>
			<div className="flex items-center gap-2">
				<span className="text-[14px] font-bold text-bark">{title}</span>
				{recommended && (
					<span className="rounded-[20px] border border-success/30 bg-success/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-success">
						Recommended
					</span>
				)}
			</div>
			<p
				className={`text-[13px] leading-normal ${muted ? "text-stone-soft" : "text-stone-muted"}`}
			>
				{description}
			</p>
			{example && (
				<p className="font-serif text-[12px] italic leading-normal text-stone-soft">
					{example}
				</p>
			)}
			<span
				className={`mt-1 text-[12px] font-semibold text-success ${selected ? "visible" : "invisible"}`}
			>
				✓ {selectedLabel}
			</span>
		</button>
	);
}
