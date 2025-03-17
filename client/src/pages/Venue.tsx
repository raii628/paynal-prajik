import VenueList from "../components/bookings/VenueList";
import Footer from "../layout/Footer";
import VenueHero from "../layout/VenueHero";
import AnimatedSection from "./AnimatedSection";
const Venue = () => {
  return (
    <>
      <VenueHero />
      <AnimatedSection>
        <VenueList />
      </AnimatedSection>
      <Footer />
    </>
  );
};

export default Venue;
