import React from "react";

interface BookingCardProps {
  roomType: string;
  imageUrl: string;
  dates: string;
  guests: number;
  price: number;
  status: "pending" | "booked" | "checkedOut" | "canceled";
}

const BookingCard: React.FC<BookingCardProps> = ({
  roomType,
  imageUrl,
  dates,
  guests,
  price,
  status,
}) => {
  const statusStyles: Record<string, string> = {
    pending: "bg-yellow-500 text-white",
    booked: "bg-green-500 text-white",
    checkedOut: "bg-gray-500 text-white",
    canceled: "bg-red-500 text-white",
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 flex gap-6 mb-6">
      {/* Room Image */}
      <div className="w-56 h-36 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200">
        <img
          src={imageUrl}
          alt={roomType}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Booking Details */}
      <div className="flex-grow flex flex-col justify-between">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">{dates}</h2>
          <p className="text-gray-600 flex items-center">
            <span className="mr-2">👥</span> Persons: {guests}
          </p>
          <p className="text-blue-600 font-semibold text-lg">
            PRICE: {price.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">
            A Deluxe Room offers a spacious and elegant setting with modern
            amenities, featuring a comfortable king-sized bed, a luxurious
            en-suite bathroom, and stunning views.
          </p>
        </div>

        {/* Footer: Status + Buttons */}
        <div className="flex items-center justify-between mt-4">
          {/* Status Badge */}
          <div
            className={`px-3 py-1 text-sm rounded-lg ${statusStyles[status]}`}
          >
            {status.toUpperCase()}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {status === "booked" && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Check Out
              </button>
            )}
            {(status === "pending" || status === "booked") && (
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
