import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Rooms", "Services", "Promo"];
  const authButtons = ["Login", "Sign Up"];

  return (
    <nav
      className={`sticky top-0 left-0 w-full py-4 px-10 flex justify-between items-center z-50 transition-all duration-75 ${
        isScrolled
          ? "bg-white shadow-lg text-black py-0"
          : "bg-transparent text-white py-4"
      }`}
    >
      <div className="flex justify-between items-center gap-12">
        <div>
          <h1 className="text-xl bg-gradient-to-r from-[#7300FF] to-[#08D3FC] bg-clip-text text-transparent cursor-pointer">
            <i className="fa-solid fa-moon text-5xl mr-2"></i>
            Azurea Hotel
          </h1>
        </div>

        <i className="fa-solid fa-bars text-2xl cursor-pointer"></i>
      </div>
      <ul className="flex items-center gap-5">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="text-sm font-bold cursor-pointer hover:text-[#3C69FF] transition-all duration-300 p-3"
          >
            {link}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-5">
        {authButtons.map((button, index) => (
          <button
            key={index}
            className="text-sm font-bold rounded-md border-2 px-5 py-1 cursor-pointer hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300"
          >
            {button}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
