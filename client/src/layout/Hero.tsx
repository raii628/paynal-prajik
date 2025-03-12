import Navbar from "./Navbar";
import hotel_bg from "../assets/hotel_bg.jpg";
import Navbar from "./Navbar";
import hotel_bg from "../assets/hotel_bg.jpg";

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/50 before:z-0"
      style={{ backgroundImage: `url(${hotel_bg})` }}
    >
      <Navbar />
      <div className="relative mx-20 z-10 h-screen">
        <h3 className="text-4xl text-white mt-15 mb-5 tracking-wider ">
          Azurea Hotel
        </h3>
        <h1 className="text-7xl text-white font-bold leading-tight">
          Stay in <span className="text-[#3C69FF]">Comfort</span>, <br />
          Leave with <span className="text-[#3C69FF]">Memories</span>
        </h1>

        <p className="text-m text-white mt-5">
          Beyond a stay, it&apos;s an experience. Relax, unwind, and indulge in
          the finest <br /> comforts designed just for you.
        </p>

        <button className="text-2xl text-white mt-10 rounded-full border px-4 py-3 font-medium hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300 group">
          Book now
          <i className="fa-solid fa-arrow-right ml-4 transition-transform duration-300 ease-in-out group-hover:-rotate-45"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;
