import { useState } from "react";

const RoomAvailabilityCalendar = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  const defaultArrival = `${currentYear}-03-11`;
  const lastDayOfYear = `${currentYear}-12-31`;

  const [arrivalDate, setArrivalDate] = useState(defaultArrival);
  const [departureDate, setDepartureDate] = useState(lastDayOfYear);

  return (
    <div className="bg-[#ffffffe6] px-5 mb-6 sm:mb-15 w-full">
      <div className="py-3 font-montserrat">
        <div className="flex flex-col justify-around gap-3">
          {/* Header - Hidden on small screens */}
          <div className="hidden lg:flex justify-between items-center">
            <h1 className="text-sm font-montserrat font-medium text-gray-500">
              <i className="fas fa-calendar-check text-blue-500 text-lg mr-3"></i>
              Tell us when — your perfect stay awaits you.
            </h1>
            <h1 className="text-sm font-montserrat font-medium">
              Find out more &gt;
            </h1>
          </div>

          {/* Form Section */}
          <div className="flex flex-wrap justify-center items-center gap-3 w-full">
            {/* Arrival Date */}
            <div className="flex flex-col min-w-[150px] flex-grow bg-white px-4 py-2">
              <label htmlFor="arrival" className="text-xs tracking-tight mb-1">
                Arrival Date
              </label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="border-b-2 outline-0 italic cursor-pointer"
              />
            </div>

            {/* Departure Date */}
            <div className="flex flex-col min-w-[150px] flex-grow bg-white px-4 py-2">
              <label
                htmlFor="departure"
                className="text-xs tracking-tight mb-1"
              >
                Departure Date
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="border-b-2 outline-0 italic cursor-pointer"
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col min-w-[150px] flex-grow">
              <button className="p-3 py-5 flex-1 bg-blue-600 font-medium transition duration-300 cursor-pointer text-sm text-white w-full">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;
