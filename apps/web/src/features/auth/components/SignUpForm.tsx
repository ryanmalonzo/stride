import { valibotResolver } from "@hookform/resolvers/valibot";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as v from "valibot";
import { Button } from "../../../components/Button";
import { InputWithLabel } from "../../../components/InputWithLabel";
import { signUp } from "../../../lib/auth-client";
import { OrDivider } from "./OrDivider";

type FormValues = {
	email: string;
	password: string;
	confirmPassword: string;
};

export function SignUpForm() {
	const navigate = useNavigate();
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
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: valibotResolver(schema),
	});

	async function onSubmit(data: FormValues) {
		const { email, password } = data;
		await signUp.email(
			{
				email,
				password,
				name: email,
			},
			{
				onSuccess: () => {
					navigate({ to: "/onboarding" });
				},
				onError: ({ error }) => {
					toast.error(error.message);
				},
			},
		);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className="flex flex-col gap-4"
			>
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

				<Button type="submit" loading={isSubmitting}>
					{t("signUp.createAccount")}
				</Button>
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
