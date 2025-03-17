import { Link } from "react-router-dom";
import aboutUs_bg from "../assets/aboutUs_bg.jpg";
import philosophy from "../assets/philosophy.jpg";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const AboutUs = () => {
  const aboutRef = useRef(null);
  const philosophyRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-50px" });
  const isPhilosophyInView = useInView(philosophyRef, {
    once: true,
    margin: "-50px",
  });

  return (
    <section className="py-12 px-6 bg-white">
      <div
        ref={aboutRef}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12"
      >
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
        >
          <img
            src={aboutUs_bg}
            alt="About Us"
            className="w-full h-auto rounded-2xl shadow-md"
          />
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          <h3 className="text-blue-800 uppercase text-lg font-extralight font-montserrat tracking-widest flex items-center gap-2">
            <i className="fa fa-moon"></i> About Us
          </h3>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-playfair text-gray-800 leading-tight">
            Experience Luxury and Comfort at Azurea Hotel
          </h1>

          <p className="text-gray-60 font-montserrat text-base sm:text-sm lg:text-lg  leading-relaxed">
            Discover a place where elegance meets comfort. Azurea Hotel offers
            top-notch amenities, personalized services, and a welcoming
            atmosphere that makes every stay unforgettable. Whether for business
            or leisure, Azurea is your perfect destination.
          </p>

          <button className="mt-4 inline-block font-montserrat bg-blue-800 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-all">
            More about us &rarr;
          </button>
        </motion.div>
      </div>

      <div
        ref={philosophyRef}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={isPhilosophyInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          <h3 className="text-blue-800 uppercase text-lg font-extralight font-montserrat tracking-widest flex items-center gap-2">
            <i className="fa fa-moon"></i> Our Philosophy
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-playfair text-gray-800 leading-tight">
            Creating Memorable Experiences
          </h1>
          <p className="text-gray-600 text-base font-montserrat sm:text-sm lg:text-lg leading-relaxed">
            We believe in offering more than just a place to stay. Azurea Hotel
            is a place where memories are made — whether you're on a romantic
            getaway, a family vacation, or a business trip.
          </p>
          <Link to={"/availability"}>
            <button className="mt-4 inline-block font-montserrat bg-blue-800 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-all">
              Book with us &rarr;
            </button>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate={isPhilosophyInView ? "visible" : "hidden"}
          className="order-1 md:order-2"
        >
          <img
            src={philosophy}
            alt="Our Philosophy"
            className="w-full h-auto rounded-2xl shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
