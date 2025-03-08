import { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
  };
  const toggleRegisterModal = () => {
    setRegisterModal(!registerModal);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation links for Hotel Management System
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Bookings", path: "/bookings" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full py-2 px-10 flex justify-between items-center z-40 transition-all duration-75 ${
          isScrolled
            ? "bg-white shadow-lg text-black py-0"
            : "bg-transparent text-white py-2"
        }`}
      >
        <div className="flex justify-between items-center gap-12">
          <div>
            <Link to="/">
              <h1 className="text-xl bg-gradient-to-r from-[#7300FF] to-[#08D3FC] bg-clip-text text-transparent cursor-pointer">
                <i className="fa-solid fa-moon text-5xl mr-2"></i>
                Azurea Haven
              </h1>
            </Link>
          </div>
        </div>

        <ul className="flex items-center gap-5">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-sm font-bold cursor-pointer hover:text-[#3C69FF] transition-all duration-300 p-3"
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            className="text-sm font-bold rounded-md border-2 px-5 py-1 cursor-pointer hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300"
            onClick={toggleLoginModal}
          >
            Login
          </button>

          <button
            className="text-sm font-bold rounded-md border-2 px-5 py-1 cursor-pointer hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300"
            onClick={toggleRegisterModal}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {loginModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50">
          <LoginModal 
            toggleLoginModal={toggleLoginModal} 
            openSignupModal={toggleRegisterModal}
          />
        </div>
      )}
      {registerModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50">
          <SignupModal 
            toggleRegisterModal={toggleRegisterModal} 
            openLoginModal={toggleLoginModal}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
