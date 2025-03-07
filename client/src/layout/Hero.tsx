const Hero = () => {
  return (
    <div className="relative mx-20 z-10">
      <h3 className="text-4xl text-white mt-15 mb-5 tracking-wider font-">
        Azurea Hotel
      </h3>
      <h1 className="text-7xl text-white font-bold leading-tight">
        Stay in <span className="text-[#3C69FF]">Comport</span>, <br />
        Leave with <span className="text-[#3C69FF]">Memories</span>
      </h1>
      <i className="fa-brands fa-x-twitter absolute top-25 right-0 text-xl text-white hover:bg-black"></i>
      <i className="fa-brands fa-facebook absolute top-37 right-0 text-xl text-white hover:text-blue-500 hover:bg-white hover:rounded-full transition-all duration-300"></i>
      <i className="fa-brands fa-instagram absolute top-49 right-0 text-xl text-white hover:bg-gradient-to-r from-[#feda75] via-[#fa7e1e] via-[#d62976] via-[#962fbf] to-[#4f5bd5] hover:bg-clip-text hover:text-transparent transition-all duration-300"></i>

      <p className="text-m text-white mt-5">
        Beyond a stay, it’s an experience. Relax, unwind, and indulge in the
        finest <br /> comforts designed just for you.
      </p>

      <button
        className="text-2xl text-white mt-10 rounded-full border px-4 py-3 font-medium 
  hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300 group"
      >
        Book now
        <i
          className="fa-solid fa-arrow-right ml-4 transition-transform duration-300 ease-in-out 
     group-hover:-rotate-45"
        ></i>
      </button>
    </div>
  );
};

export default Hero;
