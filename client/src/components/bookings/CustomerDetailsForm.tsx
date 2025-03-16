import { useState } from "react";

const CustomerDetailsForm = () => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    people: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    specialRequest: "",
  });

  // Handle form reset
  const handleReset = () => {
    setFormData({
      checkIn: "",
      checkOut: "",
      people: 1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      specialRequest: "",
    });
  };

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
    console.log("Booking & Customer Details:", formData);
    // Add backend API call here if needed
  };

  return (
    <div className="w-full font-montserrat">
      <div className="bg-white overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl md:text-2xl font-bold text-gray-700 font-playfair">
            Reservation & Customer Details
          </h1>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm"
          >
            Reset Form
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* --- Reservation Section --- */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Reservation Details
            </h2>

            {/* Check-in and Check-out */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-semibold">Check-in</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold">Check-out</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
            </div>

            {/* People */}
            <div className="space-y-2">
              <label className="font-semibold">People</label>
              <input
                type="number"
                name="people"
                min="1"
                value={formData.people}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
                placeholder="Number of Guests"
                required
              />
            </div>
          </div>

          {/* --- Customer Section --- */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Customer Details
            </h2>

            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold">Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
            </div>

            {/* Special Request */}
            <div className="space-y-2">
              <label className="font-semibold">
                Special Request (Optional)
              </label>
              <textarea
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                placeholder="Any special requests?"
                className="w-full border rounded-md p-3"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* --- Submit Button --- */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
