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
		<div>
			<h1>All Rooms</h1>
		</div>
	);
};

export default Rooms;
