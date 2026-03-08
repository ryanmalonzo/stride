interface ToggleCardProps {
	icon: string;
	label: string;
	selected: boolean;
	onClick: () => void;
}

export function ToggleCard({
	icon,
	label,
	selected,
	onClick,
}: ToggleCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`relative flex w-full cursor-pointer items-center gap-3 rounded-[12px] border-[1.5px] bg-surface px-4 py-3.5 text-left transition-all duration-150 ${selected ? "border-bark bg-bark/3" : "border-stone-border"}`}
		>
			<span className="text-[20px]">{icon}</span>
			<span className="flex-1 text-[14px] font-medium text-bark">{label}</span>
			{selected && (
				<span className="rounded-[20px] bg-success/9 px-1.5 py-0.5 text-[11px] font-bold text-success">
					✓
				</span>
			)}
		</button>
	);
}
