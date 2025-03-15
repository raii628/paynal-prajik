import AreaReservationList from "../components/bookings/AreaReservationList";
import Footer from "../layout/Footer";
import ReservationHero from "../layout/ReservationHero";
const Reservations = () => {
  return (
    <>
      <ReservationHero />
      <AreaReservationList />
      <Footer />
    </>
  );
};

export default Reservations;
