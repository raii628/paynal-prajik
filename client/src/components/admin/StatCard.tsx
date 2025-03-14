import { FC } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
}

const StatCard: FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
    )
}

export default StatCard