import * as v from "valibot";

const intentionHabitSchema = v.object({
	type: v.literal("IMPLEMENTATION_INTENTION"),
	name: v.pipe(v.string(), v.minLength(1)),
	tinyVersion: v.pipe(v.string(), v.minLength(1)),
	time: v.pipe(v.string(), v.minLength(1)),
	location: v.pipe(v.string(), v.minLength(1)),
});

const stackHabitSchema = v.object({
	type: v.literal("HABIT_STACK"),
	name: v.pipe(v.string(), v.minLength(1)),
	tinyVersion: v.pipe(v.string(), v.minLength(1)),
	anchor: v.pipe(v.string(), v.minLength(1)),
});

export const onboardingSchema = v.object({
	identities: v.array(v.string()),
	struggles: v.array(v.string()),
	habit: v.variant("type", [intentionHabitSchema, stackHabitSchema]),
});

export type OnboardingInput = v.InferOutput<typeof onboardingSchema>;
