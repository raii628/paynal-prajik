import Navbar from "./Navbar";
import room_bg from "../assets/room_bg.jpg";
import { motion } from "framer-motion";

const RoomHero = () => {
  return (
    <>
      <Navbar />
      <section
        className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/60 before:z-0"
        style={{ backgroundImage: `url(${room_bg})` }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-white [font-size:clamp(2rem,5vw,3rem)] font-bold leading-tight drop-shadow-md font-playfair"
          >
            Discover Your Perfect Stay
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-white mt-4 [font-size:clamp(0.9rem,2.5vw,1.2rem)] max-w-3xl leading-relaxed drop-shadow-sm font-montserrat"
          >
            Experience a blend of elegance and comfort in our beautifully
            designed rooms. Whether for a relaxing getaway or a business trip,
            our suites offer an unforgettable experience filled with style and
            modern amenities.
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};

export default RoomHero;
