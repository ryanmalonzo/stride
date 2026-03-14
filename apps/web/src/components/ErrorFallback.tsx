import type { ErrorComponentProps } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

export function ErrorFallback({ error, reset }: ErrorComponentProps) {
	const { t } = useTranslation("misc");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
			<p className="text-2xl font-semibold text-bark">{t("errorTitle")}</p>
			<p className="max-w-sm text-sm text-stone-soft">{error.message}</p>
			<Button onClick={reset} fullWidth={false}>
				{t("tryAgain")}
			</Button>
		</div>
	);
}
