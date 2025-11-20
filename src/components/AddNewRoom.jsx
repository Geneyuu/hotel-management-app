import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { addRoom } from "../services/apiRooms";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const formRowBase = "flex flex-col gap-1 border-b border-gray-800 py-3";
const inputBase =
    "bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1";
const errorBase = "text-red-400 ml-[34.5%] text-[11px]";

const AddNewRoom = () => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate: addRoomMutate, isPending } = useMutation({
        mutationFn: addRoom,
        onSuccess: async () => {
            await queryClient.invalidateQueries(["rooms"]);
            toast.success("Room added successfully!");
            reset();
            setIsOpen(false);
        },
        onError: (err) => toast.error("Failed: " + err.message),
    });

    const onSubmit = ({ name, price, capacity, discount, description, photo }) => {
        console.log("PHOTO FILE:", photo[0]);

        addRoomMutate({
            name,
            price: Number(price),
            Capacity: Number(capacity),
            discount: Number(discount || 0),
            description,
            image: photo[0],
        });
    };

    useEffect(() => {
        const close = (e) => {
            if (!e.target.closest(".modal")) {
                reset();
                setIsOpen(false);
            }
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [reset]);

    const FormRow = ({ label, id, children, error }) => (
        <div className={formRowBase}>
            <div className="flex items-center gap-2">
                <label htmlFor={id} className="w-1/3">
                    {label}
                </label>
                {children}
            </div>
            {error && <p className={errorBase}>{error.message}</p>}
        </div>
    );

    return (
        <>
            {/* Trigger Button */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="text-[10px] md:text-xs font-normal bg-[#4f46e5] w-fit cursor-pointer 
                    px-3 md:py-2 md:px-4 rounded-md transition-all duration-300 
                    hover:bg-[#4338ca]"
            >
                Add new Room
            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-300 z-50 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className={`relative modal bg-[#18212F] text-white rounded-md p-10 w-[90%] md:w-[100%] max-w-3xl shadow-2xl transform transition-all duration-300 ${
                        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

                    <div
                        onClick={() => {
                            reset();
                            setIsOpen(false);
                        }}
                        tabIndex={0}
                        className="absolute top-5 right-5 text-2xl outline-none focus:ring-1 
                        focus:ring-[#4f46e5] rounded-md p-1 cursor-pointer transition-all hover:bg-black/20"
                    >
                        <IoIosClose />
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="text-xs font-normal flex flex-col gap-3"
                    >
                        {/* Room Name */}
                        <FormRow label="Room Name" id="name" error={errors.name}>
                            <input
                                {...register("name", { required: "Room name is required" })}
                                type="text"
                                id="name"
                                className={`${inputBase} ${
                                    errors.name
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-indigo-500"
                                }`}
                            />
                        </FormRow>

                        {/* Price */}
                        <FormRow label="Room Price" id="price" error={errors.price}>
                            <input
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 1, message: "Price must be > 0" },
                                })}
                                type="number"
                                id="price"
                                className={`${inputBase} ${
                                    errors.price
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-indigo-500"
                                }`}
                            />
                        </FormRow>

                        {/* Capacity */}
                        <FormRow label="Room Capacity" id="capacity" error={errors.capacity}>
                            <input
                                {...register("capacity", {
                                    required: "Capacity is required",
                                    min: { value: 1, message: "Must be at least 1 person" },
                                })}
                                type="number"
                                id="capacity"
                                className={`${inputBase} ${
                                    errors.capacity
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-indigo-500"
                                }`}
                            />
                        </FormRow>

                        {/* Discount */}
                        <FormRow label="Discount (%)" id="discount" error={errors.discount}>
                            <input
                                {...register("discount", {
                                    min: { value: 0, message: "Cannot be negative" },
                                    max: { value: 100, message: "Cannot exceed 100%" },
                                })}
                                type="number"
                                defaultValue={0}
                                id="discount"
                                className={`${inputBase} ${
                                    errors.discount
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-indigo-500"
                                }`}
                            />
                        </FormRow>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-start gap-2">
                                <label htmlFor="description" className="w-1/3 mt-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    id="description"
                                    rows={5}
                                    className="bg-transparent border w-[65%] md:w-1/2 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <FormRow label="Room Photo" id="photo" error={errors.photo}>
                            <input
                                {...register("photo", {
                                    required: "Room photo is required",
                                })}
                                type="file"
                                accept="image/*"
                                id="photo"
                                className={`${inputBase} ${
                                    errors.photo
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-indigo-500"
                                }`}
                            />
                        </FormRow>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isPending}
                                className={`px-4 py-2 rounded transition-colors ${
                                    isPending
                                        ? "bg-indigo-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                            >
                                {isPending ? "Creating..." : "Create Room"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewRoom;
