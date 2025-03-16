/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { manageUsers } from "../../services/Admin"
import DashboardSkeleton from "../../motions/DashboardSkeleton";
import Error from "../_ErrorBoundary";

const ManageUsers = () => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: manageUsers,
  });

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <Error />;

  const users = Array.isArray(data) ? data : data?.users || [];

  const filteredUsers = users.filter((user: any) => {
    const firstName = user.first_name?.toLowerCase() || "";
    const lastName = user.last_name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const guestType = user.guest_type?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    const matchesSearch =
      firstName.includes(searchText) ||
      lastName.includes(searchText) ||
      email.includes(searchText) ||
      guestType.includes(searchText);

    const matchesFilter = filter === "All" || guestType === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All Guests</option>
        <option value="VIP">VIP</option>
        <option value="Regular">Regular</option>
      </select>

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-3xl font-bold text-gray-700">🚫 No Users Found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Profile</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Guest Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any) => (
                <tr key={user.id} className="border">
                  <td className="p-2 text-center">
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="w-20 h-20 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="p-2 text-center">{user.first_name}</td>
                  <td className="p-2 text-center">{user.last_name}</td>
                  <td className="p-2 text-center">{user.email}</td>
                  <td className="p-2 text-center">{user.age}</td>
                  <td className="p-2 text-center">{user.gender}</td>
                  <td className="p-2 text-center font-semibold uppercase">{user.guest_type}</td>
                  <td className="p-2 text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageUsers