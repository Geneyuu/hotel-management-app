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
			staleTime: 5000, // data is fresh for 5 seconds
			refetchOnMount: true, // auto refetch if stale when component mounts
			refetchOnWindowFocus: true, // auto refetch if tab/window gains focus
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
