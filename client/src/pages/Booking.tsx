import { Link } from "react-router-dom";
import AreaAvailableList from "../components/bookings/AreaAvailableList";
import RoomAvailableList from "../components/rooms/RoomAvailableList";
import BookHero from "../layout/BookHero";
import Footer from "../layout/Footer";

const Booking = () => {
  return (
    <>
      <BookHero />

      {/* Rooms Section */}
      <section className="px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 font-playfair">
          Rooms Available
        </h2>
        <RoomAvailableList />
      </section>

      {/* Area Reservation Section */}
      <section className="px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 font-playfair">
          Function Areas Available
        </h2>
        <AreaAvailableList />
      </section>

      <Footer />
    </>
  );
};

export default Booking;
