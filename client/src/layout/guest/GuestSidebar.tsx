import { faSignOut, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { useUserContext } from "../../contexts/AuthContext";
import { logout } from "../../services/Auth";
import { guestMenuItems } from "../../constants/GuestMenuSidebar";

const GuestSidebar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    icon: string;
  } | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useUserContext();

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
    } catch (error) {
      console.error(`Failed to logout: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notification && (
        <div className="fixed top-0 right-0 m-4">
          <div className="bg-green-500 text-white p-2 rounded flex items-center">
            <i className={notification.icon + " mr-2"}></i>
            {notification.message}
          </div>
        </div>
      )}

      <aside className="h-screen w-64 bg-gray-800 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Guest Dashboard</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            {guestMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors w-full text-left"
              >
                <FontAwesomeIcon icon={faSignOut} spin={loading} className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <Modal
        isOpen={isModalOpen}
        icon="fa fa-sign-out-alt"
        title="Log Out"
        description="Are you sure you want to log out?"
        cancel={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        className={`bg-red-600 text-white active:bg-red-700 font-bold uppercase px-4 py-2 cursor-pointer rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all duration-150 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        loading={loading}
        confirmText={
          loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Logging out...
            </>
          ) : (
            "Log Out"
          )
        }
        cancelText="Cancel"
      />
    </>
  );
};

export default GuestSidebar;
