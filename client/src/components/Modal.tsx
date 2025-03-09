import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  cancel: () => void;
  onConfirm: () => void;
  className?: string;
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
  className,
  confirmText,
  cancelText,
  isOpen,
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
            <div className="border-0 rounded-2xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex flex-col items-center justify-center p-8 border-b border-solid border-blueGray-200 rounded-t-2xl">
                <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  {title}
                </h3>
              </div>
              <div className="relative p-8 flex-auto">
                {description && (
                  <p className="my-4 text-md text-gray-600 leading-relaxed text-center">
                    {description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end p-6 rounded-b-2xl">
                <button
                  className="bg-white text-gray-700 border border-gray-300 font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={cancel}
                >
                  {cancelText}
                </button>
                {onConfirm && (
                  <button
                    className={className}
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
  );
};

export default Modal;
