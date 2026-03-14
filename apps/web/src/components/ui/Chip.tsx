interface ChipProps {
	label: string;
	selected: boolean;
	onClick: () => void;
}

export function Chip({ label, selected, onClick }: ChipProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`cursor-pointer rounded-chip border-[1.5px] px-3.5 py-1.5 text-callout font-medium transition-all duration-150 ${selected ? "border-bark bg-bark/6 text-bark" : "border-stone-border bg-surface text-stone-muted"}`}
		>
			{label}
		</button>
	);
}
