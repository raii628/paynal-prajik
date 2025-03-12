import React, { Suspense, useState, useEffect, FC } from "react";
import { fetchAdminProfile } from "../../services/Admin";
import { menuItems } from "../../constants/AdminMenuSidebar";
import AdminDetailSkeleton from "../../motions/AdminDetailSkeleton";
import { useUserContext } from "../../contexts/AuthContext";
import Modal from "../../components/Modal";
import { logout } from "../../services/Auth";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminProfile = React.lazy(() => import("./AdminProfile"));

interface AdminData {
  name: string;
  email: string;
  profile_pic: string;
}

const AdminSidebar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useUserContext();

  const [admin, setAdmin] = useState<AdminData>({
    name: "",
    email: "",
    profile_pic: "",
  });

  const modalCancel = () => setIsModalOpen(!isModalOpen);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      if (response.status === 200) {
        setIsAuthenticated(false);
        setRole("");
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      console.error(`Failed to logout: ${error}`);
    }
  };

  useEffect(() => {
    const adminProfile = async () => {
      try {
        const response = await fetchAdminProfile();
        setAdmin(response.data.data);
      } catch (error) {
        console.error(`Failed to fetch admin profile: ${error}`);
      }
    }
    adminProfile();
  }, [])

  return (
    <>
      <aside className="w-70 h-screen flex flex-col bg-white text-black z-0 shadow-lg">
        <div className="px-3 py-4">
          <Suspense fallback={<AdminDetailSkeleton />}>
            {admin ? <AdminProfile admin={admin} /> : <AdminDetailSkeleton />}
          </Suspense>
        </div>
        <div className="flex-grow overflow-y-auto px-3">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  end={item.link === "/admin"}
                  className={({ isActive }) => `flex items-start space-x-3 py-2 px-3 rounded-md cursor-pointer ${isActive ? "border-r-3 border-blue-600 bg-blue-100 text-blue-700 font-bold" : "hover:bg-black/15"}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-2xl" /> <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-3 py-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 text-red-600 hover:bg-black/15 cursor-pointer"
          >
            <i className="fa fa-sign-out-alt font-light"></i>
            <span className="font-bold uppercase">Log Out</span>
          </button>
        </div>
      </aside>
      <Modal
        isOpen={isModalOpen}
        icon="fas fa-sign-out-alt"
        title="Log Out"
        description="Are you sure you want to log out?"
        cancel={modalCancel}
        onConfirm={handleLogout}
        className={`bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        confirmText={loading ? "Logging out..." : "Log Out"}
        cancelText="Cancel"
      />
    </>
  );
};

export default AdminSidebar;
