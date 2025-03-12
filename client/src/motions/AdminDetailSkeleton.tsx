import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDetailSkeleton: FC = () => {
  return (
    <div className="flex space-x-3 items-center border-b border-b-gray-200 p-5">
      <div className="flex justify-center items-center rounded-full bg-violet-400 w-18 h-18">
        <Skeleton circle height={72} width={72} />
      </div>
      <ul className="flex flex-col justify-center">
        <li className="text-gray-700 font-medium tracking-wide text-xl">
          <Skeleton width={150} />
        </li>
        <li className="relative flex items-center text-gray-600 font-medium tracking-wide text-normal">
          <Skeleton width={200} />
        </li>
      </ul>
    </div>
  );
};

export default AdminDetailSkeleton;
