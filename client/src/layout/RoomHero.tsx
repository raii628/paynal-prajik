import Navbar from "./Navbar";
import room_bg from "../assets/room_bg.jpg";

const RoomHero = () => {
  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <h1 className="text-white [font-size:clamp(2rem,5vw,3rem)] font-bold leading-tight drop-shadow-md font-playfair">
          Discover Your Perfect Stay
        </h1>
        <p className="text-white mt-4 [font-size:clamp(0.9rem,2.5vw,1.2rem)] max-w-3xl leading-relaxed drop-shadow-sm font-montserrat">
          Experience a blend of elegance and comfort in our beautifully designed
          rooms. Whether for a relaxing getaway or a business trip, our suites
          offer an unforgettable experience filled with style and modern
          amenities.
        </p>
      </div>
    </section>
=======
      <section
        className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/60 before:z-0"
        style={{ backgroundImage: `url(${room_bg})` }}
      >
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <h1 className="text-white [font-size:clamp(2rem,5vw,3rem)] font-bold leading-tight drop-shadow-md font-playfair">
            Discover Your Perfect Stay
          </h1>
          <p className="text-white mt-4 [font-size:clamp(0.9rem,2.5vw,1.2rem)] max-w-3xl leading-relaxed drop-shadow-sm font-montserrat">
            Experience a blend of elegance and comfort in our beautifully designed
            rooms. Whether for a relaxing getaway or a business trip, our suites
            offer an unforgettable experience filled with style and modern
            amenities.
          </p>
          <button className="mt-8 px-5 py-2.5 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition font-montserrat [font-size:clamp(0.9rem,2vw,1rem)]">
            Explore Rooms
          </button>
        </div>
      </section>
    </>
>>>>>>> 8bb5b6a956aa5299b86dc5bd0282599971aad5b4
  );
};

export default RoomHero;
