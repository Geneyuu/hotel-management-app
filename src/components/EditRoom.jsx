import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRoom } from "../services/apiRooms";
import { RoomForm } from "./RoomForm";

const EditRoom = ({ room, isOpen, onClose }) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate: editRoomMutate, isPending } = useMutation({
        mutationFn: (updatedRoom) => updateRoom(room.id, updatedRoom), // so eto basta kahit anong pinasa mo sa editRommMutate is magiging paramerter na may value na para sa mutationFn na tatawagin mo.
        onSuccess: async () => {
            await queryClient.invalidateQueries(["rooms"]);
            toast.success("Room updated successfully!");
            reset();
            onClose();
        },
        onError: (err) => toast.error("Failed: " + err.message),
    });

    const onSubmit = ({ name, price, capacity, discount, description, photo }) => {
        editRoomMutate({
            name,
            price: Number(price),
            Capacity: Number(capacity),
            discount: Number(discount || 0),
            description,
            image: photo ? photo[0] : null,
        });
    };

    useEffect(() => {
        reset({
            name: room.name,
            price: room.price,
            capacity: room.Capacity,
            discount: room.discount || 0,
            description: room.description,
            photo: null,
        });
    }, [room, reset]);

    // If you want fade-out animation, render it anyway but use classes to hide
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center z-50
        bg-black/50 transition-opacity duration-300 ease-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={onClose}
        >
            <div
                className={`relative modal bg-[#18212F] text-white rounded-md p-10 w-[90%] md:w-[100%] max-w-3xl shadow-2xl
          transform transition-all duration-300 ease-out
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4">Edit Room</h2>

                <div
                    onClick={onClose}
                    tabIndex={0}
                    className="absolute top-5 right-5 text-2xl outline-none focus:ring-1 focus:ring-[#4f46e5] rounded-md p-1 cursor-pointer transition-all hover:bg-black/20"
                >
                    <IoIosClose />
                </div>

                {/* RoomForm includes the <form>, inputs, errors, and buttons */}
                <RoomForm
                    register={register}
                    errors={errors}
                    defaultValues={{
                        name: room.name,
                        price: room.price,
                        capacity: room.Capacity,
                        discount: room.discount || 0,
                        description: room.description,
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancel={() => {
                        reset();
                        onClose();
                    }}
                    submitLabel={isPending ? "Updating..." : "Update Room"}
                />
            </div>
        </div>
    );
};

export default EditRoom;
