import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { InputWithLabel } from "../InputWithLabel";
import { OrDivider } from "./OrDivider";

export function SignUpForm() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-cream px-10 py-12">
			<div className="w-full max-w-95 flex flex-col">
				<div className="mb-8">
					<h1 className="font-serif text-[28px] font-semibold text-bark tracking-tight mb-1.5">
						{t("auth.signUp.title")}
					</h1>
					<p className="text-[15px] text-stone-muted">
						{t("auth.signUp.subtitle")}
					</p>
				</div>

				<InputWithLabel
					label={t("form.email.label")}
					type="email"
					placeholder={t("form.email.placeholder")}
					autoComplete="email"
				/>
				<InputWithLabel
					label={t("form.password.label")}
					type="password"
					placeholder={t("form.password.placeholder")}
					autoComplete="new-password"
				/>
				<InputWithLabel
					label={t("form.confirmPassword.label")}
					type="password"
					placeholder={t("form.password.placeholder")}
					autoComplete="new-password"
				/>

				<Button>{t("auth.signUp.createAccount")}</Button>

				<OrDivider />

				<div className="flex items-center justify-center gap-1.5">
					<span className="text-sm text-stone-muted">
						{t("auth.signUp.alreadyHaveAnAccount")}
					</span>
					<Link
						to="/sign-in"
						className="text-sm font-semibold text-bark underline underline-offset-[3px]"
					>
						{t("auth.signIn.signIn")}
					</Link>
				</div>
			</div>

			<p className="absolute bottom-6 text-[11px] text-stone-soft tracking-widest">
				{t("auth.footer")}
			</p>
		</div>
	);
}
