interface SentenceFieldProps {
	label: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}

export function SentenceField({
	label,
	placeholder,
	value,
	onChange,
}: SentenceFieldProps) {
	return (
		<div className="flex items-baseline gap-3">
			<span className="min-w-15 whitespace-nowrap text-[15px] font-semibold text-bark">
				{label}
			</span>
			<input
				className="flex-1 border-0 border-b-2 border-stone-hover bg-transparent py-1.5 font-sans text-[15px] text-bark placeholder:text-stone-soft focus:border-bark focus:outline-none"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
