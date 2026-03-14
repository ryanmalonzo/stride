import { onboardingSchema } from "@stride/common";
import * as v from "valibot";
import { protectedProcedure, router } from "../lib/trpc";

export const onboardingRouter = router({
	complete: protectedProcedure
		.input((data: unknown) => v.parse(onboardingSchema, data))
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.$transaction(async (tx) => {
				await tx.identity.createMany({
					data: input.identities.map((label) => ({
						userId: ctx.user.id,
						label,
					})),
				});

				await tx.struggle.createMany({
					data: input.struggles.map((label) => ({
						userId: ctx.user.id,
						label,
					})),
				});

				await tx.habit.create({
					data: {
						userId: ctx.user.id,
						type: input.habit.type,
						name: input.habit.name,
						tinyVersion: input.habit.tinyVersion,
						time:
							input.habit.type === "IMPLEMENTATION_INTENTION"
								? input.habit.time
								: null,
						location:
							input.habit.type === "IMPLEMENTATION_INTENTION"
								? input.habit.location
								: null,
						anchor:
							input.habit.type === "HABIT_STACK" ? input.habit.anchor : null,
					},
				});

				await tx.user.update({
					where: { id: ctx.user.id },
					data: { onboardingCompletedAt: new Date() },
				});
			});
		}),
});
