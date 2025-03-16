import { Link } from "react-router-dom";
import VenueAvailableList from "../components/bookings/VenueAvailableList";
import RoomAvailableList from "../components/rooms/RoomAvailableList";
import AvailabilityHero from "../layout/AvailabiityHero";
import Footer from "../layout/Footer";

const Availability = () => {
  return (
    <>
      <AvailabilityHero />

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
          Venues Available
        </h2>
        <VenueAvailableList />
      </section>

      <Footer />
    </>
  );
};

export default Availability;
