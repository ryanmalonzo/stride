import { router } from "../lib/trpc";
import { onboardingRouter } from "./onboarding";

export const appRouter = router({
	onboarding: onboardingRouter,
});

export type AppRouter = typeof appRouter;
