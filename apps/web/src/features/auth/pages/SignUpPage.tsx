import { useTranslation } from "react-i18next";
import { AppLogo } from "../../../components/AppLogo";
import { SignUpForm } from "../components/SignUpForm";

export function SignUpPage() {
	const { t } = useTranslation("auth");

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center bg-cream px-10 py-12">
			<div className="absolute top-8 left-10">
				<AppLogo />
			</div>

			<div className="flex w-full max-w-95 flex-col">
				<div className="mb-8">
					<h1 className="mb-1.5 font-serif text-[28px] font-semibold tracking-tight text-bark">
						{t("signUp.title")}
					</h1>
					<p className="text-[15px] text-stone-muted">{t("signUp.subtitle")}</p>
				</div>

				<SignUpForm />
			</div>

			<p className="absolute bottom-6 text-[11px] tracking-widest text-stone-soft">
				{t("footer")}
			</p>
		</div>
	);
}
