/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(e.target.value);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password || !confirmPassword) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
        confirmPassword: !confirmPassword ? "Confirm password is required" : "",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
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
      console.error(`Failed to register: ${error}`);
      if (!error.response) {
        setErrors({ general: "Something went wrong. Please try again later." });
        return;
      }
      const { data, status } = error.response;

      if (status === 500) {
        setErrors({ general: "Something went wrong. Please try again later." });
        return;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: data.email || "",
        password: data.password || "",
        general: data.message || "",
      }));
    }
  };

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center mt-8">
      <div className="relative z-30 w-full max-w-md bg-white rounded-md md:mt-0 sm:max-w-md xl:p-2 dark:border-gray-700 shadow-2xl">
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

          <form onSubmit={handleRegisterSubmit}
            className="space-y-4 md:space-y-6"
          >
            <div className="mb-3">
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-700 tracking-tighter"
              >
                Email
              </label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-3 z-20 text-gray-600"></i>
                <motion.input
                  // whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email@gmail.com"
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-sm mt-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="text-md font-semibold text-gray-700 tracking-tighter"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <i className="fa-solid fa-lock absolute left-3 top-4 z-20 text-gray-600"></i>
                <motion.input
                  // whileFocus={{ scale: 1.02 }}
                  placeholder="Enter your password"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-sm mt-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 cursor-pointer text-gray-800"
                  onClick={togglePassword}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
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
                  // whileFocus={{ scale: 1.02 }}
                  placeholder="Confirm your password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md mt-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                  required
                />
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 cursor-pointer text-gray-800"
                  onClick={toggleConfirmPassword}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!email || !password || !confirmPassword}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
            >
              Register
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
