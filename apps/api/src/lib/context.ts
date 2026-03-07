import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { auth } from "./auth";
import { prisma } from "./prisma";

export async function createContext({ req }: FetchCreateContextFnOptions) {
	const session = await auth.api.getSession({
		headers: req.headers,
	});

	return { prisma, session, req };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
