const RoomAvailable = ({
  image,
  title,
  bedType,
  capacity,
  price,
  availableRooms,
}) => {
  const soldOut = availableRooms <= 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
      {/* Room Image */}
      <img src={image} alt={title} className="h-44 w-full object-cover" />

      {/* Room Details */}
      <div className="p-4 space-y-3">
        {/* Room Title */}
        <h2 className="text-lg font-bold text-gray-800 font-playfair">
          {title}
        </h2>

        {/* Bed Type and Capacity */}
        <div className="flex justify-between text-sm text-gray-600 font-montserrat">
          <span className="flex items-center gap-1">
            <i className="fas fa-bed"></i> {bedType}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-users"></i> {capacity}{" "}
            {capacity > 1 ? "pax" : "pax"}
          </span>
        </div>

        {/* Availability (Separate Row) */}
        <div
          className={`flex items-center gap-2 ${
            soldOut ? "text-red-500" : "text-green-600"
          } font-semibold text-sm font-montserrat`}
        >
          <i
            className={`fas ${soldOut ? "fa-times-circle" : "fa-check-circle"}`}
          ></i>
          {soldOut
            ? "Sold Out"
            : `${availableRooms} room${
                availableRooms > 1 ? "s" : ""
              } available`}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-2">
          {/* Price */}
          <div className="text-lg font-bold text-gray-900 font-montserrat">
            ₱{price.toLocaleString()}
          </div>

          {/* Book Now Button */}
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold font-montserrat ${
              soldOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={soldOut}
          >
            {soldOut ? "Not Available" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailable;
