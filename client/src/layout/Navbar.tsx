import { useState, useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useUserContext } from "../contexts/AuthContext";
import { navLinks } from "../constants/Navbar";
import { logout } from "../services/Auth";
import Modal from "../components/Modal";
import hotelLogo from "../assets/hotel_logo.png";
import Notification from "../components/Notification";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    icon: string;
  } | null>(null);

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setRole } = useUserContext();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      if (response.status === 200) {
        setIsAuthenticated(false);
        setRole("");
        setNotification({
          message: "Logged out successfully",
          type: "success",
          icon: "fas fa-check-circle",
        });
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
      {notification && (
        <Notification
          icon={notification.icon}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <nav
        className={`fixed top-0 left-0 w-full px-10 py-4 flex items-center justify-between z-40 transition-all duration-75 ${
          isScrolled
            ? "bg-gray-200 shadow-lg text-black"
            : "bg-transparent text-white/70"
        }`}
      >
        <div className="flex items-center">
          <Link to="/">
            <img
              src={hotelLogo}
              alt="Hotel Logo"
              className="h-12 w-auto cursor-pointer mr-4"
            />
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
          <div className="h-full overflow-y-auto">
            {menuOpen && (
              <div
                className="hidden md:block sm:block fixed inset-0 bg-black/30 bg-opacity-50 z-40"
                onClick={() => setMenuOpen(false)} // Close on click
              ></div>
            )}
            <ul
              className={`fixed top-0 right-0 w-full md:w-2/5 sm:w-3/5 xs:w-4/5 h-screen bg-white shadow-md text-black  items-center gap-4 font-bold text-lg z-50 transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "opacity-100 pointer-events-auto translate-x-0"
                  : "opacity-0 pointer-events-none translate-x-full"
              }`}
            >
              {/* Close Icon */}
              <div className="text-3xl bg-gray-200 flex justify-between items-center py-2.5">
                <Link to="/">
                  <img
                    src={hotelLogo}
                    alt="Hotel Logo"
                    className="block sm:hidden h-12 w-auto cursor-pointer mr-4"
                  />
                </Link>
                <li
                  className="  pr-10 py-3 cursor-pointer"
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  <i className="fa fa-times"></i>
                </li>
              </div>

              <div>
                <li className="w-full text-left text-black/70 pl-5 py-2">
                  <i className="fa fa-bars text-black/70 mr-3"></i>
                  Navigation
                </li>
                <div className="border-b-2 pl-5 px-3 pb-3 text-black/80 border-gray-300 uppercase font-light tracking-wide">
                  {navLinks.map((link, index) => (
                    <li
                      key={index}
                      className="w-full py-3 rounded-md hover:bg-violet-200 hover:text-violet-700 cursor-pointer"
                      onClick={() => setMenuOpen(false)} // Close menu when clicking link
                    >
                      <Link
                        to={link.link}
                        className="flex items-center text-sm"
                      >
                        <i className={`ml-3 mr-3 ${link.icon}`}></i> {link.text}
                      </Link>
                    </li>
                  ))}
                </div>

                <div className="pl-5 py-3 px-3 text-black/80">
                  <li
                    className="w-full py-3 rounded-md text-sm hover:bg-violet-200 hover:text-violet-700 cursor-pointer"
                    onClick={toggleLoginModal}
                  >
                    <i className="fa-regular fa-user ml-3 mr-3"></i> Login
                  </li>
                  <li
                    className="w-full py-3 rounded-md text-sm hover:bg-violet-200 hover:text-violet-700 cursor-pointer
                  "
                    onClick={toggleRegisterModal}
                  >
                    <i className="fa fa-user-plus ml-3 mr-3"></i>Sign up
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <ul className=" hidden lg:flex items-center 2xl:space-x-15 xl:space-x-10 md:space-x-7">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-lg lg:text-lg 2xl:text-xl font-bold hover:text-violet-500 transition-all duration-300"
            >
              <Link to={link.link}>{link.text}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <button
                className="px-4 py-2 text-base font-bold border rounded-md hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition duration-300 cursor-pointer"
                onClick={toggleLoginModal}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-base font-bold border rounded-md hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition duration-300 cursor-pointer"
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
