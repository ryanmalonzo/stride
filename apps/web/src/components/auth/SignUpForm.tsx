import { valibotResolver } from "@hookform/resolvers/valibot";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as v from "valibot";
import { Button } from "../Button";
import { InputWithLabel } from "../InputWithLabel";
import { OrDivider } from "./OrDivider";

export function SignUpForm() {
	const { t } = useTranslation("auth");
	const { t: tForm } = useTranslation("form");

	const schema = v.pipe(
		v.object({
			email: v.pipe(
				v.string(),
				v.nonEmpty(tForm("email.errors.required")),
				v.email(tForm("email.errors.invalid")),
			),
			password: v.pipe(
				v.string(),
				v.nonEmpty(tForm("password.errors.required")),
				v.minLength(8, tForm("password.errors.minLength")),
			),
			confirmPassword: v.string(),
		}),
		v.forward(
			v.partialCheck(
				[["password"], ["confirmPassword"]],
				(input) => input.password === input.confirmPassword,
				tForm("confirmPassword.errors.match"),
			),
			["confirmPassword"],
		),
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: valibotResolver(schema),
	});

	function onSubmit(data: unknown) {
		console.log(data);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<InputWithLabel
					label={tForm("email.label")}
					type="email"
					placeholder={tForm("email.placeholder")}
					autoComplete="email"
					error={errors.email?.message}
					{...register("email")}
				/>
				<InputWithLabel
					label={tForm("password.label")}
					type="password"
					placeholder={tForm("password.placeholder")}
					autoComplete="new-password"
					error={errors.password?.message}
					{...register("password")}
				/>
				<InputWithLabel
					label={tForm("confirmPassword.label")}
					type="password"
					placeholder={tForm("password.placeholder")}
					autoComplete="new-password"
					error={errors.confirmPassword?.message}
					{...register("confirmPassword")}
				/>

				<Button type="submit">{t("signUp.createAccount")}</Button>
			</form>

			<OrDivider />

			<div className="flex items-center justify-center gap-1.5">
				<span className="text-sm text-stone-muted">
					{t("signUp.alreadyHaveAnAccount")}
				</span>
				<Link
					to="/sign-in"
					className="text-sm font-semibold text-bark underline underline-offset-[3px]"
				>
					{t("signIn.signIn")}
				</Link>
			</div>
		</>
	);
}
