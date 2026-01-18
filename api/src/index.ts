import { Hono } from "hono";
import { logger } from "hono/logger";
import auth from "./routes/auth";

const app = new Hono();
const api = new Hono();

api.use(logger());
api.route("/auth", auth);

app.route("/api", api);

export default app;
