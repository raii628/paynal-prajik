/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, KeyboardEvent, FormEvent, useEffect, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import Notification from "../components/Notification";
import { verifyOtp, completeRegistration } from "../services/Auth";

const RegistrationFlow: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
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

    const { email, password } = (location.state as { email: string; password: string }) || {};

    const { setIsAuthenticated } = useUserContext();

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

    const handleOTPSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setErrors({ general: "Please enter a valid 6-digit OTP." });
            return;
        }
        setLoading(true);
        try {
            const response = await verifyOtp(email, password, otpCode);
            if (response.status === 200) {
                setNotification({
                    message: "OTP verified successfully!",
                    type: "success",
                    icon: "fas fa-check-circle"
                });
                setStep(2);
            }
        } catch (error: any) {
            setErrors({ general: error.response?.data?.error || "OTP verification failed." });
        } finally {
            setLoading(false);
        }
    };

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
                navigate("/");
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
            {step === 1 && (
                <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
                    {errors.general && <p className="text-red-600 text-center mb-4">{errors.general}</p>}
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                </div>
            )}
            {step === 2 && (
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
