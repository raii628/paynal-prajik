import RoomModal from "../RoomModal";
import deluxe_single from "../../assets/deluxe_single.webp";
import deluxe_double from "../../assets/deluxe_double.jpg";
import deluxe_twin from "../../assets/deluxe_twin.jpg";
import executive_king from "../../assets/executive_king.webp";
import executive_double from "../../assets/executive_double.avif";
import president_king from "../../assets/president_king.jpg";

const BookingList = () => {
  const rooms = [
    {
      roomImage: deluxe_single,
      roomName: "Deluxe Room (Single Bed)",
      capacity: 1,
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Air Conditioning",
        "Flat-screen TV",
      ],
      price: 4000,
      priceNote: "Price for 1 Night",
      availabilityNote: "Only 1 Room Left",
    },
    {
      roomImage: deluxe_double,
      roomName: "Deluxe Room (Double Bed)",
      capacity: 2,
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Air Conditioning",
        "Flat-screen TV",
      ],
      price: 5000,
      priceNote: "Price for 1 Night",
      availabilityNote: "Few Rooms Left",
    },
    {
      roomImage: deluxe_twin,
      roomName: "Deluxe Room (Twin Bed)",
      capacity: 2,
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Air Conditioning",
        "Flat-screen TV",
      ],
      price: 5500,
      priceNote: "Price for 1 Night",
      availabilityNote: "Only 2 Rooms Left",
    },
    {
      roomImage: executive_king,
      roomName: "Executive Suite (King Bed)",
      capacity: 2,
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Mini Bar",
        "Jacuzzi",
        "Flat-screen TV",
      ],
      price: 12000,
      priceNote: "Price for 1 Night",
      availabilityNote: "Available",
    },
    {
      roomImage: executive_double,
      roomName: "Executive Suite (Double Bed)",
      capacity: 2,
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Mini Bar",
        "Private Lounge",
        "Flat-screen TV",
      ],
      price: 11000,
      priceNote: "Price for 1 Night",
      availabilityNote: "Available",
    },
    {
      roomImage: president_king,
      roomName: "Presidential Suite (King Bed)",
      capacity: 2,
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Jacuzzi",
        "Private Lounge",
        "VIP Amenities",
      ],
      price: 20000,
      priceNote: "Price for 1 Night",
      availabilityNote: "Limited Availability",
    },
  ];

  return (
    <div className="space-y-8">
      {rooms.map((room, index) => (
        <RoomModal key={index} {...room} />
      ))}
    </div>
  );
};

export default BookingList;
