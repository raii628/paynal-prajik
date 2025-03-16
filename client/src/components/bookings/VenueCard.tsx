import { Link } from "react-router-dom";

const VenueCard = ({
  title,
  location,
  priceRange,
  capacity,
  description,
  image,
  isFeatured,
  includes, // ✅ New prop added here
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-80 object-cover" />

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Title & Location */}
          <h3 className="text-xl font-semibold mb-2 font-playfair">{title}</h3>
          <p className="text-gray-600 text-sm mb-2 font-montserrat">
            {location}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 font-montserrat">
            {description}
          </p>

          {/* Includes */}
          {includes && includes.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-1 font-montserrat">
                Includes:
              </h4>
              <ul className="list-disc list-inside text-gray-600 text-sm font-montserrat space-y-1">
                {includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Capacity */}
          <div className="flex justify-between text-sm text-gray-700">
            <span className="font-medium font-montserrat">
              <i className="fa fa-users"></i> {capacity} pax
            </span>
            {isFeatured && (
              <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-montserrat">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg font-montserrat">
            {priceRange}
          </span>
          <Link to="/availability">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-montserrat hover:bg-blue-700 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
