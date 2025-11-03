import { useEffect } from "react";
import { getAllRooms } from "../services/apiRooms";

const Rooms = () => {
	useEffect(() => {
		const fetchAllRooms = async () => {
			try {
				const rooms = await getAllRooms();
				console.log("Fetched Data:", rooms);
			} catch (error) {
				console.log("Error:", error.message);
			}
		};

		fetchAllRooms();
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<h1>All Rooms</h1>
			<table className="border  border-gray-700 w-full text-xs">
				<thead className="bg-gray-800">
					<tr className="flex justify-around p-3 uppercase rounded-2xl">
						<th>Rooms</th>
						<th>Price</th>
						<th>Capacity</th>
						<th>Discounts</th>
					</tr>
				</thead>
			</table>
		</div>
	);
};

export default Rooms;
