import { useTranslation } from "react-i18next";
import { AppLogo } from "../components/AppLogo";
import { SignUpForm } from "../components/auth/SignUpForm";

export function SignUpPage() {
	const { t } = useTranslation("auth");

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen bg-cream px-10 py-12">
			<div className="absolute top-8 left-10">
				<AppLogo />
			</div>

			<div className="w-full max-w-95 flex flex-col">
				<div className="mb-8">
					<h1 className="font-serif text-[28px] font-semibold text-bark tracking-tight mb-1.5">
						{t("signUp.title")}
					</h1>
					<p className="text-[15px] text-stone-muted">{t("signUp.subtitle")}</p>
				</div>

				<SignUpForm />
			</div>

			<p className="absolute bottom-6 text-[11px] text-stone-soft tracking-widest">
				{t("footer")}
			</p>
		</div>
	);
}
