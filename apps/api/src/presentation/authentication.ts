import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { setSignedCookie } from "hono/cookie";
import { env } from "../lib/env";
import * as authenticationService from "../services/authentication";

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
	await authenticationService.signUp(email, password);
	return c.json(undefined);
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
	const { userId } = await authenticationService.signIn(email, password);

	await setSignedCookie(c, "session", userId, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "Strict",
		maxAge: 60 * 60 * 24 * 30, // 30 days
		path: "/",
	});

	return c.json(undefined);
});

export default app;
