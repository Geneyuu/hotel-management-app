import { NavLink } from "react-router-dom";
import { FaHome, FaBookOpen, FaUserFriends } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import logo from "../assets/logo-dark.png";

const Header = () => {
	// Instead na gawing responsive yung sidebar, gumawa nalang ako ng another component for header in desktop to large desktop
	return (
		<header className=" bg-[#18212F] text-white flex items-center justify-between px-4 py-3 md:hidden">
			{/* Logo */}
			<div className="flex items-center gap-2 pointer-events-none">
				<img
					src={logo}
					alt="logo"
					className="w-24 h-auto object-cover"
				/>
			</div>

			{/* Navigation Icons */}
			<nav className="flex items-center gap-4">
				{[
					{ to: "/dashboard", icon: <FaHome /> },
					{ to: "/bookings", icon: <FaBookOpen /> },
					{ to: "/cabins", icon: <GiCampingTent /> },
					{ to: "/users", icon: <FaUserFriends /> },
					{ to: "/settings", icon: <FiSettings /> },
				].map(({ to, icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`p-2 rounded-md transition-colors duration-200 ${
								isActive
									? "text-[#4f46e5] bg-[#111827]"
									: "text-gray-400 hover:text-white hover:bg-[#111827]"
							}`
						}
					>
						<span className="text-xl">{icon}</span>
					</NavLink>
				))}
			</nav>
		</header>
	);
};

export default Header;
