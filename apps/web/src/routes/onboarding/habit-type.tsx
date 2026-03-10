import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/habit-type")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/onboarding/habit-type"!</div>;
}
