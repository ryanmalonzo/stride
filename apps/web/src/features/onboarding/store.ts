import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ONBOARDING_STEPS, type OnboardingStep } from "./constants";
import type { OnboardingData } from "./types";

interface OnboardingStore {
	data: OnboardingData;
	unlockedStep: OnboardingStep;
	setData: (partial: Partial<OnboardingData>) => void;
	setUnlockedStep: (step: OnboardingStep) => void;
}

const defaultOnboardingData: OnboardingData = {
	selectedIdentityKeys: [],
	otherIdentity: "",
	selectedStruggleKeys: [],
	habitType: null,
	intention: {
		action: "",
		time: "",
		specificTime: "",
		location: "",
		otherLocation: "",
	},
	stack: { anchor: "", newHabit: "" },
	tinyVersion: "",
	reminder: null,
};

export const useOnboardingStore = create<OnboardingStore>()(
	persist(
		(set) => ({
			data: defaultOnboardingData,
			unlockedStep: ONBOARDING_STEPS[0],
			setData: (partial) =>
				set((state) => ({ data: { ...state.data, ...partial } })),
			setUnlockedStep: (unlockedStep) => set({ unlockedStep }),
		}),
		{
			name: "stride-onboarding-store",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				data: state.data,
				unlockedStep: state.unlockedStep,
			}),
		},
	),
);

export type { OnboardingData } from "./types";
