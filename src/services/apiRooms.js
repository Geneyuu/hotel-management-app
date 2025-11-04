import supabase from "./supabase";

export async function getAllRooms() {
    try {
        const { data: rooms, error } = await supabase.from("rooms").select("*");

        if (error) {
            throw new Error(error.message);
        }

        return rooms;
    } catch (err) {
        // Catch both Supabase and unexpected runtime errors
        console.error("Error fetching rooms:", err.message);
        throw new Error("Failed to fetch rooms");
    }
}

//idedelete ang row base sa selected ID
export async function deleteRoom(id) {
    try {
        const { data, error } = await supabase.from("rooms").delete().eq("id", id).select();

        if (error) {
            throw new Error("Failed to delete room");
        }

        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
