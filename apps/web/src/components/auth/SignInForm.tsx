import { valibotResolver } from "@hookform/resolvers/valibot";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as v from "valibot";
import { signIn } from "../../lib/auth-client";
import { Button } from "../Button";
import { InputWithLabel } from "../InputWithLabel";
import { OrDivider } from "./OrDivider";

type FormValues = {
	email: string;
	password: string;
};

export function SignInForm() {
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
			),
		}),
	);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: valibotResolver(schema),
	});

	async function onSubmit({ email, password }: FormValues) {
		await signIn.email(
			{ email, password },
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
					autoComplete="current-password"
					error={errors.password?.message}
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

				<Button type="submit" loading={isSubmitting}>
					{t("signIn.signIn")}
				</Button>
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
