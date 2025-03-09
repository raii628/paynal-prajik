import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Auth"
import { useState } from "react";
import Modal from "../../components/Modal";
import { useUserContext } from "../../contexts/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsAuthenticated, setRole } = useUserContext();

  const modalCancel = () => setIsModalOpen(!isModalOpen);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refresh');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole('');
        navigate('/');
      }
    } catch (error) {
      console.error(`Failed to logout: ${error}`);
    }
  };
  
  return (
    <>
      <div>Hello Admin!</div>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-blue-500 p-4 border-2 border-gray-600 text-white rounded-md">
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
    </>
  )
}

export default AdminDashboard