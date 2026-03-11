import { useTranslation } from "react-i18next";

export function OrDivider() {
	const { t } = useTranslation("misc");

	return (
		<div className="mb-5 flex items-center gap-3">
			<div className="h-px flex-1 bg-stone-border" />
			<span className="text-xs font-medium text-stone-soft">{t("or")}</span>
			<div className="h-px flex-1 bg-stone-border" />
		</div>
	);
}
