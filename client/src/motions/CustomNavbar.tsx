import { FC } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavBtn {
    to: string;
    children: React.ReactNode;
    className?: string;
}

const SlotNavButton: FC<NavBtn> = ({ to, children, className }) => {
    return (
        <li className={`relative inline-block font-black ${className} transition-all duration-300`}>
            <Link to={to}>
                <motion.div
                    className="relative overflow-hidden inline-block"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                >
                    <motion.div
                        className="block"
                        variants={{
                            rest: { y: "0%" },
                            hover: { y: "-100%" },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                    <motion.div
                        className="block absolute inset-0"
                        variants={{
                            rest: { y: "100%" },
                            hover: { y: "0%" },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </Link>
        </li>
    );
};

export default SlotNavButton;