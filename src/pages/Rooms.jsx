import { deleteRoom, getAllRooms } from "../services/apiRooms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { HiOutlineDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AddNewRoom from "../components/AddNewRoom";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
            <div className="bg-gray-800 border border-gray-700 p-5 sm:p-6 md:p-8 rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-lg text-white shadow-2xl animate-fadeIn">
                <p className="text-sm sm:text-base md:text-base text-center mb-6">{message}</p>
                <div className="flex justify-center gap-2 sm:gap-4 mt-4">
                    <button
                        onClick={onConfirm}
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 rounded text-xs sm:text-sm md:text-xs hover:bg-red-700 transition"
                    >
                        Delete
                    </button>

                    <button
                        onClick={onCancel}
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-600 rounded text-xs sm:text-sm md:text-xs hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const Rooms = () => {
    const queryClient = useQueryClient();

    const {
        isLoading,
        data: rooms = [],
        error,
    } = useQuery({
        queryKey: ["rooms"],
        queryFn: getAllRooms,
    });

    // Delete Mutate
    const { mutate: removeRoom } = useMutation({
        mutationFn: ({ id, imagePath }) => deleteRoom(id, imagePath),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            toast.success("Room deleted successfully!");
        },
        onError: (error) => {
            toast.error(`Error deleting room: ${error.message}`);
        },
    });

    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Modal States
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const openConfirm = (room) => {
        setSelectedRoom(room);
        setIsConfirmOpen(true);
    };

    const closeConfirm = () => {
        setSelectedRoom(null);
        setIsConfirmOpen(false);
    };

    const confirmDelete = () => {
        if (!selectedRoom) return;
        removeRoom({ id: selectedRoom.id, imagePath: selectedRoom.image });
        closeConfirm();
    };

    // Auto-close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest(".dropdown-button") &&
                !event.target.closest(".dropdown-menu")
            ) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    if (isLoading) return <Spinner />;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="flex flex-col gap-5 max-h-[50vh]">
            <h1 className="text-lg md:text-2xl font-semibold text-white">All Rooms</h1>

            {/* TABLE */}
            <div className="border border-gray-700 rounded-lg">
                <table className="w-full text-[10px] sm:text-xs md:text-sm p-5 table-auto border-collapse">
                    <thead className="text-white bg-gray-800">
                        <tr className="text-center uppercase">
                            <th className="p-2 sm:p-3 font-medium">Rooms</th>
                            <th className="p-2 sm:p-3 font-medium">Price</th>
                            <th className="p-2 sm:p-3 font-medium">Capacity</th>
                            <th className="p-2 sm:p-3 font-medium">Discounts</th>
                            <th className="p-2 sm:p-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.map((room) => {
                            const { id, name, image, price, Capacity, discount } = room;

                            return (
                                <tr key={id} className="bg-[#18212F] font-light">
                                    <td className="border-t border-gray-700">
                                        <div className="flex items-center lg:w-[70%]">
                                            <img
                                                src={image || "https://placehold.co/100"}
                                                className="w-16 md:w-24 object-cover rounded-r-sm"
                                            />
                                            <span className="text-white text-[11px] sm:text-sm mx-auto">
                                                {name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="border-t border-gray-700 text-center text-white">
                                        ${price}
                                    </td>

                                    <td className="border-t border-gray-700 text-center text-white">
                                        Fits up to {Capacity}
                                    </td>

                                    <td className="border-t border-gray-700 text-center text-white">
                                        {discount ? `${discount}%` : "—"}
                                    </td>

                                    <td className="border-t border-gray-700 text-center text-white relative">
                                        <span
                                            className="dropdown-button cursor-pointer inline-block p-1 rounded hover:bg-[#18212F]"
                                            onClick={() => toggleMenu(id)}
                                        >
                                            <HiOutlineDotsVertical className="text-lg" />
                                        </span>

                                        {/* Dropdown */}
                                        <div
                                            className={`dropdown-menu absolute z-50 right-2 md:-left-16 lg:-left-4 mt-2 w-32 bg-gray-800 rounded shadow-2xl transition-all duration-200 ${
                                                openMenuId === id
                                                    ? "scale-100 opacity-100"
                                                    : "scale-95 opacity-0 pointer-events-none"
                                            }`}
                                        >
                                            <ul className="flex flex-col">
                                                <li
                                                    className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-[#18212F]"
                                                    onClick={() => alert(`Duplicate room ${name}`)}
                                                >
                                                    <IoCopyOutline className="w-4 h-4" /> Duplicate
                                                </li>

                                                <li
                                                    className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-[#18212F]"
                                                    onClick={() => alert(`Edit room ${name}`)}
                                                >
                                                    <HiPencil className="w-4 h-4" /> Edit
                                                </li>

                                                <li
                                                    className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-[#18212F]"
                                                    onClick={() => openConfirm(room)}
                                                >
                                                    <HiTrash className="w-4 h-4" /> Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <AddNewRoom />

            {/* CONFIRM MODAL */}
            {isConfirmOpen && (
                <ConfirmModal
                    message={`Do you want to delete Room "${selectedRoom?.name}"?`}
                    onConfirm={confirmDelete}
                    onCancel={closeConfirm}
                />
            )}
        </div>
    );
};

export default Rooms;
