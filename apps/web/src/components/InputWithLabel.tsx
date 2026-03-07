import { useId } from "react";

interface InputWithLabelProps {
	label: string;
	type?: string;
	placeholder?: string;
	autoComplete?: string;
}

export function InputWithLabel({
	label,
	type = "text",
	placeholder,
	autoComplete,
}: InputWithLabelProps) {
	const inputId = useId();

	return (
		<div className="mb-4">
			<label
				htmlFor={inputId}
				className="block text-xs font-semibold text-bark mb-1.5 tracking-wide"
			>
				{label}
			</label>
			<input
				id={inputId}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				className="w-full px-3.5 py-2.5 rounded-[10px] border-[1.5px] border-stone-border bg-surface text-sm text-bark font-sans transition-[border-color,box-shadow] duration-150 placeholder:text-stone-soft focus:outline-none focus:border-bark focus:shadow-[0_0_0_3px_rgba(62,39,35,0.08)]"
			/>
		</div>
	);
}
