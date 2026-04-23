import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClient } from "../../generated/prisma/client";
import { env } from "./env";
import type { AppError } from "./errors";

const adapter = new PrismaPg({
	connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export const PrismaErrorCode = {
	UniqueConstraint: "P2002",
} as const;

export function mapPrismaError(
	e: unknown,
	map: Partial<Record<string, AppError>>,
): never {
	if (e instanceof PrismaClientKnownRequestError) {
		const mapped = map[e.code];
		if (mapped) {
			throw mapped;
		}
	}
	throw e;
}
