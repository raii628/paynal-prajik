import Navbar from "./Navbar";
import reservation_bg from "../assets/reservation_bg.jpg";
import { motion } from "framer-motion";

const VenueHero = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${reservation_bg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <Navbar />
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-white [font-size:clamp(2rem,5vw,3rem)] font-bold leading-tight drop-shadow-md font-playfair"
        >
          Reserve the Perfect Area for Your Event
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-white mt-4 [font-size:clamp(0.9rem,2.5vw,1.2rem)] max-w-3xl leading-relaxed drop-shadow-sm font-montserrat"
        >
          Make every occasion special with our exclusive area reservations.
          Whether it's a private celebration, business event, or family
          gathering, we offer elegant spaces tailored to your needs, complete
          with modern amenities and exceptional service.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default VenueHero;
