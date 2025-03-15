/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchReservations } from "../../services/Booking";
import DashboardSkeleton from "../../motions/DashboardSkeleton";
import Error from "../_ErrorBoundary";

const AreaReservations = () => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const { data, isLoading, error } = useQuery({
    queryKey: ['area_reservations'],
    queryFn: fetchReservations,
    retry: 2
  });

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <Error />

  const reservationsArray = Array.isArray(data) ? data : [];
  const filteredReservations = reservationsArray.filter((reservation: any) => {
    return (
      (filter === "all" || reservation.status === filter) &&
      (search === "" || reservation.guest_name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Area Reservations</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Reservation
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Guest Name"
          className="p-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Res ID</th>
              <th className="border p-2 text-left">Guest Name</th>
              <th className="border p-2 text-left">Area Name</th>
              <th className="border p-2 text-left">Start Time</th>
              <th className="border p-2 text-left">End Time</th>
              <th className="border p-2 text-left">Price ($)</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res: any) => (
              <tr key={res.id} className="hover:bg-gray-50">
                <td className="border p-2">{res.id}</td>
                <td className="border p-2">{res.guest_name}</td>
                <td className="border p-2">{res.area_name}</td>
                <td className="border p-2">{res.start_time}</td>
                <td className="border p-2">{res.end_time}</td>
                <td className="border p-2">${res.total_price}</td>
                <td className="border p-2 capitalize text-blue-600">{res.status}</td>
                <td className="border p-2 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AreaReservations