import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Auth"

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refresh');
      }
      navigate('/login');
    } catch (error) {
      console.error(`Failed to logout: ${error}`);
    }
  }
  
  return (
    <>
      <div>AdminDashboard</div>
      <button onClick={handleLogout} className="bg-blue-500 p-4 border-2 border-gray-600 text-white rounded-md">Log Out</button>
    </>
  )
}

export default AdminDashboard