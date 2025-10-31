import { NavLink } from "react-router-dom";
import { FaHome, FaBookOpen, FaUserFriends } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import logo from "../assets/logo-dark-2.png";

const Sidebar = () => {
	return (
		<aside className="w-72 h-full bg-[#18212F] text-white flex flex-col items-center">
			{/* Logo */}
			<div className="flex flex-col items-center mb-10 pointer-events-none">
				<img
					src={logo}
					alt="logo"
					className="w-full h-36 object-contain mt-5"
				/>
				<h1 className="text-gray-300 text-xl text-center font-custom -mt-2 font-semibold">
					Wild Forest Staycation
				</h1>
			</div>

			{/* Navigation */}
			<nav className="w-full flex flex-col gap-2 px-4">
				<NavLink
					to="/dashboard"
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
							isActive
								? "bg-[#111827] text-white"
								: "text-gray-400 hover:bg-[#111827] hover:text-white"
						}`
					}
				>
					{({ isActive }) => (
						<>
							<FaHome
								className={`text-lg ${
									isActive ? "text-[#CC9A3A]" : ""
								}`}
							/>
							<span className="">Home</span>
						</>
					)}
				</NavLink>

				<NavLink
					to="/bookings"
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
							isActive
								? "bg-[#111827] text-white"
								: "text-gray-400 hover:bg-[#111827] hover:text-white"
						}`
					}
				>
					{({ isActive }) => (
						<>
							<FaBookOpen
								className={`text-lg ${
									isActive ? "text-[#CC9A3A]" : ""
								}`}
							/>
							<span className="">Bookings</span>
						</>
					)}
				</NavLink>

				<NavLink
					to="/cabins"
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
							isActive
								? "bg-[#111827] text-white"
								: "text-gray-400 hover:bg-[#111827] hover:text-white"
						}`
					}
				>
					{({ isActive }) => (
						<>
							<GiCampingTent
								className={`text-lg ${
									isActive ? "text-[#CC9A3A]" : ""
								}`}
							/>
							<span className="">Cabins</span>
						</>
					)}
				</NavLink>

				<NavLink
					to="/users"
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
							isActive
								? "bg-[#111827] text-white"
								: "text-gray-400 hover:bg-[#111827] hover:text-white"
						}`
					}
				>
					{({ isActive }) => (
						<>
							<FaUserFriends
								className={`text-lg ${
									isActive ? "text-[#CC9A3A]" : ""
								}`}
							/>
							<span className="">Users</span>
						</>
					)}
				</NavLink>

				<NavLink
					to="/settings"
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
							isActive
								? "bg-[#111827] text-white"
								: "text-gray-400 hover:bg-[#111827] hover:text-white"
						}`
					}
				>
					{({ isActive }) => (
						<>
							<FiSettings
								className={`text-lg ${
									isActive ? "text-[#CC9A3A]" : ""
								}`}
							/>
							<span className="">Settings</span>
						</>
					)}
				</NavLink>
			</nav>
		</aside>
	);
};

export default Sidebar;
