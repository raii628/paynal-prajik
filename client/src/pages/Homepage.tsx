import AboutUs from "../components/AboutUs";
import Values from "../components/Values";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";

const Homepage = () => {
  return (
    <section>
      <Hero />
      <AboutUs />
      <Values />
      <Footer />
    </section>
  );
};

export default Homepage;
