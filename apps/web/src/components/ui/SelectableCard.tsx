import { twMerge } from "tailwind-merge";

interface SelectableCardProps {
	selected: boolean;
	onClick: () => void;
	muted?: boolean;
	className?: string;
	children: React.ReactNode;
}

export function SelectableCard({
	selected,
	onClick,
	muted,
	className,
	children,
}: SelectableCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={twMerge(
				"flex w-full cursor-pointer border-[1.5px] bg-surface text-left transition-[border-color,background-color] duration-150",
				selected ? "border-bark bg-bark/4" : "border-stone-border",
				muted && "border-dashed",
				className,
			)}
		>
			{children}
		</button>
	);
}
