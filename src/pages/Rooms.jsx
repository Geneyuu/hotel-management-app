import { getAllRooms } from "../services/apiRooms";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";

import { useEffect, useRef, useState } from "react";
const Rooms = () => {
	const {
		isLoading,
		data: rooms = [],
		error,
	} = useQuery({
		queryKey: ["rooms"],
		queryFn: getAllRooms,
	});

	const [openMenuId, setOpenMenuId] = useState(null);
	const menuRef = useRef(null);

	const toggleMenu = (id) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				!event.target.closest(".dropdown-button")
			) {
				setOpenMenuId(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setOpenMenuId]);

	if (isLoading) return <Spinner />;

	if (error instanceof Error) {
		return <p className="text-red-500">Error: {error.message}</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-lg md:text-2xl font-semibold text-white">
				All Rooms
			</h1>

			<table className="border border-gray-700 w-full text-[10px] sm:text-xs md:text-sm">
				<thead className="bg-gray-800 text-white">
					<tr className="text-center uppercase">
						<th className="p-2 sm:p-3 text-start pl-3 sm:pl-6">
							Rooms
						</th>
						<th className="p-2 sm:p-3">Price</th>
						<th className="p-2 sm:p-3">Capacity</th>
						<th className="p-2 sm:p-3">Discounts</th>
						<th className="p-2 sm:p-3">Actions</th>
					</tr>
				</thead>

				<tbody className="font-normal">
					{rooms.map((room) => {
						const { id, name, image, price, Capacity, discount } =
							room;

						return (
							<tr key={id}>
								<td className="border-t border-gray-700">
									<div className="flex items-center gap-2 sm:gap-4 md:gap-5">
										<img
											src={
												image ||
												"https://via.placeholder.com/500"
											}
											alt={name}
											className="w-12 sm:w-16 md:w-24 object-cover rounded-md"
										/>
										<span className="text-[11px] sm:text-sm text-white">
											{name}
										</span>
									</div>
								</td>
								<td className="border-t border-gray-700 text-center text-white">
									<span className="text-[11px] sm:text-sm">
										${price}
									</span>
								</td>
								<td className="border-t border-gray-700 text-center text-white">
									<span className="text-[11px] sm:text-sm">
										Fits up to {Capacity}
									</span>
								</td>
								<td className="border-t border-gray-700 text-center text-white">
									<span className="text-[11px] sm:text-sm">
										{discount ? `${discount}%` : "—"}
									</span>
								</td>
								<td className="border-t border-gray-700 text-center text-white relative">
									<span
										tabIndex={0}
										className="dropdown-button  sm:text-sm cursor-pointer inline-block p-1 rounded transition-all duration-200 hover:bg-[#18212F] 	focus:outline-none focus:ring-1 focus:ring-[#6C63FF] focus:ring-offset-1 focus:ring-offset-[#18212F]"
										onClick={() => toggleMenu(id)}
									>
										<HiOutlineDotsVertical className="text-sm md:text-lg" />
									</span>

									{/* Dropdown menu with animation */}
									<div
										ref={menuRef}
										className={`absolute right-2 md:-left-16 lg:-left-4 mt-2 w-32 bg-gray-800  rounded shadow-2xl z-10 transform transition-all duration-200  ${
											openMenuId === id
												? "scale-100 opacity-100"
												: "scale-95 opacity-0 pointer-events-none"
										}`}
										style={{
											boxShadow:
												"5px 5px 20px rgba(0,0,0,0.4)",
										}}
									>
										<ul className="flex flex-col">
											<li
												className="flex items-center gap-2 px-3 py-2 text-white text-xs  cursor-pointer transform transition-all duration-200 hover:bg-[#18212F] "
												onClick={() =>
													alert(
														`Duplicate room ${name}`
													)
												}
											>
												<IoCopyOutline className="w-4 h-4" />
												Duplicate
											</li>
											<li
												className="flex items-center gap-2 px-3 py-2 text-white text-xs  cursor-pointer transform transition-all duration-200 hover:bg-[#18212F] "
												onClick={() =>
													alert(`Edit room ${name}`)
												}
											>
												<HiPencil className="w-4 h-4" />
												Edit
											</li>
											<li
												className="flex items-center gap-2 px-3 py-2 text-white text-xs cursor-pointer transform transition-all duration-200 hover:bg-[#18212F] "
												onClick={() =>
													alert(`Delete room ${name}`)
												}
											>
												<HiTrash className="w-4 h-4" />
												Delete
											</li>
										</ul>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Rooms;
