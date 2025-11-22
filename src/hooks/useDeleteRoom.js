import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRoom } from "../services/apiRooms";

export const useDeleteRoom = () => {
    const queryClient = useQueryClient();

    const { mutate: removeRoom } = useMutation({
        mutationFn: ({ id, imagePath }) => deleteRoom(id, imagePath),
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"]);
            toast.success("Room deleted successfully!");
        },
        onError: (err) => {
            toast.error(`Error deleting room: ${err.message}`);
        },
    });

    return removeRoom;
};
