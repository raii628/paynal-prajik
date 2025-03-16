import Navbar from "./Navbar";
import reservation_bg from "../assets/reservation_bg.jpg";

const VenueHero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/60 before:z-0"
      style={{ backgroundImage: `url(${reservation_bg})` }}
    >
      <Navbar />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        <h1 className="text-white [font-size:clamp(2rem,5vw,3rem)] font-bold leading-tight drop-shadow-md font-playfair">
          Reserve the Perfect Area for Your Event
        </h1>
        <p className="text-white mt-4 [font-size:clamp(0.9rem,2.5vw,1.2rem)] max-w-3xl leading-relaxed drop-shadow-sm font-montserrat">
          Make every occasion special with our exclusive area reservations.
          Whether it's a private celebration, business event, or family
          gathering, we offer elegant spaces tailored to your needs, complete
          with modern amenities and exceptional service.
        </p>
      </div>
    </section>
  );
};

export default VenueHero;
