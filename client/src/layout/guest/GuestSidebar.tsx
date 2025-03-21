import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { logout } from "../../services/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GuestSidebar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    icon: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      if (response.status === 200) {
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
          {/* Replace with your Notification component if needed */}
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
            <li>
              <NavLink
                to="/guest"
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
                  />
                </svg>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/book-room"
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10m-10 4h10m-10 4h10"
                  />
                </svg>
                Book Room
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-bookings"
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vip-upgrade"
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                VIP Upgrade
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedback"
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4"
                  />
                </svg>
                Feedback
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.176 0 4.21.498 6.121 1.404M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Profile
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors w-full text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                  />
                </svg>
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
        className={`bg-red-600 text-white active:bg-red-700 font-bold uppercase px-4 py-2 cursor-pointer rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all duration-150 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
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
