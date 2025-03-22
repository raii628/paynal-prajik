import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GuestReservationSkeleton = () => {
  return (
    <div className="p-6">
      <Skeleton height={40} width={300} style={{ marginBottom: '1rem' }} />
      <Skeleton height={30} width={200} style={{ marginBottom: '0.5rem' }} />
      <Skeleton height={30} width={150} style={{ marginBottom: '1rem' }} />
      <Skeleton height={25} count={1} style={{ marginBottom: '0.5rem' }} />
      <Skeleton height={30} count={5} style={{ marginBottom: '0.5rem' }} />
    </div>
  );
};

export default GuestReservationSkeleton;
