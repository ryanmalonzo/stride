import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { AppError } from "./lib/errors";
import { appRouter } from "./presentation";

const app = new Hono();

app.onError((err, c) => {
	if (err instanceof AppError) {
		return c.json({ error: err.message }, err.statusCode);
	}
	return c.json({ error: "Internal Server Error" }, 500);
});

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, c) => ({ honoCtx: c }),
	}),
);

export default app;
