import { useState } from "react";
import RoomAvailable from "./RoomAvailable";
import BookingModal from "../RoomModal";
import deluxe_single from "../../assets/deluxe_single.webp";
import deluxe_double from "../../assets/deluxe_double.jpg";
import deluxe_twin from "../../assets/deluxe_twin.jpg";
import executive_king from "../../assets/executive_king.webp";
import executive_double from "../../assets/executive_double.avif";
import president_king from "../../assets/president_king.jpg";

const RoomAvailableList = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rooms = [
    {
      image: deluxe_single,
      title: "Deluxe Room (Single Bed)",
      capacity: 1,
      bedType: "1 single bed",
      availableRooms: 10,
      price: 4000,
    },
    {
      image: deluxe_double,
      title: "Deluxe Room (Double Bed)",
      capacity: 2,
      bedType: "1 double bed",
      availableRooms: 7,
      price: 5000,
    },
    {
      image: deluxe_twin,
      title: "Deluxe Room (Twin Bed)",
      capacity: 2,
      bedType: "2 single beds",
      availableRooms: 3,
      price: 5500,
    },
    {
      image: executive_king,
      title: "Executive Suite (King Bed)",
      capacity: 2,
      bedType: "1 king bed",
      availableRooms: 7,
      price: 12000,
    },
    {
      image: executive_double,
      title: "Executive Suite (Double King Bed)",
      capacity: 2,
      bedType: "1 double king bed",
      availableRooms: 3,
      price: 11000,
    },
    {
      image: president_king,
      title: "Presidential Suite (King Bed)",
      capacity: 2,
      bedType: "1 king bed",
      availableRooms: 5,
      price: 20000,
    },
  ];

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="relative">
      {/* Rooms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
        {rooms.map((room, index) => (
          <RoomAvailable
            key={index}
            {...room}
            onBookNow={() => handleBookNow(room)}
          />
        ))}
      </div>

      {/* Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        room={selectedRoom}
      />
    </div>
  );
};

export default RoomAvailableList;
