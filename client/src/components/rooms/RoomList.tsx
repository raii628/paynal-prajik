/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "../../services/Room";
import RoomCard from "./RoomCard";

interface Room {
  id: number;
  room_name: string;
  room_image: string;
  room_type: string;
  room_number: string;
  admission: string;
  description: string;
  bed_size: string;
  pax: number;
  room_price: number;
}

interface RoomsResponse {
  data: Room[];
}

const RoomList: FC = () => {
  const { data, isLoading, isError } = useQuery<RoomsResponse>({
    queryKey: ['rooms'],
    queryFn: fetchAllRooms,
    retry: 2
  });

  if (isLoading) return <div className="p-6">Loading rooms...</div>;

  if (isError) return <div className="p-6 text-red-500">Error fetching rooms!</div>;

  if (!data?.data) return <div className="p-6">No rooms available</div>;

  const rooms = data.data.map((room: any) => {
    return {
      id: room.id,
      name: room.room_name,
      image: room.room_image,
      title: `${room.room_type} ( ${room.room_number} )`,
      description: room.description,
      admission: room.admission,
      bedType: room.bed_size,
      capacity: room.pax,
      price: Number(room.room_price),
    };
  });

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 p-6"
    >
      {rooms.map((room, index) => (
        <div key={index}>
          <RoomCard {...room} />
        </div>
      ))}
    </div>
  );
};

export default RoomList;