import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Auth";
import { useState } from "react";
import Modal from "../../components/Modal";
import { useUserContext } from "../../contexts/AuthContext";
import AdminSidebar from "../../layout/AdminSidebar";
import AdminHeader from "../../layout/AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsAuthenticated, setRole } = useUserContext();

  const modalCancel = () => setIsModalOpen(!isModalOpen);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_refresh");
        localStorage.removeItem("role");
        setIsAuthenticated(false);
        setRole("");
        navigate("/");
      }
    } catch (error) {
      console.error(`Failed to logout: ${error}`);
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <AdminHeader />
      </div>
      <div className="flex flex-row">
        <AdminSidebar />
        <div className="px-4 py-3">
          <h1 className="text-gray-400">
            <i className="fa fa-home mr-2"></i>Azurea / Dashboard
          </h1>

          <div></div>
          <div>Hello Admin!</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 p-4 border-2 border-gray-600 text-white rounded-md"
          >
            Log Out
          </button>

          <Modal
            isOpen={isModalOpen}
            icon={null}
            title="Log Out"
            description="Are you sure you want to log out?"
            cancel={modalCancel}
            onConfirm={handleLogout}
            confirmText="Log Out"
            cancelText="Cancel"
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
