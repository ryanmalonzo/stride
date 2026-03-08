interface CueCardProps {
	icon: string;
	title: string;
	description: string;
	selected: boolean;
	onClick: () => void;
	recommended?: boolean;
	muted?: boolean;
}

export function CueCard({
	icon,
	title,
	description,
	selected,
	onClick,
	recommended,
	muted,
}: CueCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex w-full cursor-pointer items-center gap-3.5 rounded-[12px] border-[1.5px] bg-surface px-4.5 py-4 text-left transition-all duration-150 ${selected ? "border-bark bg-bark/2" : "border-stone-border"} ${muted ? "border-dashed" : ""}`}
		>
			<span className="shrink-0 text-[22px]">{icon}</span>
			<div className="flex-1">
				<div className="mb-0.5 flex items-center gap-2">
					<div className="text-[14px] font-semibold text-bark">{title}</div>
					{recommended && (
						<span className="rounded-[20px] border border-success/30 bg-success/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-success">
							Recommended
						</span>
					)}
				</div>
				<div
					className={`text-[13px] ${muted ? "text-stone-soft" : "text-stone-muted"}`}
				>
					{description}
				</div>
			</div>
			{selected && (
				<div className="ml-auto shrink-0 text-[16px] font-bold text-success">
					✓
				</div>
			)}
		</button>
	);
}
