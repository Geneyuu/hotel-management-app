import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FaGalacticSenate } from "react-icons/fa6";

const queryClient = new QueryClient({
	//global default behavior
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // wag auto refetch pag balik sa tab
			// retry: 1, // ilang beses magre-retry pag failed
			staleTime: 60 * 1000,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={FaGalacticSenate} />
			<RouterProvider router={routes} />
		</QueryClientProvider>
	);
};

export default App;
