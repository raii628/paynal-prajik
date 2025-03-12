import Navbar from "./Navbar";
import room_bg from "../assets/room_bg.jpg";
const RoomHero = () => {
  return (
    <section
      className=" h-screen bg-cover bg-right relative before:absolute before:inset-0 before:bg-black/50 before:z-0"
      style={{ backgroundImage: `url(${room_bg})` }}
    >
      <Navbar />
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 sm:px-15 md:px-20 lg:px-24 xl:px-30 2xl:px-35">
        <h1 className="text-white [font-size:clamp(2rem,6vw,3.5rem)] font-bold text-center leading-tight">
          Rooms & Suites
        </h1>
      </div>
    </section>
  );
};

export default RoomHero;
