import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout"; // 🔥 instead of App.jsx
import Home from "../pages/Home";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Navigate to="/dashboard" replace /> },
			{ path: "dashboard", element: <Home /> },
			{ path: "bookings", element: <Bookings /> },
			{ path: "cabins", element: <Cabins /> },
			{ path: "users", element: <Users /> },
			{ path: "settings", element: <Settings /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);

export default routes;
