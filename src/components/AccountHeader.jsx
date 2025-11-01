import { NavLink } from "react-router-dom";
import { IoPersonOutline, IoSunnyOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";

const AccountHeader = () => {
	return (
		<header className="hidden md:flex w-full bg-[#18212F] justify-end items-center px-8 py-4 border-b border-gray-300/10">
			<div className="flex items-center gap-2">
				<img
					src="https://i.pravatar.cc/500"
					alt="Profile"
					className="w-8 h-8 rounded-full object-cover border border-gray-600"
				/>
				<span className="text-xs text-gray-300 mr-4">
					Eugene Escario
				</span>

				<div className="flex items-center gap-3 text-[#6C63FF] text-lg">
					{/* Account Icon with NavLink */}
					<NavLink
						to="/account"
						className="p-1 rounded-sm hover:bg-[#374151a4] transition-all duration-75 cursor-pointer
						focus:outline-none focus:ring-1 focus:ring-[#6C63FF] focus:ring-offset-1 focus:ring-offset-[#18212F]"
					>
						<IoPersonOutline />
					</NavLink>

					{/* Theme Icon */}
					<button
						className="p-1 rounded-sm hover:bg-[#374151a4] transition-all duration-75 cursor-pointer
						focus:outline-none focus:ring-1 focus:ring-[#6C63FF] focus:ring-offset-1 focus:ring-offset-[#18212F]"
					>
						<IoSunnyOutline />
					</button>

					{/* Logout Icon */}
					{/* <button
						className="p-1 rounded-sm hover:bg-[#374151a4] transition-all duration-75 cursor-pointer
						focus:outline-none focus:ring-1 focus:ring-[#6C63FF] focus:ring-offset-1 focus:ring-offset-[#18212F]"
					>
						<GoSignOut />
					</button> */}
				</div>
			</div>
		</header>
	);
};

export default AccountHeader;
