import { SelectableCard } from "./SelectableCard";

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
		<SelectableCard
			selected={selected}
			onClick={onClick}
			className="relative items-center gap-3 rounded-[12px] px-4 py-3.5"
		>
			<span className="text-[20px]">{icon}</span>
			<span className="flex-1 text-[14px] font-medium text-bark">{label}</span>
			{selected && (
				<span className="rounded-[20px] bg-success/9 px-1.5 py-0.5 text-[11px] font-bold text-success">
					✓
				</span>
			)}
		</SelectableCard>
	);
}
