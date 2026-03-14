import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { getSession } from "../lib/auth-client";
import { queryClient } from "../lib/query";
import { trpc, trpcClient } from "../lib/trpc";

type Session = Awaited<ReturnType<typeof getSession>>["data"];

interface RouterContext {
	session: Session;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async () => {
		const { data: session } = await getSession();
		return { session };
	},
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
