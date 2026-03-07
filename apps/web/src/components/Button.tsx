interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "primary" | "secondary";
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	loading?: boolean;
}

export function Button({
	children,
	onClick,
	variant = "primary",
	type = "button",
	disabled = false,
	loading = false,
}: ButtonProps) {
	const variantClasses =
		variant === "primary" ? "bg-bark text-cream" : "bg-stone-bg text-bark";
	const isDisabled = disabled || loading;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className={`w-full py-3 rounded-[10px] text-[15px] font-semibold font-sans transition-[opacity,transform] duration-150 mb-5 ${variantClasses} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-88"}`}
		>
			{loading ? (
				<span className="block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mx-auto" />
			) : (
				children
			)}
		</button>
	);
}
