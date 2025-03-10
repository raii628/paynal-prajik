import { FC } from "react"
import { motion } from "framer-motion"

interface NotificationProps {
  icon?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const notificationVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

const typeStyles: Record<string, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  warning: 'bg-yellow-500 text-gray-800'
};

const Notification: FC<NotificationProps> = ({ icon, message, type, onClose }) => {
  return (
    <motion.div
      className={`fixed top-4 right-4 w-full max-w-sm p-4 rounded-lg shadow-lg ${typeStyles[type || 'info']}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={notificationVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        {icon && (
          <div className="mr-2 flex-shrink-0">
            <i className={`${icon} text-xl`}></i>
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-xl leading-none focus:outline-none"
            aria-label="Close notification"
          >
            &times;
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default Notification