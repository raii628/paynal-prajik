import AboutUs from "../components/AboutUs";
import Values from "../components/Values";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";
import AnimatedSection from "./AnimatedSection";

const Homepage = () => {
  return (
    <section>
      <Hero />
<<<<<<< HEAD
      <AboutUs />
      <Values />

=======
      <AnimatedSection animationDelay={0.2}>
        <AboutUs />
      </AnimatedSection>
      <AnimatedSection animationDelay={0.4}>
        <Values />
      </AnimatedSection>
      <AnimatedSection animationDelay={0.6}>
        <RoomFeatures />
      </AnimatedSection>
>>>>>>> 8bb5b6a956aa5299b86dc5bd0282599971aad5b4
      <Footer />
    </section>
  );
};

export default Homepage;
