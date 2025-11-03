import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AccountHeader from "../components/AccountHeader";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-[#111827] text-white flex flex-col md:flex-row">
			{/* Header for mobile screens */}
			<header className="md:hidden">
				<Header />
			</header>

			{/* Sidebar for large screens */}
			<aside className="hidden md:flex">
				<Sidebar />
			</aside>

			{/* Main content area */}
			<main className="flex-1 overflow-y-auto">
				{/* Secondary header (account info, toolbar, etc.) */}
				<header>
					<AccountHeader />
				</header>

				<section className="max-w-6xl px-6 mx-auto my-10 text-2xl font-semibold text-gray-200">
					<Outlet />
				</section>
			</main>
		</div>
	);
};

export default AppLayout;
