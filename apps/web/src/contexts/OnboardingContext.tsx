import type { OnboardingInput } from "@stride/common";
import { createContext, useContext, useState } from "react";

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

interface OnboardingContextValue {
	data: OnboardingData;
	setData: (partial: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [data, setDataRaw] = useState<OnboardingData>(defaultData);

	function setData(partial: Partial<OnboardingData>) {
		setDataRaw((prev) => ({ ...prev, ...partial }));
	}

	return (
		<OnboardingContext.Provider value={{ data, setData }}>
			{children}
		</OnboardingContext.Provider>
	);
}

export function useOnboarding(): OnboardingContextValue {
	const ctx = useContext(OnboardingContext);
	if (!ctx) {
		throw new Error("useOnboarding must be used within OnboardingProvider");
	}
	return ctx;
}
