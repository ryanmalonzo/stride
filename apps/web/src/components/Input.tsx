import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, ...rest }, ref) => (
		<input
			ref={ref}
			className={twMerge(
				"w-full rounded-[10px] border-[1.5px] bg-surface px-3.5 py-2.5 font-sans text-sm text-bark transition-[border-color,box-shadow] duration-150 placeholder:text-stone-soft focus:outline-none",
				error
					? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
					: "border-stone-border focus:border-bark focus:shadow-[0_0_0_3px_rgba(62,39,35,0.08)]",
				className,
			)}
			{...rest}
		/>
	),
);
