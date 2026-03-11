import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { OnboardingData } from "./types";

interface OnboardingStore {
	data: OnboardingData;
	setData: (partial: Partial<OnboardingData>) => void;
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
			setData: (partial) =>
				set((state) => ({ data: { ...state.data, ...partial } })),
		}),
		{
			name: "stride-onboarding-store",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({ data: state.data }),
		},
	),
);

export type { OnboardingData } from "./types";
