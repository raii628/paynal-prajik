// AdminProfile.tsx
import { FC } from "react";

interface AdminData {
    name: string;
    email: string;
    profile_pic: string;
}

interface AdminProfileProps {
    admin: AdminData;
}

const AdminProfile: FC<AdminProfileProps> = ({ admin }) => {
    return (
        <div className="flex space-x-3 items-center border-b border-b-gray-200 p-2">
            <div className="flex justify-center items-center rounded-full bg-violet-400 w-15 h-15">
                <img
                    src={admin.profile_pic && admin.profile_pic.trim() !== "" ? admin.profile_pic : "/images/default_avatar.png"}
                    alt={admin.profile_pic}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <ul className="flex flex-col justify-center">
                <li className="text-gray-700 font-medium tracking-wide text-xl">
                    {admin.name}
                </li>
                <li className="relative flex items-center text-gray-600 font-medium tracking-wide text-normal">
                    {admin.email}
                </li>
            </ul>
        </div>
    );
};

export default AdminProfile;
