/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRegisterOtp } from "../services/Auth";

interface SignupModalProps {
  toggleRegisterModal: () => void;
  openLoginModal: () => void;
}

const SignupModal: FC<SignupModalProps> = ({ toggleRegisterModal, openLoginModal }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string | string[];
    password?: string | string[];
    confirmPassword?: string | string[];
    general?: string;
  }>({});

  const navigate = useNavigate();

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  // Helper function to extract and map backend errors
  const extractBackendErrors = (response: any) => {
    const { data, status } = response;
    if (status === 500) {
      return { general: "Something went wrong. Please try again later." };
    }
    if (data.error && typeof data.error === "object") {
      const details = data.error.details ? data.error.details : data.error;
      return {
        email: details.email,
        password: details.password,
        confirmPassword: details.confirm_password,
        general: data.error.general,
      };
    }
    return { general: data.error || data.message || "Registration failed." };
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const fieldErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!email) fieldErrors.email = "Email is required";
    if (!password) fieldErrors.password = "Password is required";
    if (!confirmPassword) fieldErrors.confirmPassword = "Confirm password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await sendRegisterOtp(email, password, confirmPassword);
      if (response.status === 200) {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        navigate("/otp", { state: { email, password } });
      }
    } catch (error: any) {
      console.error("Failed to register:", error);
      if (!error.response) {
        setErrors({ general: "Something went wrong. Please try again later." });
      } else {
        setErrors(extractBackendErrors(error.response));
      }
    } finally {
      setLoading(false);
    }
  };

  const renderError = (errorMsg?: string | string[]) => {
    if (!errorMsg) return null;
    return Array.isArray(errorMsg) ? errorMsg.join(", ") : errorMsg;
  };

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center mt-8">
      <div className="relative z-30 w-full max-w-md bg-white rounded-md sm:max-w-md xl:p-2 dark:border-gray-700 shadow-2xl">
        <i
          className="fa fa-x absolute top-3 right-3 z-40 cursor-pointer"
          onClick={toggleRegisterModal}
        ></i>
        <div className="p-7 space-y-4 md:space-y-6 sm:p-9">
          <h1 className="text-4xl text-center font-bold text-gray-800 mb-2 tracking-wide">
            Register to <span className="text-blue-600">Azurea</span>
          </h1>
          <h3 className="text-normal text-center text-gray-500 tracking-wide mb-4">
            Azurea Hotel Management System
          </h3>

          <div className="border-b-2 border-gray-300 mb-4"></div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 md:space-y-6">
            <div className="mb-3">
              <label htmlFor="email" className="text-md font-semibold text-gray-700 tracking-tighter">
                Email
              </label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-3 z-20 text-gray-600"></i>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email@gmail.com"
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-sm mt-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{renderError(errors.email)}</p>
                )}
              </div>
            </div>

            <div className="mb-2 relative">
              <label htmlFor="password" className="text-md font-semibold text-gray-700 tracking-tighter">
                Password
              </label>
              <div className="relative flex items-center">
                <i className="fa-solid fa-lock absolute left-3 top-4 z-20 text-gray-600"></i>
                <motion.input
                  placeholder="Enter your password"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-sm mt-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9"
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 cursor-pointer text-gray-800"
                  onClick={togglePassword}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{renderError(errors.password)}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="text-md font-semibold text-gray-700 tracking-tighter"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <i className="fa-solid fa-lock absolute left-3 top-4 z-20 text-gray-600"></i>
                <motion.input
                  placeholder="Confirm your password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md mt-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9"
                  required
                />
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 cursor-pointer text-gray-800"
                  onClick={toggleConfirmPassword}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{renderError(errors.confirmPassword)}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!email || !password || !confirmPassword}
              className={`w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Registering...
                </>
              ) : (
                "Register"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => {
                toggleRegisterModal();
                openLoginModal();
              }}
              className="text-blue-500 font-bold cursor-pointer"
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupModal;
