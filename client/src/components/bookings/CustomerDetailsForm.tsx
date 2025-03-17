import { useState, useEffect } from "react";

const CustomerDetailsForm = () => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    people: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequest: "",
    payment: 0,
  });

  const [addons, setAddons] = useState({
    breakfast: false,
    extraBed: false,
  });

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  const roomPricePerNight = 4000; // Example base room price
  const addonPrices = {
    breakfast: 200,
    extraBed: 500,
  };

  // Calculate nights and total price whenever formData or add-ons change
  useEffect(() => {
    calculateTotal();
  }, [formData.checkIn, formData.checkOut, addons]);

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
      specialRequest: "",
      payment: 0,
    });
    setAddons({
      breakfast: false,
      extraBed: false,
    });
    setSummaryOpen(false);
    setTotalPrice(0);
    setNights(0);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle add-ons toggle
  const handleAddonChange = (e) => {
    const { name, checked } = e.target;
    setAddons((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Booking & Customer Details:",
      formData,
      "Add-ons:",
      addons,
      "Total Price:",
      totalPrice
    );
  };

  // Calculate total price based on selections
  const calculateTotal = () => {
    const date1 = new Date(formData.checkIn);
    const date2 = new Date(formData.checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setNights(diffDays);

    let total = diffDays * roomPricePerNight;

    Object.keys(addons).forEach((addon) => {
      if (addons[addon]) total += addonPrices[addon] * diffDays;
    });

    setTotalPrice(total);
  };

  const remainingBalance = totalPrice - Number(formData.payment);

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
          {/* Reservation Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Reservation Details
            </h2>

            {/* Dates */}
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

          {/* Add-ons Section */}
          {/* <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Add-ons</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={addons.breakfast}
                  onChange={handleAddonChange}
                  className="mr-2"
                />
                Breakfast (₱300 per night)
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="extraBed"
                  checked={addons.extraBed}
                  onChange={handleAddonChange}
                  className="mr-2"
                />
                Extra Bed (₱500 per night)
              </label>
            </div>
          </div> */}

          {/* Customer Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Customer Details
            </h2>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-3 rounded-md"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-3 rounded-md"
                required
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-3 rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact Number"
                className="border p-3 rounded-md"
                required
              />
            </div>

            {/* Special Request */}
            <textarea
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              placeholder="Special Request (Optional)"
              rows="3"
              className="w-full border p-3 rounded-md"
            ></textarea>
          </div>

          {/* Payment Section */}
          <div className="space-y-2">
            <label className="font-semibold">Down Payment / Paid (₱)</label>
            <input
              type="number"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              min="0"
              className="w-full border rounded-md p-3"
            />
          </div>

          {/* Summary Section */}
          <div>
            <button
              type="button"
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="text-blue-600 underline"
            >
              {summaryOpen ? "Hide Summary" : "Show Summary & Total"}
            </button>
            {summaryOpen && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md">
                <p>
                  <strong>Nights:</strong> {nights}
                </p>
                <p>
                  <strong>Total Price:</strong> ₱{totalPrice.toLocaleString()}
                </p>
                <p>
                  <strong>Remaining Balance:</strong> ₱
                  {remainingBalance.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
