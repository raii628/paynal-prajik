import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { fetchReservations } from "../../services/Booking";

const Reservation = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reservations'],
    queryFn: fetchReservations,
    retry: 2
  });
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reservations</div>;

  const filteredReservations = data.filter(reservation => {
    return (
      (filter === "all" || reservation.status === filter) &&
      (search === "" || reservation.guest_name.toLowerCase().includes(search.toLowerCase()))
    )
  })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Reservations</h1>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <input
          type="text"
          placeholder="Search guest..."
          className="p-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked_in">Checked In</option>
          <option value="checked_out">Checked Out</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Guest</th>
                <th className="border p-2">Room</th>
                <th className="border p-2">Check-in</th>
                <th className="border p-2">Check-out</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <motion.tr key={res.id} className="text-center hover:bg-gray-50" whileHover={{ scale: 1.02 }}>
                  <td className="border p-2">{res.guest_name}</td>
                  <td className="border p-2">{res.room_number}</td>
                  <td className="border p-2">{res.check_in_date}</td>
                  <td className="border p-2">{res.check_out_date}</td>
                  <td className="border p-2 capitalize text-blue-600">{res.status.replace("_", " ")}</td>
                  <td className="border p-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md">Cancel</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Reservation