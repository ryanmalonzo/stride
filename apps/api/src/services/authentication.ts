import { ConflictError } from "../lib/errors";
import { prisma } from "../lib/prisma";

export async function signUp(email: string, password: string): Promise<void> {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		throw new ConflictError("Email already registered");
	}

	await prisma.user.create({
		data: {
			email,
			password: await Bun.password.hash(password, {
				algorithm: "argon2id",
			}),
		},
	});
}
