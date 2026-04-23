import { ConflictError, UnauthorizedError } from "../lib/errors";
import { mapPrismaError, PrismaErrorCode, prisma } from "../lib/prisma";

export async function signUp(email: string, password: string): Promise<void> {
	try {
		await prisma.user.create({
			data: {
				email,
				password: await Bun.password.hash(password, {
					algorithm: "argon2id",
				}),
			},
		});
	} catch (e) {
		mapPrismaError(e, {
			[PrismaErrorCode.UniqueConstraint]: new ConflictError(
				"Email already registered",
			),
		});
	}
}

export async function signIn(
	email: string,
	password: string,
): Promise<{ userId: string }> {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user || !(await Bun.password.verify(password, user.password))) {
		throw new UnauthorizedError("Invalid credentials");
	}

	return {
		userId: user.id,
	};
}
