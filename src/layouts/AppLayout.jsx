import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderMobile from "../components/HeaderMobile";
import AccountHeader from "../components/AccountHeader";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-[#111827] text-white flex flex-col md:flex-row">
            {/* Header for mobile screens */}
            <header className="md:hidden">
                <HeaderMobile />
            </header>

            {/* Sidebar for large screens */}
            <aside className="hidden md:flex">
                <Sidebar />
            </aside>

            {/* Main content area */}
            <main className="flex-1 overflow-y-scroll scrollbar-dark">
                {/* Secondary header (account info, toolbar, etc.) */}
                <header className="sticky top-0 z-50">
                    <AccountHeader />
                </header>

                <section className="max-w-6xl px-4 mx-auto my-10 text-2xl font-semibold text-gray-200 z-0">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default AppLayout;
