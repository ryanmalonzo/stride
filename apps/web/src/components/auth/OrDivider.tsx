import { useTranslation } from "react-i18next";

export function OrDivider() {
	const { t } = useTranslation("misc");

	return (
		<div className="flex items-center gap-3 mb-5">
			<div className="flex-1 h-px bg-stone-border" />
			<span className="text-xs text-stone-soft font-medium">{t("or")}</span>
			<div className="flex-1 h-px bg-stone-border" />
		</div>
	);
}
