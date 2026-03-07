import { useTranslation } from "react-i18next";
import { AppLogo } from "../components/AppLogo";
import { SignInForm } from "../components/auth/SignInForm";

export function SignInPage() {
	const { t } = useTranslation("auth");

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen bg-cream px-10 py-12">
			<div className="absolute top-8 left-10">
				<AppLogo />
			</div>

			<div className="w-full max-w-95 flex flex-col">
				<div className="mb-8">
					<h1 className="font-serif text-[28px] font-semibold text-bark tracking-tight mb-1.5">
						{t("signIn.title")}
					</h1>
					<p className="text-[15px] text-stone-muted">{t("signIn.subtitle")}</p>
				</div>

				<SignInForm />
			</div>

			<p className="absolute bottom-6 text-[11px] text-stone-soft tracking-widest">
				{t("footer")}
			</p>
		</div>
	);
}
