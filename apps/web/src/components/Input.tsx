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
					"w-full rounded-[10px] border-[1.5px] bg-surface px-3.5 py-2.5 text-sm transition-[border-color,box-shadow] duration-150",
					error
						? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
						: "border-stone-border focus:border-bark focus:shadow-[0_0_0_3px_rgba(62,39,35,0.08)]",
				],
				variant === "underline" &&
					"border-0 border-b-2 border-stone-hover bg-transparent py-1.5 text-[15px] focus:border-bark",
				className,
			)}
			{...rest}
		/>
	),
);
