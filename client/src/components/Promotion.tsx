import resort from "../assets/resort.jpg";
const Promotion: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center my-5 bg-gray-50 p-8 rounded-2xl">
        {/* Left Column: Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={resort}
            alt="Luxury Hotel Experience"
            className="rounded-lg shadow-md w-full md:w-[90%]"
          />
        </div>

        {/* Right Column: Text */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <div className="py-10">
            <h2 className="text-9xl text-gray-900 mb-10 font-playfair font-medium">
              Unparalleled luxury, timeless comfort
            </h2>
            <p className="text-gray-500 text-lg font-montserrat font-medium">
              Elevate the guest experience with a seamless and sophisticated
              hotel management solution. Designed for premium resorts and luxury
              accommodations, it streamlines operations while delivering
              unparalleled comfort, efficiency, and elegance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
