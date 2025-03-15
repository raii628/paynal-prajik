import Footer from "../layout/Footer";
import RoomHero from "../layout/RoomHero";
import RoomList from "../components/rooms/RoomList";
import RoomFeatures from "../components/rooms/RoomFeatures";
import RoomIncluded from "../components/rooms/RoomIncluded";
import RoomAbout from "../components/rooms/RoomAbout";
import AnimatedSection from "./AnimatedSection";

const Rooms = () => {
  return (
    <>
      <RoomHero />
      <AnimatedSection>
        <RoomFeatures />
      </AnimatedSection>
      <AnimatedSection>
        <RoomAbout />
      </AnimatedSection>
      <AnimatedSection>
        <RoomIncluded />
      </AnimatedSection>
      <AnimatedSection>
        <RoomList />
      </AnimatedSection>
      <Footer />
    </>
  );
};

export default Rooms;
