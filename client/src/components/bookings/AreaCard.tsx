import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

interface AreaCardProps {
  title: string;
  location: string;
  priceRange: string;
  capacity: number;
  description: string;
  image: string;
  isFeatured: boolean;
}

const MAX_DESCRIPTION_LENGTH = 120;

const AreaCard: FC<AreaCardProps> = ({
  title,
  location,
  priceRange,
  capacity,
  description,
  image,
  isFeatured,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const trimmedDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !isExpanded
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white flex flex-col transition-all duration-300 ease-in-out">
      <motion.img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          {/* Title + Featured Tag */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            {isFeatured && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                FEATURED
              </span>
            )}
          </div>

          <p className="text-gray-500 text-sm mb-2">{location}</p>

          <p className="text-gray-600 text-sm">
            {trimmedDescription}
            {description.length > MAX_DESCRIPTION_LENGTH && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 ml-1 hover:underline"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </p>

          {/* Capacity Section */}
          <div className="flex justify-between items-center text-sm mt-4 text-gray-700">
            <span className="font-medium flex items-center gap-1">
              <FontAwesomeIcon icon={faUsers} className="text-blue-500" /> {capacity} pax
            </span>
          </div>
        </div>

        {/* Price & Booking */}
        <div className="flex justify-between items-center mt-6">
          <span className="font-bold text-lg">{priceRange}</span>
          <Link to="/booking">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
