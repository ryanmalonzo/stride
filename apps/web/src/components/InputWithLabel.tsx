import { forwardRef, useId } from "react";
import { Input, type InputProps } from "./Input";

interface InputWithLabelProps extends InputProps {
	label: string;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
	({ label, error, ...rest }, ref) => {
		const inputId = useId();

		return (
			<div>
				<label
					htmlFor={inputId}
					className="block text-xs font-semibold text-bark mb-1.5 tracking-wide"
				>
					{label}
				</label>
				<Input id={inputId} ref={ref} error={error} {...rest} />
				{error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
			</div>
		);
	},
);
