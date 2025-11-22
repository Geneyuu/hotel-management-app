import React from "react";

const formRowBase = "flex flex-col gap-1 border-b border-gray-800 py-3";
const inputBase =
    "bg-transparent border min-w-[35%] md:w-1/4 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1";
const errorBase = "text-red-400 ml-[34.5%] text-[11px]";

// Memoize FormRow to prevent re-render losing focus
const FormRow = React.memo(({ label, id, children, error }) => (
    <div className={formRowBase}>
        <div className="flex items-center gap-2">
            <label htmlFor={id} className="w-1/3">
                {label}
            </label>
            {children}
        </div>
        {error && <p className={errorBase}>{error.message}</p>}
    </div>
));

export const RoomForm = ({
    register,
    errors,
    defaultValues,
    onSubmit,
    onCancel,
    submitLabel,
    isPending,
}) => {
    return (
        <form onSubmit={onSubmit} className="text-xs font-normal flex flex-col gap-3">
            <FormRow label="Room Name" id="name" error={errors.name}>
                <input
                    {...register("name", { required: "Room name is required" })}
                    type="text"
                    defaultValue={defaultValues?.name || ""}
                    className={`${inputBase} ${
                        errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                />
            </FormRow>

            <FormRow label="Room Price" id="price" error={errors.price}>
                <input
                    {...register("price", {
                        required: "Price is required",
                        min: { value: 1, message: "Price must be > 0" },
                    })}
                    type="number"
                    defaultValue={defaultValues?.price || ""}
                    className={`${inputBase} ${
                        errors.price ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                />
            </FormRow>

            <FormRow label="Room Capacity" id="capacity" error={errors.capacity}>
                <input
                    {...register("capacity", {
                        required: "Capacity is required",
                        min: { value: 1, message: "Must be at least 1 person" },
                    })}
                    type="number"
                    defaultValue={defaultValues?.capacity || ""}
                    className={`${inputBase} ${
                        errors.capacity
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-indigo-500"
                    }`}
                />
            </FormRow>

            <FormRow label="Discount (%)" id="discount" error={errors.discount}>
                <input
                    {...register("discount", {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Cannot exceed 100%" },
                    })}
                    type="number"
                    defaultValue={defaultValues?.discount ?? 0}
                    className={`${inputBase} ${
                        errors.discount
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-indigo-500"
                    }`}
                />
            </FormRow>

            <FormRow label="Description" id="description" error={errors.description}>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    rows={5}
                    defaultValue={defaultValues?.description || ""}
                    className={`bg-transparent border w-[65%] md:w-1/2 border-gray-500 rounded px-2 py-1.5 focus:outline-none focus:ring-1 ${
                        errors.description
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-indigo-500"
                    }`}
                />
            </FormRow>

            <FormRow label="Room Photo" id="photo" error={errors.photo}>
                <input
                    {...register("photo")}
                    type="file"
                    accept="image/*"
                    className={`${inputBase} ${
                        errors.photo ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
                    }`}
                />
            </FormRow>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className={`px-4 py-2 rounded transition-colors bg-indigo-600 hover:bg-indigo-700
        ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};
