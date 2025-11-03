import supabase from "./supabase";

export async function getAllRooms() {
	try {
		const { data: rooms, error } = await supabase.from("rooms").select("*");

		if (error) throw new Error(error.message);

		return rooms;
	} catch (err) {
		// Catch both Supabase and unexpected runtime errors
		console.error("Error fetching rooms:", err.message);
		throw new Error("Failed to fetch rooms");
	}
}
