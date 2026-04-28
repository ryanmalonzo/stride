import type { Context } from "hono";
import { setSignedCookie } from "hono/cookie";
import { z } from "zod";
import { env } from "../lib/env";
import * as authenticationService from "../services/authentication";
import { publicProcedure, router } from ".";

async function setSessionCookie(c: Context, sessionId: string) {
	await setSignedCookie(c, "session", sessionId, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "Strict",
		maxAge: authenticationService.SESSION_DURATION_MS / 1000,
		path: "/",
	});
}

const SignUpInputSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(256),
});
export const signUp = publicProcedure
	.input(SignUpInputSchema)
	.mutation(async ({ input, ctx }) => {
		const { email, password } = input;
		const { sessionId } = await authenticationService.signUp(email, password);
		await setSessionCookie(ctx.honoCtx, sessionId);
	});

const SignInInputSchema = z.object({
	email: z.email(),
	password: z.string().min(1),
});
export const signIn = publicProcedure
	.input(SignInInputSchema)
	.mutation(async ({ input, ctx }) => {
		const { email, password } = input;
		const { sessionId } = await authenticationService.signIn(email, password);
		await setSessionCookie(ctx.honoCtx, sessionId);
	});

export const authenticationRouter = router({
	signUp,
	signIn,
});
