import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { queryClient } from "../lib/query";
import { trpc, trpcClient } from "../lib/trpc";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<Toaster />
			</QueryClientProvider>
		</trpc.Provider>
	);
}
