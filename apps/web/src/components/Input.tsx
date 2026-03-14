import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	variant?: "default" | "underline";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, variant = "default", ...rest }, ref) => (
		<input
			ref={ref}
			className={twMerge(
				"font-sans text-bark placeholder:text-stone-soft focus:outline-none",
				variant === "default" && [
					"w-full rounded-input border-[1.5px] bg-surface px-3.5 py-2.5 text-sm transition-[border-color,box-shadow] duration-150",
					error
						? "border-red-400 focus:border-red-500 focus:shadow-focus-error"
						: "border-stone-border focus:border-bark focus:shadow-focus",
				],
				variant === "underline" &&
					"border-0 border-b-2 border-stone-hover bg-transparent py-1.5 text-[15px] focus:border-bark",
				className,
			)}
			{...rest}
		/>
	),
);
