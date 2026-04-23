import { ConflictError, UnauthorizedError } from "../lib/errors";
import { mapPrismaError, PrismaErrorCode, prisma } from "../lib/prisma";

export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

async function createSession(userId: string): Promise<string> {
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
	const session = await prisma.userSession.create({
		data: { userId, expiresAt },
	});
	return session.id;
}

export async function signUp(
	email: string,
	password: string,
): Promise<{ sessionId: string }> {
	let user: { id: string };
	try {
		user = await prisma.user.create({
			data: {
				email,
				password: await Bun.password.hash(password, {
					algorithm: "argon2id",
				}),
			},
			select: { id: true },
		});
	} catch (e) {
		mapPrismaError(e, {
			[PrismaErrorCode.UniqueConstraint]: new ConflictError(
				"Email already registered",
			),
		});
	}

	const sessionId = await createSession(user.id);
	return { sessionId };
}

export async function signIn(
	email: string,
	password: string,
): Promise<{ sessionId: string }> {
	const user = await prisma.user.findUnique({
		where: { email },
		select: { id: true, password: true },
	});

	if (!user || !(await Bun.password.verify(password, user.password))) {
		throw new UnauthorizedError("Invalid credentials");
	}

	const sessionId = await createSession(user.id);
	return { sessionId };
}
