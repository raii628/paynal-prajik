import { FC } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../layout/admin/AdminSidebar";

const AdminLayout: FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-grow p-2 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
