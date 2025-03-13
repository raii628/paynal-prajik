import AboutUs from "../components/AboutUs";
import RoomFeatures from "../components/rooms/RoomFeatures";
import Values from "../components/Values";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";

const Homepage = () => {
  return (
    <section>
      <Hero />
      <AboutUs />
      <Values />
      <RoomFeatures />
      <Footer />
    </section>
  );
};

export default Homepage;
