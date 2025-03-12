<<<<<<< HEAD

const ForgotPassword = () => {
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  verifyResetOtp,
  resetPassword
} from '../services/Auth';
import { useUserContext } from "../contexts/AuthContext";

type Step = 'email' | 'otp' | 'newPassword';

const ForgotPassword: FC = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  // Step 1: Send OTP by submitting the email address.
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      console.log(response.data.message);
      setError(null);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP submitted by the user.
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('OTP is required.');
      return;
    }
    setLoading(true);
    try {
      const response = await verifyResetOtp(email, otp);
      console.log(response.data.message);
      setError(null);
      setStep('newPassword');
    } catch (err: any) {
      setError(err.response?.data?.error || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password using the new password form.
  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setError('Passwords must match and cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword(email, newPassword, confirmPassword);
      console.log(response.data.message);
      setError(null);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            {error && <div className="mb-2 text-red-600">{error}</div>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
            {error && <div className="mb-2 text-red-600">{error}</div>}
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700">One-Time Password</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handleNewPasswordSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
            {error && <div className="mb-2 text-red-600">{error}</div>}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword;
>>>>>>> upstream/main
