import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const AddNewRoom = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const handleClickModalOutside = (event) => {
            if (!event.target.closest(".modal")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickModalOutside);

        return () => {
            document.removeEventListener("click", handleClickModalOutside);
        };
    }, []);

    return (
        <>
            {/* Button to open modal */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="text-[10px] md:text-xs font-normal bg-[#4f46e5] w-fit cursor-pointer 
                           px-3 md:py-2 md:px-4 rounded-md 
                           transition-all duration-300 ease-in-out 
                           hover:bg-[#4338ca]"
            >
                Add new Room
            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className={`relative modal bg-[#18212F] text-white rounded-md p-10 w-[90%] md:w-[100%] max-w-3xl shadow-2xl transform transition-all duration-300 ${
                        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()} // prevent modal click from closing
                >
                    <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

                    <form action="" className=" text-xs font-normal flex flex-col gap-3">
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            tabIndex={0}
                            className="absolute top-5 right-5 text-2xl outline-none focus:ring-1 focus:ring-[#4f46e5]  rounded-md p-1 cursor-pointer transition-all hover:bg-black/20"
                        >
                            <IoIosClose />
                        </div>

                        {/* Room Name */}
                        <div className="flex items-center gap-2 py-3 border-b-[1px] border-gray-800">
                            <label htmlFor="room" className="w-1/3">
                                Room Name
                            </label>
                            <input
                                type="text"
                                id="room"
                                className="bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Room Price */}
                        <div className="flex items-center gap-2 py-3 border-b-[1px] border-gray-800">
                            <label htmlFor="price" className="w-1/3">
                                Room Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                min="0"
                                className="bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Room Capacity */}
                        <div className="flex items-center gap-2 py-3 border-b-[1px] border-gray-800">
                            <label htmlFor="capacity" className="w-1/3">
                                Room Capacity
                            </label>
                            <input
                                type="number"
                                id="capacity"
                                min="1"
                                className="bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Room Discount */}
                        <div className="flex items-center gap-2 py-3 border-b-[1px] border-gray-800">
                            <label htmlFor="discount" className="w-1/3">
                                Room Capacity
                            </label>
                            <input
                                type="number"
                                id="discount"
                                className="bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex items-start gap-2">
                            <label htmlFor="description" className="w-1/3 mt-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                className="bg-transparent border w-2/3 md:w-1/2 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                Create Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewRoom;
