import { Input } from "../Input";

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
			<Input
				variant="underline"
				className="flex-1"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
