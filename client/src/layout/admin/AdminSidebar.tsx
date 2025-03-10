import React, { Suspense, useState, useEffect, FC } from "react";
import { fetchAdminProfile } from "../../services/Admin";
import { menuItems } from "../../constants/AdminMenuSidebar";
import AdminDetailSkeleton from "../../motions/AdminDetailSkeleton";
import { useUserContext } from "../../contexts/AuthContext";
import Modal from "../../components/Modal";
import { logout } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

const AdminProfile = React.lazy(() => import("./AdminProfile"));

interface AdminData {
  name: string;
  email: string;
  profile_pic: string;
}

const AdminSidebar: FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
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
        {/* Menu Items */}
        <div className="flex-grow overflow-y-auto px-3">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveItem(item.label)}
                className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 cursor-pointer ${activeItem === item.label
                  ? "border-r-3 border-violet-400 bg-violet-100 text-violet-600"
                  : "text-[hsl(190,98%,10%)] hover:bg-violet-200 hover:text-[#7300FF]"
                  }`}
              >
                <i className={`fa ${item.icon} font-light`}></i>
                <span className="font-light">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-3 py-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 text-[hsl(190,98%,10%)] hover:bg-violet-200 hover:text-[#7300FF] cursor-pointer"
          >
            <i className="fa fa-sign-out-alt font-light"></i>
            <span className="font-light">Log Out</span>
          </button>
        </div>
      </aside>
      <Modal
        isOpen={isModalOpen}
        icon='fas fa-sign-out-alt'
        title="Log Out"
        description="Are you sure you want to log out?"
        cancel={modalCancel}
        onConfirm={handleLogout}
        className={`bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        confirmText="Log Out"
        cancelText="Cancel"
      />
    </>
  );
};

export default AdminSidebar;
