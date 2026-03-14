interface CheckRowProps {
	label: string;
	checked: boolean;
	onClick: () => void;
}

export function CheckRow({ label, checked, onClick }: CheckRowProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex w-full cursor-pointer items-center gap-3.5 rounded-card border-[1.5px] px-4 py-3.5 text-left transition-all duration-150 ${checked ? "border-bark bg-bark/4" : "border-stone-border bg-surface"}`}
		>
			<div
				className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-all duration-150 ${checked ? "border-bark bg-bark" : "border-stone-hover"}`}
			>
				{checked && <span className="text-label font-bold text-cream">✓</span>}
			</div>
			<span className="text-body leading-[1.4] text-bark">{label}</span>
		</button>
	);
}
