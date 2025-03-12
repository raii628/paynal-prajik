import { useState } from "react";

const RoomAvailabilityCalendar = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  const defaultArrival = `${currentYear}-03-11`;

  const lastDayOfYear = `${currentYear}-12-31`;

  const [arrivalDate, setArrivalDate] = useState(defaultArrival);
  const [departureDate, setDepartureDate] = useState(lastDayOfYear);

  return (
    <div className="bg-black/45 pt-6 px-5 mb-3">
      <div className="text-center w-full max-w-6xl px-5">
        {/* <div className="border-1 border-white flex-1"></div> */}
        <h1 className="text-white text-3xl font-light mx-10 whitespace-nowrap">
          Reservations
        </h1>
        {/* <div className="border-1 border-white flex-1"></div> */}
      </div>
      <div className="px-8 py-6 pb-10 ">
        <div className="flex flex-row justify-between items-center gap-10 ">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="arrival"
              className="text-white/80 text-lg font-thin tracking-tight mb-2"
            >
              Arrival Date
            </label>
            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="border-b-2 border-white outline-0 text-white italic cursor-pointer"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="departure"
              className="text-white/80 text-lg font-thin tracking-tight mb-2 "
            >
              Departure Date
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="border-b-2 border-white outline-0 text-white italic cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
            <button className="p-3 font-light text-white bg-transparent border-1 border-white hover:border-violet-700 hover:text-violet-700 transition duration-300 cursor-pointer rounded-sm text-sm">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;
