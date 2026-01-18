import { Hono } from "hono";
import { logger } from "hono/logger";
import auth from "./routes/auth";

const app = new Hono();

app.use(logger());
app.route("/auth", auth);

export default app;
