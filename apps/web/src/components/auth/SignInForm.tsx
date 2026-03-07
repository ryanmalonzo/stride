import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { InputWithLabel } from "../InputWithLabel";
import { OrDivider } from "./OrDivider";

export function SignInForm() {
	const { t } = useTranslation("auth");
	const { t: tForm } = useTranslation("form");

	return (
		<>
			<InputWithLabel
				label={tForm("email.label")}
				type="email"
				placeholder={tForm("email.placeholder")}
				autoComplete="email"
			/>
			<InputWithLabel
				label={tForm("password.label")}
				type="password"
				placeholder={tForm("password.placeholder")}
				autoComplete="current-password"
			/>

			<div className="flex justify-end -mt-2 mb-6">
				<a
					href="#!"
					className="text-[13px] text-stone-muted border-b border-stone-hover no-underline"
				>
					{t("signIn.forgotPassword")}
				</a>
			</div>

			<Button>{t("signIn.signIn")}</Button>

			<OrDivider />

			<div className="flex items-center justify-center gap-1.5">
				<span className="text-sm text-stone-muted">
					{t("signIn.dontHaveAnAccount")}
				</span>
				<Link
					to="/sign-up"
					className="text-sm font-semibold text-bark underline underline-offset-[3px]"
				>
					{t("signIn.createOne")}
				</Link>
			</div>
		</>
	);
}
