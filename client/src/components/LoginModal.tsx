/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/Auth";
import { useUserContext } from "../contexts/AuthContext";

interface LoginProps {
  toggleLoginModal: () => void;
  openSignupModal: () => void;
}

const LoginModal: FC<LoginProps> = ({ toggleLoginModal, openSignupModal }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useUserContext();

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await login(email, password);
      if (response.status === 200) {
        const { user } = response.data;
        setIsAuthenticated(true);
        setRole(user.role);
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error(`Failed to login: ${error}`);
      setErrors(error.response?.data || { general: "An error occurred" });
    }
  };

  return (
    <section className="relative z-20 min-h-screen flex items-center justify-center mt-5">
      <div className="relative z-30 w-full max-w-md bg-white rounded-md md:mt-0 sm:max-w-md xl:p-2 dark:border-gray-700 shadow-2xl">
        <i
          className="fa fa-x absolute top-3 right-3 z-40 cursor-pointer"
          onClick={toggleLoginModal}
        ></i>
        <div className="py-8 space-y-4 md:space-y-6 sm:p-10">
          <h1 className="text-4xl text-center font-bold text-gray-800 mb-2">
            Welcome to <span className="text-blue-600">Azurea</span>
          </h1>
          <h3 className="text-normal text-center text-gray-500 tracking-wide mb-4">
            Azurea Hotel Management System
          </h3>

          <div className="border-b-2 border-gray-300 mb-4"></div>

          {/* Display a general error message if present */}
          {errors.general && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 text-center rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={loginSubmit} className="space-y-4 md:space-y-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-700 tracking-tighter"
              >
                Email
              </label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-3 z-20 text-gray-600"></i>
                <motion.input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email@gmail.com"
                  onChange={handleEmailChange}
                  className="z-10 border-1 border-gray-50 text-sm text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 mt-1"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="text-md font-semibold text-gray-700 tracking-tighter"
              >
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
                  className="bg-gray-50 border border-gray-100 text-sm text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-9 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 mt-1"
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="absolute p-3 right-1 cursor-pointer text-gray-800"
                  onClick={togglePassword}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
              <Link
                to='/forgot-password'
                className="text-xs font-semibold text-blue-500 underline tracking-tighter"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!email || !password}
              className="w-full bg-blue-700 text-white py-2 rounded-sm hover:bg-blue-800 transition-colors duration-300"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={() => {
                toggleLoginModal();
                openSignupModal();
              }}
              className="text-blue-500 cursor-pointer font-bold"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
