import { AppLogo } from "./AppLogo";

interface NavbarProps {
	right?: React.ReactNode;
}

export function Navbar({ right }: NavbarProps) {
	return (
		<header className="sticky top-0 z-50 flex h-15 items-center gap-4 border-b border-stone-border bg-cream/92 px-8 backdrop-blur-[10px]">
			<div className="mr-auto">
				<AppLogo />
			</div>
			{right}
		</header>
	);
}
