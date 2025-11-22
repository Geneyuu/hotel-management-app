export const useAddRoom =    const { mutate: addRoomMutate, isPending } = useMutation({
        mutationFn: (newRoom) => addRoom(newRoom),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["rooms"]);
            toast.success("Room added successfully!");
            reset();
            setIsOpen(false);
        },
        onError: (err) => toast.error("Failed: " + err.message),
    });