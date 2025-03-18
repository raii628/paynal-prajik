import { ChangeEvent, FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface IRoom {
    id: number;
    roomName: string; 
    roomImage: File | string;
    roomAdmission: "Regular" | "VIP";
    roomNumber: string;
    status: "Available" | "Occupied" | "Maintenance";
    roomPrice: number;
    description: string;
    bedSize: string;
    pax: number;
}

interface IRoomFormModalProps {
    isOpen: boolean;
    cancel: () => void;
    onSave: (data: IRoom) => void;
    roomData: IRoom | null;
    loading?: boolean;
}

const EditRoomModal: FC<IRoomFormModalProps> = ({ onSave, roomData, isOpen, cancel, loading = false }) => {
    const [formState, setFormState] = useState<IRoom>({
        id: roomData?.id || 0,
        roomName: roomData?.roomName || "",
        roomImage: roomData?.roomImage || "",
        roomAdmission: roomData?.roomAdmission || "Regular",
        roomNumber: roomData?.roomNumber || "",
        status: roomData?.status || "Available",
        roomPrice: roomData?.roomPrice || 0,
        description: roomData?.description || "",
        bedSize: roomData?.bedSize || "",
        pax: roomData?.pax || 1,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>("");

    useEffect(() => {
        if (formState.roomImage instanceof File) {
            const objectUrl = URL.createObjectURL(formState.roomImage);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof formState.roomImage === "string") {
            setPreviewUrl(formState.roomImage);
        } else {
            setPreviewUrl("");
        }
    }, [formState.roomImage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    // File input change handler
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormState((prev) => ({ ...prev, roomImage: file }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formState);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                cancel();
            }
        }

        if (isOpen) window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [cancel, isOpen]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 flex items-center justify-center z-10 bg-black/45"
                >
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{  y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white w-full max-w-lg mx-4 rounded shadow-lg p-6 relative"
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            {roomData ? "Edit Room" : "Add New Room"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Room Name</label>
                                <input
                                    type="text"
                                    name="roomName"
                                    value={formState.roomName}
                                    onChange={handleChange}
                                    placeholder="Enter Room Name"
                                    className="border border-gray-300 rounded w-full p-2"
                                />
                            </div>

                            {/* Grid layout for primary fields */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Room Admission */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Room Admission</label>
                                    <select
                                        name="roomAdmission"
                                        value={formState.roomAdmission}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    >
                                        <option value="Regular">Regular</option>
                                        <option value="VIP">VIP</option>
                                    </select>
                                </div>

                                {/* Room Number (Disabled if auto-gen on backend) */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Room Number</label>
                                    <input
                                        type="text"
                                        name="roomNumber"
                                        value={formState.roomNumber}
                                        onChange={handleChange}
                                        placeholder="Auto-generated or custom"
                                        className="border border-gray-300 rounded w-full p-2"
                                        disabled
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formState.status}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Occupied">Occupied</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>

                                {/* Room Price */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Room Price (₱)</label>
                                    <input
                                        type="number"
                                        name="roomPrice"
                                        value={formState.roomPrice}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>

                                {/* Bed Size */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Bed Size</label>
                                    <input
                                        type="text"
                                        name="bedSize"
                                        value={formState.bedSize}
                                        onChange={handleChange}
                                        placeholder="e.g. Double Bed"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>

                                {/* Pax */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pax</label>
                                    <input
                                        type="number"
                                        name="pax"
                                        value={formState.pax}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                            </div>

                            {/* Description (Full width) */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="border border-gray-300 rounded w-full p-2 resize-none"
                                />
                            </div>

                            {/* Room Image (Full width with preview) */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Room Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mb-2"
                                />
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-48 object-cover border border-gray-200 mt-2"
                                    />
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={cancel}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                                >
                                    {roomData ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditRoomModal;