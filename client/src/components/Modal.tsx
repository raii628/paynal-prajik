import { FC, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  cancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({
  icon,
  title,
  description,
  cancel,
  onConfirm,
  confirmText,
  cancelText,
  isOpen
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none bg-black/65"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-auto max-w-md mx-auto my-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="border-0 rounded-2xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none"> {/* Increased rounded-2xl and shadow-xl */}
              {/* Header - Icon + Title (Centered) */}
              <div className="flex flex-col items-center justify-center p-8 border-b border-solid border-blueGray-200 rounded-t-2xl"> {/* Centered header content, rounded-t-2xl */}
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 text-center">{title}</h3> {/* Centered title */}
              </div>
              {/* Body - Description / Question (Centered) */}
              <div className="relative p-8 flex-auto"> {/* Increased body padding */}
                {description && <p className="my-4 text-md text-gray-600 leading-relaxed text-center">{description}</p>} {/* Centered description */}
              </div>
              {/* Footer - Buttons (Side-by-side) */}
              <div className="flex items-center justify-end p-6 rounded-b-2xl"> {/* Rounded bottom corners */}
                <button
                  className="bg-white text-gray-700 border border-gray-300 font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" // "Cancel" button style
                  type="button"
                  onClick={cancel}
                >
                  {cancelText}
                </button>
                {onConfirm && (
                  <button
                    className="bg-purple-600 text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" // "Confirm" button style (Purple)
                    type="button"
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal