import RoomCard from "./RoomCard";
import deluxe_twin from "../../assets/deluxe_twin.jpg";
import deluxe_double from "../../assets/deluxe_double.jpg";
import deluxe_single from "../../assets/deluxe_single.webp";
import executive_king from "../../assets/executive_king.webp";
import executive_double from "../../assets/executive_double.avif";
import president_king from "../../assets/president_king.jpg";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RoomList = () => {
  const rooms = [
    {
      image: deluxe_single,
      title: "Deluxe Room (Single Bed)",
      description:
        "A cozy deluxe room featuring free toiletries and bathrobes, includes a private bathroom with a walk-in shower, a bath, and a bidet. Enjoy a flat-screen TV, private entrance, soundproof walls, a minibar, and garden views.",
      bedType: "1 single bed",
      capacity: 1,
      price: 4000,
    },
    {
      image: deluxe_double,
      title: "Deluxe Room (Double Bed)",
      description:
        "Spacious deluxe room with elegant design, includes a private bathroom with a walk-in shower, bath, and bidet. Complete with a double bed, flat-screen TV, private entrance, soundproof walls, and a minibar.",
      bedType: "1 double bed",
      capacity: 2,
      price: 5000,
    },
    {
      image: deluxe_twin,
      title: "Deluxe Room (Twin Bed)",
      description:
        "Modern deluxe twin room perfect for two guests. It includes a private bathroom with a walk-in shower, bath, and bidet. Features 2 single beds, a flat-screen TV, a minibar, and soundproof walls.",
      bedType: "2 single beds",
      capacity: 2,
      price: 5500,
    },
    {
      image: executive_king,
      title: "Executive Suite (King Bed)",
      description:
        "Luxurious executive suite featuring a king-size bed, private bathroom with shower and bath, a spacious lounge area, minibar, flat-screen TV, private entrance, and soundproof walls. Perfect for a premium stay experience.",
      bedType: "1 king bed",
      capacity: 2,
      price: 12000,
    },
    {
      image: executive_double,
      title: "Executive Suite (Double Bed)",
      description:
        "Elegant executive suite with a double bed, private bathroom with a walk-in shower and bath, minibar, flat-screen TV, and private entrance. Ideal for a comfortable and relaxing stay.",
      bedType: "1 double bed",
      capacity: 2,
      price: 11000,
    },
    {
      image: president_king,
      title: "Presidential Suite (King Bed)",
      description:
        "Our most luxurious suite featuring a king-size bed, expansive living space, private luxury bathroom with jacuzzi, minibar, flat-screen TV, private entrance, and VIP amenities. Designed for elite guests seeking ultimate comfort.",
      bedType: "1 king bed",
      capacity: 2,
      price: 20000,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 p-6">
      {rooms.map((room, index) => (
        <RoomCard key={index} {...room} />
      ))}
    </div>
  );
};

export default RoomList;
