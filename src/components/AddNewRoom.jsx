import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { RoomForm } from "./RoomForm";
import { useAddRoom } from "../hooks/useAddRoom";

const AddNewRoom = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { addRoomMutate, isPending } = useAddRoom();

    const onSubmit = ({ name, price, capacity, discount, description, photo }) => {
        addRoomMutate(
            {
                name,
                price: Number(price),
                Capacity: Number(capacity),
                discount: Number(discount || 0),
                description,
                image: photo ? photo[0] : null,
            },
            {
                onSuccess: () => {
                    reset(); // reset form
                    setIsOpen(false); // close modal
                },
            }
        );
    };

    // ESC key to close modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            {/* Trigger Button */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="text-[10px] md:text-xs font-normal bg-[#4f46e5] w-fit cursor-pointer 
          px-3 md:py-2 md:px-4 rounded-md transition-all duration-300 hover:bg-[#4338ca]"
            >
                Add new Room
            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 flex justify-center items-center z-50 bg-black/50 transition-opacity duration-300 ease-out
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => {
                    reset();
                    setIsOpen(false);
                }}
            >
                <div
                    className={`relative modal bg-[#18212F] text-white rounded-md p-10 w-[90%] md:w-[100%] max-w-3xl shadow-2xl
            transform transition-all duration-300 ease-out
            ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

                    {/* Close Button */}
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

                    <RoomForm
                        register={register}
                        errors={errors}
                        isPending={isPending}
                        defaultValues={{
                            name: "",
                            price: "",
                            capacity: "",
                            discount: 0,
                            description: "",
                        }}
                        onSubmit={handleSubmit(onSubmit)}
                        onCancel={() => {
                            reset();
                            setIsOpen(false);
                        }}
                        submitLabel={isPending ? "Creating..." : "Create Room"}
                    />
                </div>
            </div>
        </>
    );
};

export default AddNewRoom;
