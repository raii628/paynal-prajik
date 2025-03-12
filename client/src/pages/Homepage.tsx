import AboutUs from "../components/AboutUs";
// import RoomAvailabilityCalendar from "../components/rooms/RoomAvailabilityCalendar";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";

const Homepage = () => {
  return (
    <section>
      <Hero />
      {/* <RoomAvailabilityCalendar /> */}
      <AboutUs />
      <Footer />
    </section>
  );
};

export default Homepage;
