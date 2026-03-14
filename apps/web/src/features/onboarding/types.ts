export type IdentityId =
	| "athlete"
	| "reader"
	| "artist"
	| "finance"
	| "learner"
	| "other";

export type StruggleId =
	| "consistency"
	| "forgetting"
	| "motivation"
	| "busy"
	| "tracking";

export type IdentityOption = {
	id: Exclude<IdentityId, "other">;
	icon: string;
	label: string;
};

export type StruggleOption = {
	id: StruggleId;
	label: string;
};

export type OnboardingData = {
	selectedIdentityKeys: IdentityId[];
	otherIdentity: string;
	selectedStruggleKeys: StruggleId[];
	habitType: "intention" | "stack" | null;
	intention: {
		action: string;
		time: string;
		otherTime: string;
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
