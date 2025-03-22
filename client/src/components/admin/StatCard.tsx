import { FC } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    borderColor: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, borderColor }) => {
    return (
        <div className={`bg-white shadow-md rounded-xl p-4 m-1 flex flex-row items-center border-l-8 ${borderColor}`}>
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <p className='text-3xl font-black ml-auto'>{value}</p>
        </div>
    );
};

export default StatCard;
