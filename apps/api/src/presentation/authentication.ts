import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Context } from "hono";
import { setSignedCookie } from "hono/cookie";
import { env } from "../lib/env";
import * as authenticationService from "../services/authentication";

async function setSessionCookie(c: Context, sessionId: string) {
	await setSignedCookie(c, "session", sessionId, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "Strict",
		maxAge: authenticationService.SESSION_DURATION_MS / 1000,
		path: "/",
	});
}

const app = new OpenAPIHono();

const SignUpInputSchema = z.object({
	email: z.email().openapi({ example: "john.doe@gmail.com" }),
	password: z
		.string()
		.min(8)
		.max(256)
		.openapi({ example: "stride-habit-tracker" }),
});
const signUpRoute = createRoute({
	method: "post",
	path: "/sign-up",
	request: {
		body: {
			content: {
				"application/json": {
					schema: SignUpInputSchema,
				},
			},
			required: true,
		},
	},
	responses: {
		201: {
			content: {
				"application/json": undefined,
			},
			description: "User created",
		},
	},
});

app.openapi(signUpRoute, async (c) => {
	const { email, password } = c.req.valid("json");

	const { sessionId } = await authenticationService.signUp(email, password);
	await setSessionCookie(c, sessionId);

	return c.body(null, 201);
});

const SignInInputSchema = z.object({
	email: z.email().openapi({ example: "john.doe@gmail.com" }),
	password: z.string().min(1).openapi({ example: "stride-habit-tracker" }),
});
const signInRoute = createRoute({
	method: "post",
	path: "/sign-in",
	request: {
		body: {
			content: {
				"application/json": {
					schema: SignInInputSchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				"application/json": undefined,
			},
			description: "User signed in",
		},
	},
});

app.openapi(signInRoute, async (c) => {
	const { email, password } = c.req.valid("json");

	const { sessionId } = await authenticationService.signIn(email, password);
	await setSessionCookie(c, sessionId);

	return c.body(null, 200);
});

export default app;
