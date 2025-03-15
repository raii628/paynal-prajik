import AreaAvailable from "./AreaAvailable";
import emerald_hall from "../../assets/emerald_hall.webp";
import grand_ballroom from "../../assets/grand_ballroom.avif";
import ruby_lounge from "../../assets/ruby_lounge.jpg";
import conference_hall from "../../assets/conference_hall.webp";
import rooftop_garden from "../../assets/rooftop_garden.jpg";

const AreaAvailableList = () => {
  const areas = [
    {
      image: emerald_hall,
      title: "Emerald Hall",
      capacity: 120,
      priceRange: "₱70,000",
      available: true, // Available
    },
    {
      image: grand_ballroom,
      title: "Grand Ballroom",
      capacity: 150,
      priceRange: "₱100,000",
      available: false, // Not available
    },
    {
      image: ruby_lounge,
      title: "Ruby Lounge",
      capacity: 60,
      priceRange: "₱50,000",
      available: true, // Available
    },
    {
      image: conference_hall,
      title: "Conference Hall",
      capacity: 100,
      priceRange: "₱60,000",
      available: false, // Not available
    },
    {
      image: rooftop_garden,
      title: "Rooftop Garden",
      capacity: 80,
      priceRange: "₱80,000",
      available: true, // Available
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
      {areas.map((area, index) => (
        <AreaAvailable key={index} {...area} />
      ))}
    </div>
  );
};

export default AreaAvailableList;
