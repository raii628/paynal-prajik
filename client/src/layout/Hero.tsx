import Navbar from "./Navbar";
import RoomAvailabilityCalendar from "../components/rooms/RoomAvailabilityCalendar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { slides } from "../constants/HomepageHeroSlides";

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative w-full h-screen">
      <Navbar />
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/60 before:z-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="flex flex-col justify-center items-center h-screen z-10 relative text-center px-6 sm:px-12 md:px-20">
                <motion.div
                  className="text-white max-w-4xl"
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h1 className="font-playfair mb-4 text-[clamp(1.75rem,3.5vw,3rem)] leading-tight">
                    {slide.heading}
                  </h1>
                  <p className="font-montserrat text-[clamp(0.9rem,1.3vw,1.25rem)] leading-relaxed">
                    {slide.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-10 w-full flex justify-center z-20">
        <div className="lg:w-9/12 xl:w-8/12 2xl:w-7/12">
          <RoomAvailabilityCalendar />
        </div>
      </div>
    </section>
  );
};

export default Hero;