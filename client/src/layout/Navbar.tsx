import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authButtons, navLinks } from "../constants/Navbar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 w-full py-4 px-10 flex justify-between items-center z-50 transition-all duration-75 ${
        isScrolled
          ? "bg-white shadow-lg text-black py-0"
          : "bg-transparent text-white py-4"
      }`}
    >
      <div className="px-4 md:px-10 flex justify-between items-center">
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
          <Link
            key={index}
            to={link.link}
            className="text-sm font-bold cursor-pointer hover:text-[#3C69FF] transition-all duration-300 p-3"
          >
            {link.text}
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-5">
        {authButtons.map((button, index) => (
          <Link
            key={index}
            to={button.link}
            className="text-sm font-bold rounded-md border-2 px-5 py-1 cursor-pointer hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300"
          >
            {button.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
