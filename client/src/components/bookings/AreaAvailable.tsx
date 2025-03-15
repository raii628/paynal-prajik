const AreaAvailable = ({ image, title, capacity, priceRange, available }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
      {/* Area Image */}
      <img src={image} alt={title} className="h-44 w-full object-cover" />

      {/* Area Details */}
      <div className="p-4 space-y-3">
        {/* Area Title */}
        <h2 className="text-lg font-bold text-gray-800 font-playfair">
          {title}
        </h2>

        {/* Capacity */}
        <div className="flex justify-between text-sm text-gray-600 font-montserrat">
          <span className="flex items-center gap-1">
            <i className="fas fa-users"></i> {capacity} pax
          </span>
        </div>

        {/* Availability */}
        <div
          className={`flex items-center gap-2 ${
            available ? "text-green-600" : "text-red-500"
          } font-semibold text-sm font-montserrat`}
        >
          <i
            className={`fas ${
              available ? "fa-check-circle" : "fa-times-circle"
            }`}
          ></i>
          {available ? "Available" : "Not Available"}
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-2">
          {/* Price */}
          <div className="text-lg font-bold text-gray-900 font-montserrat">
            {priceRange}
          </div>

          {/* Reserve Now Button */}
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold font-montserrat ${
              available
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!available}
          >
            {available ? "Reserve Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaAvailable;
