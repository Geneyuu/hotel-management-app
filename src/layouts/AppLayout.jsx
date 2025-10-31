import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
	return (
		<div className="h-screen bg-[#111827] text-white flex justify-center">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<main className="flex-1 p-6">
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
