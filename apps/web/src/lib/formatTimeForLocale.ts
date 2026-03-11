export function formatTimeForLocale(value: string, locale: string): string {
	if (!value) {
		return "";
	}

	const [hours, minutes] = value.split(":").map(Number);
	if (Number.isNaN(hours) || Number.isNaN(minutes)) {
		return value;
	}

	const date = new Date();
	date.setHours(hours, minutes, 0, 0);

	return new Intl.DateTimeFormat(locale, {
		hour: "numeric",
		minute: "2-digit",
	}).format(date);
}
