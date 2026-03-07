interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "primary" | "secondary";
	type?: "button" | "submit" | "reset";
}

export function Button({
	children,
	onClick,
	variant = "primary",
	type = "button",
}: ButtonProps) {
	const variantClasses =
		variant === "primary" ? "bg-bark text-cream" : "bg-stone-bg text-bark";

	return (
		<button
			type={type}
			onClick={onClick}
			className={`w-full py-3 rounded-[10px] text-[15px] font-semibold font-sans cursor-pointer transition-[opacity,transform] duration-150 hover:opacity-88 mb-5 ${variantClasses}`}
		>
			{children}
		</button>
	);
}
