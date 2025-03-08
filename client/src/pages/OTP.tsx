/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect, KeyboardEvent, FormEvent } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import { verifyOtp } from "../services/Auth";

const OTP: FC = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(120);
  const [otpError, setOtpError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useUserContext();

  const email = sessionStorage.getItem('email');
  const password = sessionStorage.getItem('password');

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOTP(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const resendOTP = async () => {
    setResendDisabled(true);
    setTimer(120);

    try {
      // Call resend OTP API
      setOTP(['', '', '', '', '', '']);
    } catch (error) {
      console.error(`Failed to resend OTP: ${error}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtpError("");
    setIsVerifying(true);

    const otpCode = otp.join("");
    if (otpCode.length === 6 && email && password) {
      try {
        const response = await verifyOtp(email, password, otpCode);
        if (response.status === 201) {
          const { access_token, refresh_token } = response.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("role", response.data.user.role)
          setIsAuthenticated(true);
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('password');
          navigate('/');
        }
      } catch (error: any) {
        const { data, status } = error.response;
        switch (status) {
          case 400:
          case 404:
          case 500:
            setOtpError(data.error);
            break;
          default:
            setOtpError("Something went wrong. Please try again later.");
            break;
        }
      } finally {
        setIsVerifying(false);
      }
    } else {
      setOtpError("Please enter a valid OTP");
      return;
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setResendDisabled(false);
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        })
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    }
  }, [resendDisabled, timer]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-lg shadow-md p-6"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl mb-4 text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 8V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-1">Verify Your Email Address</h2>
          <p className="text-gray-500 text-center max-w-xs">
            We&apos;ve sent a 6-digit verification code to your email address.
            Please enter the code below to continue.
          </p>
        </div>

        {/* Error message */}
        {otpError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 text-center rounded">
            {otpError}
          </div>
        )}

        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-xl"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <div className="text-center mb-4">
            <a
              href="#"
              className="text-sm text-orange-500 hover:underline mr-2"
            >
              Change Email
            </a>
            |
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!resendDisabled) {
                  resendOTP();
                }
              }}
              className={`text-sm ml-2 ${resendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-orange-500 hover:underline'
                }`}
            >
              Resend Code
            </a>
            {resendDisabled && (
              <span className="text-xs text-gray-500 ml-2">
                ({timer}s)
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className={`w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default OTP