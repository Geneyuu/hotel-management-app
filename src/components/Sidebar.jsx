import { NavLink } from "react-router-dom";
import { FaHome, FaBookOpen, FaUserFriends } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import logo from "../assets/logo-dark.png";

const Sidebar = () => {
	const overviewLink = {
		to: "/dashboard",
		label: "Overview",
		icon: <FaHome />,
	};

	// Daily Operation links
	const operationLinks = [
		{ to: "/reservations", label: "Reservations", icon: <FaBookOpen /> },
		{ to: "/rooms", label: "Rooms", icon: <GiCampingTent /> },
		{ to: "/users", label: "Users", icon: <FaUserFriends /> },
	];

	// Others (bottom section)
	const otherLinks = [
		{ to: "/settings", label: "Settings", icon: <FiSettings /> },
	];

	return (
		<aside className="w-72 h-full bg-[#18212F] text-white flex flex-col justify-between border-r-[1px] border-gray-300/10">
			{/* Top section (logo + overview + operations) */}
			<div className="flex flex-col items-center w-full">
				{/* Logo */}
				<div className="flex flex-col items-center mb-8 mt-5 pointer-events-none">
					<img
						src={logo}
						alt="logo"
						className="w-36 h-36 object-contain"
					/>
				</div>

				{/* Overview link */}
				<nav className="w-full px-3 mb-4">
					<NavLink
						to={overviewLink.to}
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors duration-300 ${
								isActive
									? "bg-[#111827] text-white"
									: "text-gray-400 hover:bg-[#111827] hover:text-white"
							}`
						}
					>
						{({ isActive }) => (
							<>
								<span
									className={`text-lg ${
										isActive ? "text-[#4f46e5]" : ""
									}`}
								>
									{overviewLink.icon}
								</span>
								<span>{overviewLink.label}</span>
							</>
						)}
					</NavLink>
				</nav>

				{/* Divider line */}
				<div className="w-11/12 h-[1px] bg-gray-700 mb-8" />

				{/* Daily Operation section */}
				<p className="w-full px-6 text-xs text-gray-400 uppercase tracking-wider mb-4 -ml-2">
					Daily Operation
				</p>
				<nav className="w-full flex flex-col gap-2 px-3">
					{operationLinks.map(({ to, label, icon }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors duration-300 ${
									isActive
										? "bg-[#111827] text-white"
										: "text-gray-400 hover:bg-[#111827] hover:text-white"
								}`
							}
						>
							{({ isActive }) => (
								<>
									<span
										className={`text-lg ${
											isActive ? "text-[#4f46e5]" : ""
										}`}
									>
										{icon}
									</span>
									<span>{label}</span>
								</>
							)}
						</NavLink>
					))}
				</nav>
			</div>

			{/* Bottom section (Others + Logout) */}
			<div className="w-full mb-6 flex flex-col items-start px-3">
				<p className="w-full px-3 text-xs text-gray-400 uppercase tracking-wider mb-2 -ml-2">
					Others
				</p>

				{/* Settings link */}
				{otherLinks.map(({ to, label, icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors duration-300 w-full ${
								isActive
									? "bg-[#111827] text-white"
									: "text-gray-400 hover:bg-[#111827] hover:text-white"
							}`
						}
					>
						{({ isActive }) => (
							<>
								<span
									className={`text-lg ${
										isActive ? "text-[#4f46e5]" : ""
									}`}
								>
									{icon}
								</span>
								<span>{label}</span>
							</>
						)}
					</NavLink>
				))}

				{/* Divider line */}
				<div className="w-11/12 h-[1px] bg-gray-700 mt-5" />

				{/* Logout button */}
				<button className="flex items-center gap-3 text-sm text-gray-400 hover:text-white hover:bg-red-700 px-4 py-2 rounded-md mt-2 w-fit transition-colors duration-300">
					<span className="text-lg text-white">
						<GoSignOut />
					</span>
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
