/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
import LoadingHydrate from "../../motions/LoadingHydrate";
import { getGuestDetails, updateProfileImage } from "../../services/Guest";
import DefaultImg from '../../assets/Default_pfp.jpg';

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
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<GuestProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Track file upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { profileImage } = useUserContext();
  const navigate = useNavigate();

  // 1. Handle file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // 2. Upload the image + show loading
  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);       // start upload spinner
    setError(null);

    try {
      const formData = new FormData();
      formData.append("profile_image", selectedImage);
      
      // Call your PUT endpoint: /api/change_profile_picture
      await updateProfileImage(formData);

      // Re-fetch the user data to ensure we have the latest profile_image
      const updatedData = await getGuestDetails(id!);
      setProfile(updatedData.user);

    } catch (err) {
      console.error(`Failed to upload profile image: ${err}`);
      setError("Failed to upload profile image");
    } finally {
      setIsUploading(false);   // stop upload spinner
    }
  };

  // 3. Fetch user details on mount or ID change
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
      } catch (err: any) {
        setError(err.message || "An error occurred");
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
        <button
          onClick={() => navigate("/")}
          className="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          &larr; Back
        </button>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 bg-gray-200">
              <img
                src={
                  profile?.profile_image || profileImage || DefaultImg
                }
                alt="Profile"
                className="hidden md:block w-32 h-32 rounded-full object-cover"
              />
              <div className="md:hidden flex items-center justify-center h-48">
                <img
                  src={
                    profile?.profile_image || profileImage || DefaultImg
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Profile Details */}
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
                  <span className="text-gray-600">{profile?.guest_type?.toUpperCase()}</span>
                </div>
              </motion.div>

              <div className="mt-4">
                {isUploading ? (
                  <p className="text-blue-600">Updating your profile picture...</p>
                ) : (
                  <>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer bg-blue-300 p-2 rounded-md" />
                    <button
                      onClick={handleUpload}
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                    >
                      Change Profile Image
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestProfile;
