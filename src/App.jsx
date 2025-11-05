import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FaGalacticSenate } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    //global default behavior
    defaultOptions: {
        queries: {
            staleTime: 5000,
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={FaGalacticSenate} />
            <RouterProvider router={routes} />
            <Toaster
                position="top-right"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#111827",
                        color: "white",
                    },
                }}
            />
        </QueryClientProvider>
    );
};

export default App;
