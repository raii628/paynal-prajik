import { useState, useRef, useEffect, FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
}

interface CustomDropdownProps {
    options: DropdownItem[];
    position?: "top" | "left" | "right" | "bottom";
    children: React.ReactNode;
}

const Dropdown: FC<CustomDropdownProps> = ({
    options,
    position = "bottom",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    let dropdownPositionClasses = "";
    switch (position) {
        case "top":
            dropdownPositionClasses = "absolute left-0 bottom-full mb-2";
            break;
        case "left":
            dropdownPositionClasses = "absolute right-full mr-2 top-0";
            break;
        case "right":
            dropdownPositionClasses = "absolute left-full ml-2 top-0";
            break;
        case "bottom":
        default:
            dropdownPositionClasses = "absolute right-2 mt-2";
            break;
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
                {children}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${dropdownPositionClasses} w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="py-1">
                            {options.map((item, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        item.onClick();
                                    }}
                                    className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
