import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (email === 'admin' && password === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-opacity-5 rounded-xl border border-gray-400 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to <span className='text-blue-600'>Moonlight Hotel</span>
          </h1>

          <form onSubmit={loginSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="text-md font-medium text-gray-700">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!email || !password}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-blue-500 font-semibold"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;