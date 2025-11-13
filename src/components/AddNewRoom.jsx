import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { addRoom } from "../services/apiRooms";
import { useQueryClient } from "@tanstack/react-query";

const AddNewRoom = () => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    //  Handle form submit
    async function onSubmit(formData) {
        try {
            await addRoom({
                name: formData.name,
                price: Number(formData.price),
                Capacity: Number(formData.capacity),
                discount: Number(formData.discount || 0),
                description: formData.description,
            });

            //  Refresh room list
            await queryClient.invalidateQueries(["rooms"]);

            alert("Room added successfully!");
            reset(); // Clear fields
            setIsOpen(false); // Close modal
        } catch (err) {
            alert("Failed to add room: " + err.message);
        }
    }

    // Close when clicking outside the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".modal")) {
                reset(); // clear form + errors
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [reset]);

    return (
        <>
            {/* Open Modal Button */}
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

            {/* Modal Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-300 z-50 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Modal Content */}
                <div
                    className={`relative modal bg-[#18212F] text-white rounded-md p-10 w-[90%] md:w-[100%] max-w-3xl shadow-2xl transform transition-all duration-300 ${
                        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Title */}
                    <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

                    {/* Close Icon */}
                    <div
                        onClick={() => {
                            reset();
                            setIsOpen(false);
                        }}
                        tabIndex={0}
                        className="absolute top-5 right-5 text-2xl outline-none focus:ring-1 focus:ring-[#4f46e5] rounded-md p-1 cursor-pointer transition-all hover:bg-black/20"
                    >
                        <IoIosClose />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="text-xs font-normal flex flex-col gap-3"
                    >
                        {/* Room Name */}
                        <div className="flex flex-col gap-1 border-b border-gray-800 py-3">
                            <div className="flex items-center gap-2">
                                <label htmlFor="name" className="w-1/3">
                                    Room Name
                                </label>
                                <input
                                    {...register("name", { required: "Room name is required" })}
                                    type="text"
                                    id="name"
                                    className={`bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none ${
                                        errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-400 ml-[34.5%] text-[11px]">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Room Price */}
                        <div className="flex flex-col gap-1 border-b border-gray-800 py-3">
                            <div className="flex items-center gap-2">
                                <label htmlFor="price" className="w-1/3">
                                    Room Price
                                </label>
                                <input
                                    {...register("price", {
                                        required: "Price is required",
                                        min: { value: 1, message: "Price must be greater than 0" },
                                    })}
                                    type="number"
                                    id="price"
                                    min="0"
                                    className={`bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none ${
                                        errors.price
                                            ? "border-red-500 focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                />
                            </div>
                            {errors.price && (
                                <p className="text-red-400 ml-[34.5%] text-[11px]">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        {/* Room Capacity */}
                        <div className="flex flex-col gap-1 border-b border-gray-800 py-3">
                            <div className="flex items-center gap-2">
                                <label htmlFor="capacity" className="w-1/3">
                                    Room Capacity
                                </label>
                                <input
                                    {...register("capacity", {
                                        required: "Capacity is required",
                                        min: { value: 1, message: "Must be at least 1 person" },
                                    })}
                                    type="number"
                                    id="capacity"
                                    className={`bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none ${
                                        errors.capacity
                                            ? "border-red-500 focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                />
                            </div>
                            {errors.capacity && (
                                <p className="text-red-400 ml-[34.5%] text-[11px]">
                                    {errors.capacity.message}
                                </p>
                            )}
                        </div>

                        {/* Discount */}
                        <div className="flex flex-col gap-1 border-b border-gray-800 py-3">
                            <div className="flex items-center gap-2">
                                <label htmlFor="discount" className="w-1/3">
                                    Discount (%)
                                </label>
                                <input
                                    {...register("discount", {
                                        min: { value: 0, message: "Cannot be negative" },
                                        max: { value: 100, message: "Cannot exceed 100%" },
                                    })}
                                    type="number"
                                    id="discount"
                                    className={`bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none ${
                                        errors.discount
                                            ? "border-red-500 focus:ring-red-500"
                                            : "focus:ring-indigo-500"
                                    }`}
                                />
                            </div>
                            {errors.discount && (
                                <p className="text-red-400 ml-[33%] text-[11px]">
                                    {errors.discount.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-start gap-2">
                                <label htmlFor="description" className="w-1/3 mt-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    id="description"
                                    rows={3}
                                    className="bg-transparent border w-[65%] md:w-1/2 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
                                />
                            </div>
                        </div>

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
                                disabled={isSubmitting}
                                className={`px-4 py-2 rounded transition-colors ${
                                    isSubmitting
                                        ? "bg-indigo-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                            >
                                {isSubmitting ? "Creating..." : "Create Room"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewRoom;
