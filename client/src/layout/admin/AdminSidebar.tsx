import React, { Suspense, useState, useEffect } from "react";
import { fetchAdminProfile } from "../../services/Admin";
import { menuItems } from "../../constants/AdminMenuSidebar";
import AdminDetailSkeleton from "../../motions/AdminDetailSkeleton";

const AdminProfile = React.lazy(() => import("./AdminProfile"));

interface AdminData {
  name: string;
  email: string;
  profile_pic: string;
}

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [admin, setAdmin] = useState<AdminData>({
    name: "",
    email: "",
    profile_pic: "",
  });

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
    <aside className="w-70 h-screen bg-white text-black z-0 shadow-lg overflow-y-auto">
      {/* Header Section: Shows the admin profile image and details */}
      <Suspense fallback={<AdminDetailSkeleton />}>
        {admin ? <AdminProfile admin={admin} /> : <AdminDetailSkeleton />}
      </Suspense>

      {/* Sidebar Menu */}
      <div className="py-4 px-3">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 cursor-pointer ${activeItem === item.label ? "border-r-3 border-violet-400 bg-violet-100 text-violet-600" : "text-[hsl(190,98%,10%)] hover:bg-violet-200 hover:text-[#7300FF]"}`}
            >
              <i className={`fa ${item.icon} font-light`}></i>
              <span className="font-light">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
