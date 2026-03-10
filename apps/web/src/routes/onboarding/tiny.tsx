import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/tiny")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/onboarding/tiny"!</div>;
}
