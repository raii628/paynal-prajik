import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "../Alert"; 

const RoomAvailabilityCalendar = () => {
  const navigate = useNavigate();
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCheckAvailability = () => {
    if (!arrivalDate || !departureDate) {
      setAlertInfo({
        message: "Please provide both arrival and departure dates. Please try again",
        type: "error",
      });
      return;
    }
    if (departureDate <= arrivalDate) {
      setAlertInfo({
        message: "Departure date must be greater than arrival date. Please try again",
        type: "error",
      });
      return;
    }

    // Clear any existing alert and proceed
    setAlertInfo(null);
    const arrivalStr = formatLocalDate(arrivalDate);
    const departureStr = formatLocalDate(departureDate);

    navigate(`/availability?arrival=${arrivalStr}&departure=${departureStr}`);
  };

  return (
    <div className="relative">
      {/* Render custom alert if there's any error */}
      {alertInfo && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="bg-[#ffffffe6] px-5 mb-10 sm:mb-15 w-full shadow-md drop-shadow-md inset-shadow-md">
        <div className="py-3 font-montserrat">
          <div className="flex flex-col justify-around gap-3">
            {/* Header - Hidden on small screens */}
            <div className="hidden sm:flex justify-between items-center">
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
                <DatePicker
                  id="arrival"
                  selected={arrivalDate}
                  onChange={(date) => setArrivalDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border-b-2 outline-0 italic cursor-pointer"
                  placeholderText="Select arrival date"
                />
              </div>

              {/* Departure Date */}
              <div className="flex flex-col min-w-[150px] flex-grow bg-white px-4 py-2">
                <label htmlFor="departure" className="text-xs tracking-tight mb-1">
                  Departure Date
                </label>
                <DatePicker
                  id="departure"
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border-b-2 outline-0 italic cursor-pointer"
                  placeholderText="Select departure date"
                />
              </div>

              {/* Search Button */}
              <div className="flex flex-col min-w-[150px] flex-grow">
                <button
                  onClick={handleCheckAvailability}
                  className="p-3 py-5 flex-1 bg-blue-600 font-medium transition duration-300 cursor-pointer text-sm text-white w-full"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;
