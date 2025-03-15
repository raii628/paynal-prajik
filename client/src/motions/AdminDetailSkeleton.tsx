import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDetailSkeleton: FC = () => {
  return (
    <div className="flex space-x-3 items-center border-b border-b-gray-200 p-3">
      <div className="flex justify-center items-center rounded-full">
        <Skeleton circle height={50} width={50} />
      </div>
      <ul className="flex flex-col justify-center">
        <li className="text-gray-700 font-medium tracking-wide text-lg">
          <Skeleton width={130} />
        </li>
        <li className="relative flex items-center text-gray-600 font-medium tracking-wide text-normal">
          <Skeleton width={160} />
        </li>
      </ul>
    </div>
  );
};

export default AdminDetailSkeleton;
