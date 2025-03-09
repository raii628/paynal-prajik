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

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setRole } = useUserContext();

  const handleLogout = async () => {
      try {
        const response = await logout();
        if (response.status === 200) {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_refresh');
          localStorage.removeItem('role');
          setIsAuthenticated(false);
          setRole('');
          setIsModalOpen(false);
          navigate('/', { replace: true });
        }
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
    if (isAuthenticated) {
      setLoginModal(false);
      setRegisterModal(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full py-2 px-10 flex justify-between items-center z-40 transition-all duration-75 ${isScrolled
          ? "bg-white shadow-lg text-black py-0"
          : "bg-transparent text-white py-2"
          }`}
      >
        <div className="flex justify-between items-center gap-12">
          <div>
            <Link to="/">
              <h1 className="text-xl bg-gradient-to-r from-[#7300FF] to-[#08D3FC] bg-clip-text text-transparent cursor-pointer">
                <i className="fa-solid fa-moon text-5xl mr-2"></i>
                Azurea 
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
              <Link to={link.link}>{link.text}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {!isAuthenticated ? (

            <>
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
            </>
          ) : (
            <button
              className="text-sm font-bold rounded-md border-2 px-5 py-1 cursor-pointer hover:bg-gradient-to-r from-[#7300FF] to-[#08D3FC] transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Logout
            </button>
          )}
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
      <Modal 
        isOpen={isModalOpen}
        icon={null}
        title="Log Out"
        description="Are you sure you want to log out?"
        cancel={() => setIsModalOpen(!isModalOpen)}
        onConfirm={handleLogout}
        confirmText="Log Out"
        cancelText="Cancel"
      />
    </>
  );
};

export default Navbar;
