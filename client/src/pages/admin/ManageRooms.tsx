/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import EditRoomModal, { IRoom } from "../../components/admin/EditRoomModal";
import Modal from "../../components/Modal";
import DashboardSkeleton from "../../motions/skeletons/AdminDashboardSkeleton";
import ManageRoomLoader from "../../motions/skeletons/ManageRoomLoader";
import { addNewRoom, deleteRoom, editRoom, fetchRooms } from "../../services/Admin";
import Error from "../_ErrorBoundary";

interface AddRoomResponse {
  data: any;
}

const ManageRooms: FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editRoomData, setEditRoomData] = useState<IRoom | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderText, setLoaderText] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: roomsData, isLoading, isError } = useQuery<{ data: any[] }>({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  const addRoomMutation = useMutation<AddRoomResponse, unknown, FormData>({
    mutationFn: addNewRoom,
    onMutate: () => {
      setLoading(true);
      setLoaderText("Adding room...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setShowFormModal(false);
    },
    onSettled: () => {
      setLoading(false);
      setLoaderText("");
    },
  });

  const editRoomMutation = useMutation<AddRoomResponse, unknown, { roomId: number; formData: FormData }>({
    mutationFn: ({ roomId, formData }) => editRoom(roomId, formData),
    onMutate: () => {
      setLoading(true);
      setLoaderText("Updating room...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setShowFormModal(false);
    },
    onSettled: () => {
      setLoading(false);
      setLoaderText("");
    },
  });

  const deleteRoomMutation = useMutation<any, unknown, number>({
    mutationFn: deleteRoom,
    onMutate: () => {
      setLoading(true);
      setLoaderText("Deleting room...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setShowModal(false);
    },
    onSettled: () => {
      setLoading(false);
      setLoaderText("");
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
      roomType: room.room_type,
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
    setDeleteRoomId(roomId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteRoomId != null) {
      deleteRoomMutation.mutate(deleteRoomId);
    }
  };

  const cancelDelete = () => {
    setDeleteRoomId(null);
    setShowModal(false);
  };

  const handleSave = async (roomData: IRoom): Promise<void> => {
    const formData = new FormData();
    formData.append("room_name", roomData.roomName);
    formData.append("admission", roomData.roomAdmission === "VIP" ? "vip" : "regular");
    formData.append("room_type", roomData.roomType);
    formData.append("status", roomData.status.toLowerCase() || "available");
    formData.append("room_price", String(roomData.roomPrice || 0));
    formData.append("description", roomData.description || "");
    formData.append("bed_size", String(roomData.bedSize || ""));
    formData.append("room_number", roomData.roomNumber || "");
    formData.append("pax", String(roomData.pax || 1));
    if (roomData.roomImage instanceof File) formData.append("room_image", roomData.roomImage);

    if (!roomData.id) {
      await addRoomMutation.mutateAsync(formData);
    } else {
      await editRoomMutation.mutateAsync({ roomId: roomData.id, formData });
    }
  };

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <Error />;

  const rooms = roomsData?.data || [];

  return (
    <div className="overflow-y-auto h-[calc(100vh-25px)]">
      <div className="p-3 container mx-auto">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-[500]">
            <ManageRoomLoader size="80px" color="white" text={loaderText} />
          </div>
        )}

        <div className="flex flex-row md:flex-row items-center mb-5 justify-between">
          <h1 className="text-3xl font-semibold">Manage Rooms</h1>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add New Room
          </button>
        </div>

        {/* Room Cards (Responsive Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room: any) => {
            let statusColor;
            switch (room.status) {
              case "maintenance":
                statusColor = "bg-yellow-500";
                break;
              case "occupied":
                statusColor = "bg-red-500";
                break;
              default:
                statusColor = "bg-green-500";
            }

            let admissionColor;
            switch (room.admission) {
              case "vip":
                admissionColor = "bg-violet-500";
                break;
              default:
                admissionColor = "bg-blue-500";
            }

            return (
              <div
                key={room.id}
                className="bg-white shadow-md rounded-md overflow-hidden flex flex-col"
              >
                <img
                  src={room.room_image}
                  alt="Room"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="font-bold text-2xl mb-1">{room.room_name}</h1>
                      <h2 className="text-lg font-semibold mb-1">
                        {room.bed_size} - {room.room_number}
                      </h2>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center">
                        <span
                          className={`${statusColor} text-white px-2 py-1 rounded-full text-sm font-bold`}
                        >
                          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`${admissionColor} text-white px-2 py-1 rounded-full text-sm font-bold`}
                        >
                          {room.admission === "vip" ? "VIP" : "Regular"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Price: ₱ {room.room_price?.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    Pax: <span className="font-medium">{room.pax}</span>
                  </p>
                  <p className="text-gray-500 text-sm flex-grow overflow-hidden">
                    {room.description}
                  </p>
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
            );
          })}
        </div>

        {showFormModal && (
          <EditRoomModal
            isOpen={showFormModal}
            cancel={() => setShowFormModal(false)}
            onSave={handleSave}
            roomData={editRoomData}
          />
        )}

        <Modal
          isOpen={showModal}
          icon="fas fa-trash"
          title="Delete Room"
          description="Are you sure you want to delete this room?"
          cancel={cancelDelete}
          onConfirm={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md uppercase font-bold hover:bg-red-700 transition-all duration-300"
          cancelText="No"
          confirmText={"Delete Room"}
        />

      </div>
    </div>
  );
};

export default ManageRooms;
