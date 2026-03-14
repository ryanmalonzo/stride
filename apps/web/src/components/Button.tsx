type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: ButtonVariant;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	loading?: boolean;
	icon?: React.ReactNode;
	fullWidth?: boolean;
}

function getVariantClasses(variant: ButtonVariant) {
	if (variant === "ghost") {
		return "text-stone-muted";
	}
	if (variant === "secondary") {
		return "bg-stone-bg text-bark";
	}
	// Fallback to "primary"
	return "bg-bark text-cream";
}

export function Button({
	children,
	onClick,
	variant = "primary",
	type = "button",
	disabled = false,
	loading = false,
	icon,
	fullWidth = true,
}: ButtonProps) {
	const isDisabled = disabled || loading;
	const sizeClasses = fullWidth ? "w-full py-3 mb-5" : "px-7 py-3";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className={`inline-flex items-center justify-center gap-2 rounded-input text-[15px] font-semibold font-sans transition-[opacity,transform] duration-150 ${sizeClasses} ${getVariantClasses(variant)} ${isDisabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer hover:opacity-88"}`}
		>
			{loading ? (
				<span className="block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
			) : (
				<>
					{children}
					{icon}
				</>
			)}
		</button>
	);
}
