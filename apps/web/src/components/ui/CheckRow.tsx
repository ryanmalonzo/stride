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
			className={`flex w-full cursor-pointer items-center gap-3.5 rounded-[12px] border-[1.5px] bg-surface px-4 py-3.5 text-left transition-all duration-150 ${checked ? "border-bark bg-bark/2" : "border-stone-border"}`}
		>
			<div
				className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-all duration-150 ${checked ? "border-bark bg-bark" : "border-stone-hover"}`}
			>
				{checked && <span className="text-[11px] font-bold text-cream">✓</span>}
			</div>
			<span className="text-[14px] leading-[1.4] text-bark">{label}</span>
		</button>
	);
}
