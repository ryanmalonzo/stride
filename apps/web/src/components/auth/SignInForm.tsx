import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { signIn } from "../../lib/auth-client";
import { Button } from "../Button";
import { InputWithLabel } from "../InputWithLabel";
import { OrDivider } from "./OrDivider";

type FormValues = {
	email: string;
	password: string;
};

export function SignInForm() {
	const { t } = useTranslation("auth");
	const { t: tForm } = useTranslation("form");

	const { register, handleSubmit } = useForm<FormValues>();

	async function onSubmit({ email, password }: FormValues) {
		await signIn.email(
			{ email, password },
			{
				onError: ({ error }) => {
					toast.error(error.message);
				},
			},
		);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputWithLabel
					label={tForm("email.label")}
					type="email"
					placeholder={tForm("email.placeholder")}
					autoComplete="email"
					{...register("email")}
				/>
				<InputWithLabel
					label={tForm("password.label")}
					type="password"
					placeholder={tForm("password.placeholder")}
					autoComplete="current-password"
					{...register("password")}
				/>

				<div className="flex justify-end -mt-2 mb-6">
					<a
						href="#!"
						className="text-[13px] text-stone-muted border-b border-stone-hover no-underline"
					>
						{t("signIn.forgotPassword")}
					</a>
				</div>

				<Button type="submit">{t("signIn.signIn")}</Button>
			</form>

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
