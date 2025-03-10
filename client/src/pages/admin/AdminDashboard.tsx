import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Auth";
import { useState } from "react";
import Modal from "../../components/Modal";
import { useUserContext } from "../../contexts/AuthContext";
import AdminSidebar from "../../layout/admin/AdminSidebar";
import AdminHeader from "../../layout/admin/AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsAuthenticated, setRole } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <>
      <div className="flex flex-col ">
        <AdminHeader />
      </div>
      <div className="flex flex-row">
        <AdminSidebar />
        <div className="px-4 py-3">
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
            className={`bg-purple-600 text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${loading} ? 'opacity-50 cursor-not-allowed' : ''`}
            confirmText="Log Out"
            cancelText="Cancel"
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
