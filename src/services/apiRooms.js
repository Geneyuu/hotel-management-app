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

export async function addRoom(newRoom) {
    let imagePath = null;

    if (newRoom.image) {
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
        let imagePath = `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`;
    }
    // tas dito isisnama lang yung image para ilagay yung imagepath to make it accesible sa <img src />
    const { data, error } = await supabase
        .from("rooms")
        .insert([
            {
                ...newRoom,
                image: imagePath, // null if no image
            },
        ])
        .select();

    if (error) {
        console.error("Error inserting room:", error.message);
        throw new Error(error.message);
    }

    console.log("Room added:", data);
    return data;
}

export async function updateRoom(id, updatedRoom) {
    try {
        let imagePath = updatedRoom.image;
        console.log(imagePath);

        if (updatedRoom.image) {
            const imageName = `${Math.random()}-${updatedRoom.image.name}`.replaceAll("/", "");
            const { error: uploadError } = await supabase.storage
                .from("rooms-images")
                .upload(imageName, updatedRoom.image);

            if (uploadError) throw new Error(uploadError.message);

            imagePath = `${supabaseUrl}/storage/v1/object/public/rooms-images/${imageName}`;
        }

        // Update Supabase row
        const { data, error } = await supabase
            .from("rooms")
            .update({
                name: updatedRoom.name,
                price: updatedRoom.price,
                Capacity: updatedRoom.Capacity,
                discount: updatedRoom.discount || 0,
                description: updatedRoom.description,
                image: imagePath, // since undefined yung mapapasa dito kapag walang nilagay na bagong image eh ang default ng supabase ay iignore nya lang yung undefined at di nya gagalawin yung previous file na meron tong image
            })
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);

        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}
