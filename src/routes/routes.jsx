import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Reservation from "../pages/Reservation";
import Rooms from "../pages/Rooms";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Account from "../pages/Account";

import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Navigate to="/dashboard" replace /> },
			{ path: "dashboard", element: <Home /> },
			{ path: "reservations", element: <Reservation /> },
			{ path: "rooms", element: <Rooms /> },
			{ path: "users", element: <Users /> },
			{ path: "settings", element: <Settings /> },
			{ path: "account", element: <Account /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);

export default routes;
