import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Button";

interface OnboardingStepLayoutProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
	onContinue?: () => void;
	isContinueEnabled?: boolean;
	isContinueLoading?: boolean;
	onBack?: () => void;
	footer?: React.ReactNode;
}

export function OnboardingStepLayout({
	title,
	subtitle,
	children,
	onContinue,
	isContinueEnabled = true,
	isContinueLoading = false,
	onBack,
	footer,
}: OnboardingStepLayoutProps) {
	const { t } = useTranslation("misc");

	return (
		<main className="flex flex-1 items-start justify-center px-6 pt-4 pb-20 lg:pt-12">
			<div className="flex w-full max-w-140 flex-col gap-8">
				<div className="flex flex-col">
					<h1 className="mb-2.5 font-serif text-[30px] font-semibold leading-[1.2] tracking-[-0.5px]">
						{title}
					</h1>
					<p className="mb-8 text-[15px] leading-[1.6] text-stone-muted">
						{subtitle}
					</p>

					{children}
				</div>

				{footer != null ? (
					footer
				) : (
					<div
						className={`flex items-center ${onBack ? "justify-between" : "justify-end"}`}
					>
						{onBack && (
							<Button fullWidth={false} variant="ghost" onClick={onBack}>
								{t("back")}
							</Button>
						)}
						<Button
							fullWidth={false}
							disabled={!isContinueEnabled || !onContinue}
							loading={isContinueLoading}
							onClick={onContinue}
							icon={<ArrowRight size={16} />}
						>
							{t("continue")}
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}
