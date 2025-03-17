/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllRooms } from '../../services/Room';

const ManageRooms = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['rooms'], 
    queryFn: fetchAllRooms,
  });

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>Error fetching rooms.</div>;
  }

  const roomsArray = Array.isArray(data?.data) ? data.data : [];

  const filteredRooms = roomsArray.filter((room: any) => {
    const matchesSearch =
      room.room_number.includes(search) ||
      room.room_type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : room.status === statusFilter;
    const matchesType = typeFilter === 'all' ? true : room.room_type.toString() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold mb-4 md:mb-0">Manage Rooms</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Room
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Room Number or Type"
          className="p-2 border rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Room Types</option>
          <option value="Standard Room">Standard Room</option>
          <option value="Deluxe Room">Deluxe Room</option>
          <option value="Executive Suite">Executive Suite</option>
          <option value="Presidential Suite">Presidential Suite</option>
        </select>
      </div>

      {/* Rooms Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Room Number</th>
              <th className="border p-2 text-left">Room Type</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Amenities</th>
              <th className="border p-2 text-left">Price ($)</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room: any) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="border p-2">{room.room_number}</td>
                <td className="border p-2">{room.room_type}</td>
                <td className="border p-2 capitalize">{room.status}</td>
                <td className="border p-2">{room.amenities ? room.amenities.join(", ") : 'N/A'}</td>
                <td className="border p-2">$ {parseFloat(room.price).toFixed(2)}</td>
                <td className="border p-2 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        <button className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300">
          Previous
        </button>
        <span className="px-3 py-1 bg-gray-100">1</span>
        <button className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageRooms;
