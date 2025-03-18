import Footer from "../layout/Footer";
import RoomHero from "../layout/RoomHero";
import RoomList from "../components/rooms/RoomList";
import RoomFeatures from "../components/rooms/RoomFeatures";
import RoomIncluded from "../components/rooms/RoomIncluded";
import RoomAbout from "../components/rooms/RoomAbout";

const Rooms = () => {
  return (
    <>
      <RoomHero />
      <RoomFeatures />
      <RoomAbout />
      <RoomIncluded />
      <RoomList />
      <Footer />
    </>
  );
};

export default Rooms;
