/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchAllRooms } from "../../services/Room";
import RoomCard from "./RoomCard";

gsap.registerPlugin(ScrollTrigger);

interface Room {
  id: number;
  room_image: string;
  room_type: string;
  room_number: string;
  description: string;
  bed_size: string;
  pax: number;
  room_price: number;
}

interface RoomsResponse {
  data: Room[];
}

const RoomList: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const { data, isLoading, isError } = useQuery<RoomsResponse>({
    queryKey: ['rooms'],
    queryFn: fetchAllRooms,
    retry: 2
  });

  useEffect(() => {
    if (!isLoading && data?.data) {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [isLoading, data]);

  if (isLoading) return <div className="p-6">Loading rooms...</div>;

  if (isError) return <div className="p-6 text-red-500">Error fetching rooms!</div>;

  if (!data?.data) {
    return <div className="p-6">No rooms available</div>;
  }

  const rooms = data.data.map((room: any) => {
    return {
      image: room.room_image,
      title: `${room.room_type} ( ${room.room_number} )`,
      description: room.description,
      bedType: room.bed_size,
      capacity: room.pax,
      price: Number(room.room_price),
    };
  });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 p-6"
    >
      {rooms.map((room, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
          }}
        >
          <RoomCard {...room} />
        </div>
      ))}
    </div>
  );
};

export default RoomList;