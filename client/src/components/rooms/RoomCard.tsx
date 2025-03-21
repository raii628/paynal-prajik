import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RoomCardProps {
  id: string | number;
  name: string;
  image: string;
  title: string;
  description: string;
  admission: string;
  bedType: string;
  capacity: number;
  price: number;
}

const RoomCard: FC<RoomCardProps> = ({ id, name, image, title, description, bedType, capacity, price, admission }) => {
  const navigate = useNavigate();

  return (
    <div className=" rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-xl font-bold mb-2 font-playfair">{name}</h1>
          <h3 className="text-sm font-semibold mb-2 font-playfair">{title} | {admission.toUpperCase()}</h3>
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
          <div className="flex gap-3">
            <button
              className="bg-blue-600 text-sm text-white px-4 py-2 rounded-lg font-montserrat hover:bg-blue-700 transition"
              onClick={() => navigate(`/rooms/${id}`)}
            >
              View Details
            </button>

            <Link to="/availability">
              <button className="bg-blue-600 text-sm text-white px-4 py-2 rounded-lg font-montserrat hover:bg-blue-700 transition">
                Reserve Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
