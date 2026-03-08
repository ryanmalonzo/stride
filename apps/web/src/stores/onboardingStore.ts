import type { OnboardingInput } from "@stride/common";
import { create } from "zustand";
import i18n from "../i18n";

export const IDENTITIES = [
	{ id: "athlete", icon: "🏃", label: "An athlete" },
	{ id: "reader", icon: "📚", label: "A reader" },
	{ id: "artist", icon: "✏️", label: "An artist" },
	{ id: "finance", icon: "💰", label: "Financially responsible" },
	{ id: "learner", icon: "🇯🇵", label: "A polyglot" },
] as const;

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

const IDENTITY_LABEL_MAP = Object.fromEntries(
	IDENTITIES.map(({ id, label }) => [id, label]),
);

export function toOnboardingInput(data: OnboardingData): OnboardingInput {
	const identities = data.selectedIdentityKeys.map((key) =>
		key === "other"
			? data.otherIdentity
			: i18n.t(`onboarding:identity.options.${key}`, {
					defaultValue: IDENTITY_LABEL_MAP[key],
				}),
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
