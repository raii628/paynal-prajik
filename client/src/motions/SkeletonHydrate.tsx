import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonHydrate = () => {
  return (
    <div className="space-y-2 w-4/6">
      <Skeleton count={3} height={40} baseColor="#00023d" />
    </div>
  )
}

export default SkeletonHydrate