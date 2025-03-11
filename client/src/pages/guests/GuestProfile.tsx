/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getGuestDetails } from "../../services/Guest";
import { useUserContext } from "../../contexts/AuthContext";
import LoadingHydrate from "../../motions/LoadingHydrate";

interface GuestProfileData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  guest_type: string;
  profile_image?: string;
}

const GuestProfile: FC = () => {
  // Use the route parameter "id" as defined in App.tsx
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<GuestProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use the global context for the profile image fallback if needed
  const { profileImage } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await getGuestDetails(id);
          setProfile(data.user);
        } else {
          setError("User ID not found");
        }
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <LoadingHydrate />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-10"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          &larr; Back
        </button>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Profile Image Section */}
            <div className="md:col-span-1 bg-gray-200">
              <img
                src={
                  profileImage ||
                  profile?.profile_image ||
                  "https://via.placeholder.com/400?text=No+Image"
                }
                alt="Profile"
                className="hidden md:block w-full h-full object-cover"
              />
              <div className="md:hidden flex items-center justify-center h-48">
                <img
                  src={
                    profileImage ||
                    profile?.profile_image ||
                    "https://via.placeholder.com/400?text=No+Image"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            </div>
            {/* Profile Details Section */}
            <div className="md:col-span-2 p-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800"
              >
                {profile?.first_name} {profile?.last_name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-gray-600"
              >
                {profile?.email}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">Age:</span>
                  <span className="text-gray-600">{profile?.age}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">Guest Type:</span>
                  <span className="text-gray-600">{profile?.guest_type.toUpperCase()}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestProfile;
