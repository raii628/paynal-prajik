import { FC } from "react";
import { Link } from "react-router-dom";

interface RoomCardProps {
  image: string;
  title: string;
  description: string;
  bedType: string;
  capacity: number;
  price: number;
}

const RoomCard: FC<RoomCardProps> = ({ image, title, description, bedType, capacity, price }) => {
  return (
    <div className=" rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold mb-2 font-playfair">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 font-montserrat">
            {description}
          </p>
          <div className="flex justify-between text-sm text-gray-700">
            <div>
              <span className="font-medium font-montserrat">
                <i className="fa fa-bed"></i> {bedType}
              </span>
            </div>
            <div>
              <span className="font-medium font-montserrat">
                <i className="fa fa-users"></i> {capacity} pax
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg font-montserrat">
            ₱{price.toLocaleString()}
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

export default RoomCard;
