import { initTRPC } from "@trpc/server";
import type { Context } from "hono";
import { authenticationRouter } from "./authentication";

export type TRPCContext = { honoCtx: Context };

const t = initTRPC.context<TRPCContext>().create();

export const publicProcedure = t.procedure;
export const router = t.router;

export const appRouter = router({
	authentication: authenticationRouter,
});

export type AppRouter = typeof appRouter;
