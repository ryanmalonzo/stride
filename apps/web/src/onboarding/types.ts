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
