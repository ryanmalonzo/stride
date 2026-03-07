import { forwardRef, useId } from "react";

interface InputWithLabelProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
	({ label, error, ...rest }, ref) => {
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
					ref={ref}
					className={`w-full px-3.5 py-2.5 rounded-[10px] border-[1.5px] bg-surface text-sm text-bark font-sans transition-[border-color,box-shadow] duration-150 placeholder:text-stone-soft focus:outline-none ${
						error
							? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
							: "border-stone-border focus:border-bark focus:shadow-[0_0_0_3px_rgba(62,39,35,0.08)]"
					}`}
					{...rest}
				/>
				{error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
			</div>
		);
	},
);

InputWithLabel.displayName = "InputWithLabel";
