import { motion } from "framer-motion"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();

  const togglePassword = setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // 1. Sends the OTP in email request to back end
    // 2. Directs to OTP page
  }

  return (
    <div>Register</div>
  )
}

export default Register