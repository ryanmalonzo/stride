import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/habit-build")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/onboarding/habit-build"!</div>;
}
