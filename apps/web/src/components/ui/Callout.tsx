import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const CALLOUT_VARIANTS = {
	info: {
		icon: "💡",
		containerClassName: "bg-stone-bg",
	},
} as const;

type CalloutVariant = keyof typeof CALLOUT_VARIANTS;

interface CalloutProps {
	children: ReactNode;
	variant: CalloutVariant;
	className?: string;
	contentClassName?: string;
	iconClassName?: string;
}

export function Callout({
	children,
	variant,
	className,
	contentClassName,
	iconClassName,
}: CalloutProps) {
	const { icon, containerClassName } = CALLOUT_VARIANTS[variant];

	return (
		<div
			className={twMerge(
				"flex items-start gap-2.5 rounded-[10px] px-3.5 py-3",
				containerClassName,
				className,
			)}
		>
			<span
				className={twMerge("shrink-0 text-base", iconClassName)}
				role="img"
				aria-hidden="true"
			>
				{icon}
			</span>
			<div
				className={twMerge(
					"text-[13px] leading-[1.6] text-stone-muted",
					contentClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}
