import { useState, useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useUserContext } from "../contexts/AuthContext";
import { navLinks } from "../constants/Navbar";
import { logout } from "../services/Auth";
import Modal from "../components/Modal";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setRole } = useUserContext();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      if (response.status === 200) {
        setIsAuthenticated(false);
        setRole("");
        setIsModalOpen(false);
        navigate("/", { replace: true });
      }
      setLoading(false);
    } catch (error) {
      console.error(`Failed to logout: ${error}`);
    }
  };

  const toggleLoginModal = () => setLoginModal(!loginModal);
  const toggleRegisterModal = () => setRegisterModal(!registerModal);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (loginModal) setLoginModal(false);
        if (registerModal) setRegisterModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loginModal, registerModal]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoginModal(false);
      setRegisterModal(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      <nav
        className={` sticky top-0 left-0 w-full px-10 py-4 flex items-center justify-between z-40 transition-all duration-75 ${
          isScrolled
            ? "bg-white shadow-lg text-black"
            : "bg-transparent text-white"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7300FF] to-[#08D3FC] bg-clip-text text-transparent cursor-pointer">
              <i className="fa-solid fa-moon text-4xl mr-2"></i>
              Azurea
            </h1>
          </Link>
        </div>

        <div className="block lg:hidden">
          {/* Hamburger icon */}
          {!menuOpen && (
            <i
              className="fa fa-bars text-2xl cursor-pointer transition-all duration-300"
              onClick={() => setMenuOpen(true)} // Open menu on click
            ></i>
          )}

          {/* Overlay Menu */}
          <div className="h-full">
            <ul
              className={`fixed top-0 right-0 w-full md:w-1/2 sm:w-3/5 max-w[] h-screen bg-white shadow-md text-black flex flex-col items-center gap-4 font-bold text-lg z-50 transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "opacity-100 pointer-events-auto translate-x-0"
                  : "opacity-0 pointer-events-none translate-x-full"
              }`}
            >
              {/* Close Icon */}
              <li
                className="w-full text-right text-4xl pr-10 py-3 cursor-pointer"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                <i className="fa fa-times"></i>
              </li>

              {/* Menu Links */}
              <li className="w-full text-center py-3 hover:bg-violet-400 hover:text-white cursor-pointer">
                Home
              </li>
              <li className="w-full text-center py-3 hover:bg-violet-400 hover:text-white cursor-pointer">
                About
              </li>
              <li className="w-full text-center py-3 hover:bg-violet-400 hover:text-white cursor-pointer">
                Rooms
              </li>
              <li className="w-full text-center py-3 hover:bg-violet-400 hover:text-white cursor-pointer">
                Services
              </li>
              <li className="w-full text-center py-3 hover:bg-violet-400 hover:text-white cursor-pointer">
                Promo
              </li>
            </ul>
          </div>
        </div>

        <ul className=" hidden lg:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-lg font-bold hover:text-[#3C69FF] transition-all duration-300"
            >
              <Link to={link.link}>{link.text}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                className="px-4 py-2 text-base font-bold border rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
                onClick={toggleLoginModal}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-base font-bold border rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
                onClick={toggleRegisterModal}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 text-lg font-bold border rounded-md hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {loginModal && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <LoginModal
            toggleLoginModal={toggleLoginModal}
            openSignupModal={toggleRegisterModal}
          />
        </div>
      )}
      {registerModal && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <SignupModal
            toggleRegisterModal={toggleRegisterModal}
            openLoginModal={toggleLoginModal}
          />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        icon="fa fa-sign-out-alt"
        title="Log Out"
        description="Are you sure you want to log out?"
        cancel={() => setIsModalOpen(!isModalOpen)}
        onConfirm={handleLogout}
        className={`bg-purple-600 text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 cursor-pointer rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        confirmText={loading ? "Logging out..." : "Log Out"}
        cancelText="Cancel"
      />
    </>
  );
};

export default Navbar;
