import * as v from "valibot";

export const onboardingSchema = v.object({
	identities: v.array(v.string()),
});

export type OnboardingInput = v.InferOutput<typeof onboardingSchema>;
