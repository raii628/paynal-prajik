import Navbar from "./Navbar";
import RoomAvailabilityCalendar from "../components/rooms/RoomAvailabilityCalendar";

const BookHero = () => {
  return (
    <>
      <div className="flex justify-center items-end h-[45vh] bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center w-full pt-6 sm:pt-15 mx-10">
          <div className="lg:w-11/12 xl:w-10/12 2xl:w-9/12">
            <RoomAvailabilityCalendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookHero;
