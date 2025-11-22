import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addRoom } from "../services/apiRooms";

export const useAddRoom = () => {
    const queryClient = useQueryClient();

    const { mutate: addRoomMutate, isPending } = useMutation({
        mutationFn: (newRoom) => addRoom(newRoom),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["rooms"]);
            toast.success("Room added successfully!");
        },
        onError: (err) => toast.error("Failed: " + err.message),
    });

    return { addRoomMutate, isPending };
};
