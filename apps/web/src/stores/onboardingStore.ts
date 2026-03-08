import type { OnboardingInput } from "@stride/common";
import { create } from "zustand";

export type OnboardingData = {
	selectedIdentityKeys: string[];
	otherIdentity: string;

	selectedStruggleKeys: string[];

	habitType: "intention" | "stack" | null;

	intention: {
		action: string;
		time: string;
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

const IDENTITY_LABELS: Record<string, string> = {
	athlete: "An athlete",
	reader: "A reader",
	creator: "A creator",
	finance: "Financially responsible",
	learner: "A learner",
};

export function toOnboardingInput(data: OnboardingData): OnboardingInput {
	const identities = data.selectedIdentityKeys.map((key) =>
		key === "other" ? data.otherIdentity : (IDENTITY_LABELS[key] ?? key),
	);
	return { identities };
}

const defaultData: OnboardingData = {
	selectedIdentityKeys: [],
	otherIdentity: "",
	selectedStruggleKeys: [],
	habitType: null,
	intention: { action: "", time: "", location: "", otherLocation: "" },
	stack: { anchor: "", newHabit: "" },
	tinyVersion: "",
	reminder: null,
};

interface OnboardingStore {
	data: OnboardingData;
	setData: (partial: Partial<OnboardingData>) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
	data: defaultData,
	setData: (partial) =>
		set((state) => ({ data: { ...state.data, ...partial } })),
}));
