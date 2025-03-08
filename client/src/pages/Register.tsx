/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendRegisterOtp } from '../services/Auth';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await sendRegisterOtp(email, password, confirmPassword);
      if (response.status === 200) {
        navigate('/otp', { state: { email, password } });
      }
    } catch (error: any) {
      console.error(`Failed to register: ${error}`);
      if (!error.response) {
        setErrors({ general: 'Something went wrong. Please try again later.' });
        return;
      }
      const { data, status } = error.response;

      if (status === 500) {
        setErrors({ general: 'Something went wrong. Please try again later.' });
        return;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: data.email || "",
        password: data.password || "",
        general: data.message || "",
      }));
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-opacity-5 rounded-xl border border-gray-400 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Register to <span className='text-blue-600'>Moonlight Hotel</span>
          </h1>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="text-md font-medium text-gray-700">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                id="email"
                value={email}
                placeholder='name@gmail.com'
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                required
              />
              {errors.email && <p className='text-red-600 text-sm'>{errors.email}</p>}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="text-md font-medium text-gray-700">
                Password
              </label>
              <div className="relative flex items-center">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 cursor-pointer text-gray-800"
                  onClick={togglePassword}
                />
              </div>
              {errors.password && <p className='text-red-600 text-sm'>{errors.password}</p>}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="text-md font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                  required
                />
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 cursor-pointer text-gray-800"
                  onClick={toggleConfirmPassword}
                />
              </div>
              {errors.confirmPassword && <p className='text-red-600 text-sm'>{errors.confirmPassword}</p>}
            </div>


            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!email || !password || !confirmPassword}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Register
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-500 font-semibold"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register