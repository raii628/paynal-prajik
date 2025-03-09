import { useState } from "react";

const menuItems = [
  { icon: "fa-house", label: "Dashboard" },
  { icon: "fa-calendar-days", label: "Reservation" },
  { icon: "fa-bed", label: "Manage Rooms" },
  { icon: "fa-users", label: "Staff Section" },
  { icon: "fa-comments", label: "Manage Complaints" },
  { icon: "fa-chart-pie", label: "Statistic" },
];

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="w-70 h-screen bg-white text-black z-0 shadow-lg overflow-y-auto">
      <div className="flex space-x-3 items-center border-b border-b-gray-200 p-5">
        <div className="flex justify-center items-center rounded-full bg-violet-400 w-18 h-18">
          <i className="fa fa-user text-white text-4xl"></i>
        </div>
        <ul className="flex flex-col justify-center">
          <li className="text-gray-700 font-medium tracking-wide text-xl">
            Harold Aldovino
          </li>
          <li className="relative flex items-center text-gray-600 font-medium tracking-wide text-normal">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            MANAGER
          </li>
        </ul>
      </div>

      {/* Sidebar Menu */}
      <div className="py-4 px-3">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center space-x-3 py-2 px-3 rounded-md transition-all duration-300 cursor-pointer 
                ${
                  activeItem === item.label
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
    </aside>
  );
};

export default AdminSidebar;
