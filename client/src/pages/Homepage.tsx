import Navbar from "../layout/Navbar";
import hotel_bg from "../assets/hotel_bg.jpg";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";

const Homepage = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/50 before:z-0"
      style={{ backgroundImage: `url(${hotel_bg})` }}
    >
      <Navbar />
      <Hero />
    </section>
  );
};

export default Homepage;
