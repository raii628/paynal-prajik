import { useState } from "react";

const ReservationRoomForm = () => {
  const roomTypes = [
    "Single Room",
    "Double Room",
    "Twin Room",
    "Suite Room",
    "Family Room",
    "Deluxe Room",
  ];

  // Room mapping based on room type
  const roomMapping = {
    "Single Room": ["101", "102", "103", "104", "105", "106"],
    "Double Room": ["201", "202", "203", "204", "205", "206"],
    "Twin Room": ["301", "302", "303", "304", "305", "306"],
    "Suite Room": ["401", "402", "403", "404", "405", "406"],
    "Family Room": ["501", "502", "503", "504", "505", "506"],
    "Deluxe Room": ["601", "602", "603", "604", "605", "606"],
  };

  const [formData, setFormData] = useState({
    roomType: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
    adults: "",
    children: "",
    specialRequest: "",
  });

  // Handle form reset
  const handleReset = () => {
    setFormData({
      roomType: "",
      roomNumber: "",
      checkIn: "",
      checkOut: "",
      adults: "",
      children: "",
      specialRequest: "",
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset room number when room type changes
      ...(name === "roomType" && { roomNumber: "" }),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Data:", formData);
    // You can send this data to the backend for processing
  };

  const availableRoomNumbers = roomMapping[formData.roomType] || [];

  return (
    <div className="flex justify-center items-center bg-black/20 min-h-screen">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b-2 border-gray-200">
          <h1 className="text-2xl md:text-3xl text-gray-600 font-bold">
            Reservation Form
          </h1>
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded-lg"
            onClick={handleReset}
          >
            Replan Booking
          </button>
        </div>

        <form className="p-5" onSubmit={handleSubmit}>
          {/* Room Type */}
          <div className="flex flex-col md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-10 mb-5">
            <div className="flex-1">
              <label className="font-semibold">Room Type</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtered Room Number */}
            <div className="flex-1">
              <label className="font-semibold">Room Number</label>
              <select
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
                disabled={!formData.roomType}
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
              >
                <option value="">Select Room Number</option>
                {availableRoomNumbers.map((num, idx) => (
                  <option key={idx} value={num}>
                    Room {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-10 mb-5">
            <div className="flex-1">
              <label htmlFor="checkIn" className="font-semibold">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="checkOut" className="font-semibold">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-10 mb-5">
            <div className="flex-1">
              <label htmlFor="adults" className="font-semibold">
                Adults
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="1"
                placeholder="Number of Adults"
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="children" className="font-semibold">
                Children
              </label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
                placeholder="Number of Children"
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
              />
            </div>
          </div>

          {/* Special Request */}
          <div className="px-5 mb-5">
            <label htmlFor="specialRequest" className="font-semibold">
              Special Requests
            </label>
            <textarea
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              placeholder="Enter any special requests here..."
              className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
              rows="3"
            ></textarea>
          </div>

          <div className="px-5 py-3 text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold"
            >
              Reserve Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationRoomForm;
