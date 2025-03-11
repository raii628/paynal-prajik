import Navbar from "./Navbar";
import room_bg from "../assets/room_bg.jpg";
const RoomHero = () => {
  return (
    <section
      className=" h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/50 before:z-0"
      style={{ backgroundImage: `url(${room_bg})` }}
    >
      <Navbar />
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 sm:px-15 md:px-20 lg:px-24 xl:px-30 2xl:px-35">
        <div className="flex flex-row items-center mb-7 w-full max-w-6xl px-5">
          <div className="border-t border-gray-300 flex-1"></div>
          <h1 className="text-white/90 [font-size:clamp(1.5rem,3vw,2.5rem)] font-extralight mx-3 whitespace-nowrap">
            Azurea
          </h1>
          <div className="border-t border-gray-300 flex-1"></div>
        </div>
        <h1 className="text-white [font-size:clamp(3rem,8vw,6rem)] font-bold text-center leading-tight">
          Our Rooms
        </h1>
      </div>
    </section>
  );
};

export default RoomHero;
