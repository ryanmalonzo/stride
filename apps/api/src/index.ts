import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import authenticationRouter from "./presentation/authentication";

const app = new OpenAPIHono();

app.route("/", authenticationRouter);

app.doc("/openapi", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "Stride API",
	},
});

app.get("/docs", Scalar({ url: "/openapi" }));

export default app;
