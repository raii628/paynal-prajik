import { useState } from "react";

const CustomerDetailsForm = () => {
  const [formData, setFormData] = useState({
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
    console.log("Customer Details:", formData);
    // You can send this data to the backend for processing
  };

  return (
    <div className="flex justify-center items-center bg-black/20 min-h-screen">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b-2 border-gray-200">
          <h1 className="text-2xl md:text-3xl text-gray-600 font-bold">
            Customer Details:
          </h1>
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded-lg"
            onClick={handleReset}
          >
            Reset Form
          </button>
        </div>

        <form className="p-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-10 mb-5">
            <div className="flex-1">
              <label className="font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-10 mb-5">
            <div className="flex-1">
              <label className="font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold">Contact Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="px-5 mb-5">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full border-2 border-gray-300 p-3 rounded-md mt-1"
              required
            />
          </div>

          {/* Submit */}
          <div className="px-5 py-3 text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
