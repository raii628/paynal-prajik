import emerald_hall from "../../assets/emerald_hall.webp";
import grand_ballroom from "../../assets/grand_ballroom.avif";
import ruby_lounge from "../../assets/ruby_lounge.jpg";
import conference_hall from "../../assets/conference_hall.webp";
import rooftop_garden from "../../assets/rooftop_garden.jpg";
import { useState } from "react";
import { motion } from "framer-motion";
import VenueCard from "./VenueCard";

const VenueList = () => {
  const areas = [
    {
      title: "Grand Ballroom",
      location: "7th Floor - Grand Ballroom",
      priceRange: "₱100,000",
      capacity: 300,
      description:
        "A luxurious venue for weddings, corporate events, and celebrations. Features high ceilings, chandeliers, dance floor, and modern lighting and sound systems for unforgettable experiences.",
      image: grand_ballroom,
      isFeatured: true,
    },
    {
      title: "Emerald Hall",
      location: "7th Floor - Emerald Hall",
      priceRange: "₱50,000",
      capacity: 100,
      description:
        "An elegant venue ideal for weddings, receptions, and corporate events. Emerald Hall features stunning chandeliers, a bar and lounge area, and a spacious dance floor — perfect for any memorable celebration.",
      image: emerald_hall,
      isFeatured: false,
    },

    {
      title: "Ruby Hall",
      location: "7th Floor - Ruby Hall",
      priceRange: "₱50,000",
      capacity: 100,
      description:
        "A modern and stylish lounge perfect for private parties, cocktails, and corporate events. Ruby Hall offers cozy seating, vibrant LED cube tables, and ambient lighting to create a fun and relaxed atmosphere.",
      image: ruby_lounge,
      isFeatured: false,
    },
    {
      title: "Conference Room",
      location: "6th Floor - Conference Room",
      priceRange: "₱30,000",
      capacity: 30,
      description:
        "A fully-equipped conference room ideal for meetings, seminars, and corporate events. Designed with modern interiors, a large boardroom table, and ergonomic chairs for a professional and productive environment.",
      image: conference_hall,
      isFeatured: false,
    },

    {
      title: "Rooftop Garden",
      location: "8th Floor - Rooftop Garden",
      priceRange: "₱80,000",
      capacity: 80,
      description:
        "An open-air venue with stunning city views, perfect for weddings, private parties, and events. Features elegant lighting, lush greenery, cozy seating, and space for dining and entertainment.",
      image: rooftop_garden,
      isFeatured: false,
    },
  ];

  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto p-6"
      >
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Select Your Perfect Event Space
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => setSelectedArea(selectedArea === index ? null : index)}
            >
              <VenueCard {...area} />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default VenueList;
