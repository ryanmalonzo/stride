import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const SignUpInputSchema = z.object({
	email: z.email().openapi({ example: "john.doe@gmail.com" }),
	password: z
		.string()
		.min(8)
		.max(256)
		.openapi({ example: "stride-habit-tracker" }),
});

const route = createRoute({
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

const app = new OpenAPIHono();

app.openapi(route, async (c) => {
	const { email, password } = c.req.valid("json");
	// TODO: call service
	return c.json(undefined);
});

export default app;
