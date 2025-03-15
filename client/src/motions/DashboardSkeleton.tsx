import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const DashboardSkeleton = () => {
    return (
        <div className="p-6 animate-pulse">
            <h1 className="text-3xl font-semibold mb-6">
                <Skeleton width={250} height={30} />
            </h1>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="p-4 bg-white shadow rounded-lg">
                        <Skeleton height={20} width={150} />
                        <Skeleton height={30} />
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart Skeleton */}
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center h-full">
                    <Skeleton height={20} width={200} />
                    <Skeleton height={200} width="100%" />
                </div>

                {/* Doughnut Chart Skeleton */}
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center h-full">
                    <Skeleton height={20} width={200} />
                    <Skeleton circle height={150} width={150} />
                </div>
            </div>
        </div>
    )
}

export default DashboardSkeleton