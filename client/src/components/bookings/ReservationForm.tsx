import { useState } from "react";

const ReservationForm = () => {
  const roomTypes = [
    "Deluxe Room",
    "Executive Room",
    "Junior Suite",
    "Presidential Suite",
    "Family Suite",
    "Penthouse Suite",
  ];
  const roomNumbers = [
    "101",
    "102",
    "103",
    "201",
    "202",
    "203",
    "301",
    "302",
    "303",
  ]; // example room numbers

  const [formData, setFormData] = useState({
    roomType: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Data:", formData);
    // You can send this data to the backend for processing
  };

  return (
    <div className="flex justify-center items-center bg-black/20 min-h-screen">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b-2 border-gray-200">
          <h1 className="text-2xl md:text-3xl text-gray-600 font-bold">
            Reservation Form
          </h1>
          <button className="text-white bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded-lg">
            Replan Booking
          </button>
        </div>

        {/* Form */}
        <form className="p-5" onSubmit={handleSubmit}>
          {/* Room Type & Room Number */}
          <div className="flex flex-col md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-10 mb-5">
            <div className="flex-1">
              <label htmlFor="roomType" className="font-semibold">
                Room Type
              </label>
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

            <div className="flex-1">
              <label htmlFor="roomNumber" className="font-semibold">
                Room Number
              </label>
              <select
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
              >
                <option value="">Select Room Number</option>
                {roomNumbers.map((num, idx) => (
                  <option key={idx} value={num}>
                    Room {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Check-in & Check-out */}
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

          {/* Submit Button */}
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

export default ReservationForm;
