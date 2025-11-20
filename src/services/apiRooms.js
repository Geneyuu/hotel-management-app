import supabase, { supabaseUrl } from "./supabase";

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
// export async function deleteRoom(id) {
//     try {
//         const { data, error } = await supabase.from("rooms").delete().eq("id", id).select();

//         if (error) {
//             throw new Error("Failed to delete room");
//         }

//         return data;
//     } catch (error) {
//         console.error(error.message);
//         throw error;
//     }
// }

export async function deleteRoom(id, imagePath) {
    try {
        //  Delete the file from Supabase Storage if imagePath exists
        if (imagePath) {
            // Extract filename from public URL
            const fileName = imagePath.split("/").pop();
            console.log(`this is fileName`, fileName);

            const { data: storageData, error: storageError } = await supabase.storage
                .from("rooms-images")
                .remove([fileName]);

            if (storageError) {
                console.error("Failed to delete file from storage:", storageError.message);
            } else {
                console.log("File deleted from storage:", storageData);
            }
        }

        //  Delete the room row from database
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

// export async function addRoom(newRoom) {
//     const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

//     const imagePath = `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`;

//     const { data, error } = await supabase.from("rooms").insert([newRoom]).select();

//     if (error) {
//         console.error("Error inserting room:", error.message);
//         throw new Error(error.message);
//     }

//     console.log("✅ Room added:", data);
//     return data;
// }

export async function addRoom(newRoom) {
    // eto to avoid para alisin yung "/" incase na may ganyan sa fileName kasi masisira yung path pag may ganyan
    const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll("/", "");

    console.log(imageName);
    console.log(`this is newRoom.image.name`, newRoom.image.name);

    // eto is for uploading the image and the imageName ng file sa storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("rooms-images")
        .upload(imageName, newRoom.image);

    if (uploadError) {
        console.error("Upload error:", uploadError.message);
        throw new Error(uploadError.message);
    }

    // eto ay for the imagePath link lang para maaacess sa <img src /> syenpre yung link image this is not storage file
    const imagePath = `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`;

    //tas dito isisnama lang yung image para ilagay yung imagepath to make it accesible sa <img src />
    const { data, error } = await supabase
        .from("rooms")
        .insert([
            {
                ...newRoom,
                image: imagePath,
            },
        ])
        .select();

    if (error) {
        console.error("Error inserting room:", error.message);
        throw new Error(error.message);
    }

    console.log(" Room added:", data);
    return data;
}
