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

// export async function addRoom() {
//     const { data, error } = await supabase
//         .from("rooms")
//         .insert([
//             {
//                 name: "Deluxe Room",
//                 Capacity: 2500,
//                 price: 129,
//                 discount: 10,
//                 description: "With balcony and ocean view",
//             },
//         ])
//         .select();

//     if (error) {
//         console.error("Error inserting room:", error.message);
//         throw new Error(error.message);
//     }

//     console.log("Room added:", data);
//     return data;
// }

export async function addRoom(newRoom) {
    const { data, error } = await supabase.from("rooms").insert([newRoom]).select();

    if (error) {
        console.error("Error inserting room:", error.message);
        throw new Error(error.message);
    }

    console.log("✅ Room added:", data);
    return data;
}
