import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/reminder")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/onboarding/reminder"!</div>;
}
