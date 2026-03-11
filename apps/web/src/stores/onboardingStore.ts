import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { IdentityId, StruggleId } from "../onboarding/types";

export type OnboardingData = {
	selectedIdentityKeys: IdentityId[];
	otherIdentity: string;
	selectedStruggleKeys: StruggleId[];
	habitType: "intention" | "stack" | null;
	intention: {
		action: string;
		time: string;
		specificTime: string;
		location: string;
		otherLocation: string;
	};
	stack: {
		anchor: string;
		newHabit: string;
	};
	tinyVersion: string;
	reminder: "browser" | "advanced" | null;
};

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
