/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, KeyboardEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import Notification from "../components/Notification";
import { verifyOtp, completeRegistration, resendOtp } from "../services/Auth";

const RegistrationFlow: React.FC = () => {
    const [step, setStep] = useState<number>(2);
    const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
    const [resendDisabled, setResendDisabled] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(120);
    const [otpError, setOtpError] = useState<string>("");
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ general?: string }>({});
    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error" | "info" | "warning";
        icon: string;
    } | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useUserContext();
    const { email, password } = (location.state as { email: string; password: string }) || {};

    useEffect(() => {
        if (!email || !password) {
            navigate("/login");
        }
    }, [email, password, navigate]);

    const handleOTPChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOTP(newOtp);
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOTPKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const resendOTP = async () => {
        setResendDisabled(true);
        setTimer(120);
        try {
            await resendOtp(email);
            setOTP(Array(6).fill(""));
        } catch (error) {
            console.error(`Failed to resend OTP: ${error}`);
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
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [resendDisabled, timer]);

    const handleOTPSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOtpError("");
        setIsVerifying(true);
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setOtpError("Please enter a valid 6-digit OTP");
            setIsVerifying(false);
            return;
        }
        try {
            const response = await verifyOtp(email, password, otpCode);
            if (response.status === 200) {
                setNotification({
                    message: "OTP verified successfully!",
                    type: "success",
                    icon: "fas fa-check-circle"
                });
                setStep(3);
            }
        } catch (error: any) {
            if (error.response) {
                const { data, status } = error.response;
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        setOtpError(data.error || "Something went wrong. Please try again later.");
                        break;
                    default:
                        setOtpError("Something went wrong. Please try again later.");
                        break;
                }
            } else {
                setOtpError("Something went wrong. Please try again later.");
            }
        } finally {
            setIsVerifying(false);
        }
    };

    // STEP 3: Complete Registration Submit
    const handleCompleteRegistrationSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        if (!firstName || !lastName || !age) {
            setErrors({ general: "Please fill out all fields." });
            return;
        }
        setLoading(true);
        try {
            const response = await completeRegistration(email, password, firstName, lastName, age);
            if (response.status === 200) {
                setNotification({
                    message: "Registration completed successfully!",
                    type: "success",
                    icon: "fas fa-check-circle"
                });
                setIsAuthenticated(true);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error: any) {
            setErrors({ general: error.response?.data?.error || "Registration completion failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            {notification && (
                <Notification
                    icon={notification.icon}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white w-full max-w-md rounded-lg shadow-md p-6"
                >
                    <div className="flex flex-col items-center mb-6">
                        <div className="text-4xl mb-4 text-blue-500">
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
                        <h2 className="text-2xl font-semibold mb-1 text-center">Verify Your Email Address</h2>
                        <p className="text-gray-500 text-center max-w-xs">
                            We&apos;ve sent a 6-digit verification code to your email address.
                            Please enter the code below to continue.
                        </p>
                    </div>
                    {otpError && (
                        <div className="bg-red-100 text-red-700 p-2 mb-4 text-center rounded">
                            {otpError}
                        </div>
                    )}
                    <form onSubmit={handleOTPSubmit}>
                        <div className="flex justify-center gap-2 mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                                    value={digit}
                                    onChange={(e) => handleOTPChange(e.target.value, index)}
                                    onKeyDown={(e) => handleOTPKeyDown(e, index)}
                                />
                            ))}
                        </div>
                        <div className="text-center mb-4">
                            <a href="#" className="text-sm text-blue-500 hover:underline mr-2">
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
                                className={`text-sm ml-2 ${resendDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:underline"}`}
                            >
                                Resend Code
                            </a>
                            {resendDisabled && (
                                <span className="text-xs text-gray-500 ml-2">({timer}s)</span>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isVerifying}
                            className={`w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors ${isVerifying ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isVerifying ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                </motion.div>
            )}
            {step === 3 && (
                <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Complete Registration</h2>
                    {errors.general && <p className="text-red-600 text-center mb-4">{errors.general}</p>}
                    <form onSubmit={handleCompleteRegistrationSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RegistrationFlow;
