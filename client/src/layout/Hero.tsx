import Navbar from "./Navbar";
import hotel_bg from "../assets/hotel_bg.jpg";
import RoomAvailabilityCalendar from "../components/rooms/RoomAvailabilityCalendar";

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/60 before:z-0"
      style={{ backgroundImage: `url(${hotel_bg})` }}
    >
      <Navbar />

      <div className="flex flex-col justify-end items-center h-screen z-10 relative gap-15 sm:gap-13 md:gap-17 lg-gap-21 xl:gap-23 px-6 sm:px-12 md:px-20">
        <div className="text-white text-center self-center max-w-4xl">
          <h1 className="font-playfair mb-4 text-[clamp(1.75rem,3.5vw,3rem)] leading-tight">
            Experience Comfort and Luxury
          </h1>
          <p className="font-montserrat text-[clamp(0.9rem,1.3vw,1.25rem)] leading-relaxed">
            Experience the best stay of your life with premium rooms and
            world-class services today.
          </p>
        </div>

        <div className="lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          <RoomAvailabilityCalendar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
