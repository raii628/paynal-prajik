/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewRoom, deleteRoom, fetchRooms, editRoom } from "../../services/Admin";
import EditRoomModal, { IRoom } from "../../components/admin/EditRoomModal";
import Modal from "../../components/Modal";
import DashboardSkeleton from "../../motions/skeletons/AdminDashboardSkeleton";
import Error from "../_ErrorBoundary";

interface AddRoomResponse {
  data: any;
}

const ManageRooms: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editRoomData, setEditRoomData] = useState<IRoom | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: roomsData, isLoading, isError } = useQuery<{ data: any[] }>({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  const addRoomMutation = useMutation<AddRoomResponse, unknown, FormData>({
    mutationFn: addNewRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setShowFormModal(false);
    },
  });

  const editRoomMutation = useMutation<AddRoomResponse, unknown, { roomId: number; formData: FormData }>({
    mutationFn: ({ roomId, formData }) => editRoom(roomId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setShowFormModal(false);
    },
  });

  const deleteRoomMutation = useMutation<any, unknown, number>({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setShowModal(false);
    },
  });

  const handleAddNew = () => {
    setEditRoomData(null);
    setShowFormModal(true);
  };

  const handleEdit = (room: any) => {
    setEditRoomData({
      id: room.id,
      roomName: room.room_name,
      roomImage: typeof room.room_image === "string" ? room.room_image : room.room_price,
      roomAdmission: room.admission === "vip" ? "VIP" : "Regular",
      roomNumber: room.room_number,
      status:
        room.status === "maintenance"
          ? "Maintenance"
          : room.status === "occupied"
            ? "Occupied"
            : "Available",
      roomPrice: room.room_price,
      description: room.description,
      bedSize: room.bed_size,
      pax: room.pax,
    });
    setShowFormModal(true);
  };

  const handleDelete = (roomId: number) => {
    setLoading(false);
    setDeleteRoomId(roomId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteRoomId != null) deleteRoomMutation.mutate(deleteRoomId);
    setLoading(false);
  };

  const cancelDelete = () => {
    setDeleteRoomId(null);
    setShowModal(false);
  };

  const handleSave = (roomData: IRoom) => {
    const formData = new FormData();
    formData.append("room_name", roomData.roomName);
    formData.append("admission", roomData.roomAdmission === "VIP" ? "vip" : "regular");
    formData.append("room_type", "Deluxe");
    formData.append("status", roomData.status.toLowerCase() || "available");
    formData.append("room_price", String(roomData.roomPrice || 0));
    formData.append("description", roomData.description || "");
    formData.append("bed_size", roomData.bedSize || "");
    formData.append("pax", String(roomData.pax || 1));
    if (roomData.roomImage instanceof File) formData.append("room_image", roomData.roomImage);

    if (!roomData.id) {
      addRoomMutation.mutate(formData);
    } else {
      editRoomMutation.mutate({ roomId: roomData.id, formData });
    }
  };

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <Error />;

  const rooms = roomsData?.data || [];

  return (
    <div className="max-h-[calc(100vh-25px)] overflow-y-auto p-3">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Rooms</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add New Room
        </button>
      </div>

      {/* Room Cards (Responsive Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room: any) => (
          <div
            key={room.id}
            className="bg-white shadow-md rounded overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
              src={room.room_image}
              alt="Room"
              className="w-full h-36 object-cover"
            />

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h1 className="font-bold text-2xl mb-1">{room.room_name}</h1>
              <h2 className="text-lg font-semibold mb-1">
                {room.bed_size} - {room.room_number}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Admission:{" "}
                <span className="font-medium">
                  {room.admission === "vip" ? "VIP" : "Regular"}
                </span>
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Status: <span className="font-medium">{room.status}</span>
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Price: ₱ {room.room_price?.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Pax: <span className="font-medium">{room.pax}</span>
              </p>
              <p className="text-gray-500 text-sm flex-grow overflow-hidden">
                {room.description}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showFormModal && (
        <EditRoomModal
          onClose={() => setShowFormModal(false)}
          onSave={handleSave}
          roomData={editRoomData}
        />
      )}

      <Modal
        isOpen={showModal}
        title="Delete Room?"
        description="Are you sure you want to delete this room?"
        cancel={cancelDelete}
        onConfirm={confirmDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md uppercase font-bold hover:bg-red-700 transition-all duration-300"
        cancelText="No"
        confirmText={loading ? "Deleting..." : "Yes, Delete"}
      />
    </div>
  );
};

export default ManageRooms;
