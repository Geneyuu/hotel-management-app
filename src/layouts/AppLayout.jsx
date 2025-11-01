import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AccountHeader from "../components/AccountHeader";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-[#111827] text-white flex flex-col md:flex-row">
			{/* Header for medium to small screens */}
			<div className="md:hidden">
				<Header />
			</div>

			{/* Sidebar for large screens */}
			<div className="hidden md:flex">
				<Sidebar />
			</div>

			{/* Main content area */}
			<main className="flex-1 overflow-y-auto">
				<AccountHeader />
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
