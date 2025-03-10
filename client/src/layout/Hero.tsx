import Navbar from "./Navbar";
import hotel_bg from "../assets/hotel_bg.jpg";

const Hero = () => {
  return (
    <section
      className=" h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/50 before:z-0"
      style={{ backgroundImage: `url(${hotel_bg})` }}
    >
      <Navbar />
      <div
        className="relative z-10 h-full flex flex-col justify-start mt-30 sm:mt-28 md:mt-26 lg:mt-22 xl:mt-19 2xl:mt-16 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
        <h3 className="text-[clamp(1.5rem,3vw,3rem)] text-white mb-4 tracking-wider">
          Azurea Hotel
        </h3>

        <h1 className="text-[clamp(2.5rem,6vw,7rem)] text-white font-bold leading-tight">
          Stay in <span className="text-[#3C69FF]">Comfort</span>, <br />
          Leave with <span className="text-[#3C69FF]">Memories</span>
        </h1>

        <p className="text-[clamp(0.9rem,1.5vw,1.5rem)] text-white mt-4 max-w-4xl leading-relaxed">
          Beyond a stay, it&apos;s an experience. Relax, unwind, and indulge in
          the finest <br className="hidden md:block" />
          comforts designed just for you.
        </p>

        <button className="mt-8 sm:mt-5 text-[clamp(1rem,1.5vw,1.5rem)] text-white rounded-full border px-6 py-3 font-medium hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300 group w-fit">
          Book now
          <i className="fa-solid fa-arrow-right ml-3 transition-transform duration-300 ease-in-out group-hover:-rotate-45"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;
