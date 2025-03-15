import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-full p-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-10 h-full max-w-lg w-full shadow-lg"
      >
        <div className="flex flex-row items-center">
          {/* Icon Container */}
          <div className="mr-3">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              size="6x"
              className="text-red-600"
            />
          </div>
          {/* Text Container */}
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              An error has occurred!
            </h1>
            <p className="text-gray-700 mb-4">Please try again later.</p>
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors duration-300"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
