import { API } from "./_axios";

export const login = async (email: string, password: string) => {
    try {
        const response = await API.post('/auth/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error(`Failed to login: ${error}`);
        throw error
    }
};

export const sendRegisterOtp = async (email: string, password: string, confirmPassword: string) => {
    try {
        const response = await API.post('/auth/register', {
            email: email,
            password: password,
            confirm_password: confirmPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to send register OTP: ${error}`);
        throw error;
    }
};

export const verifyOtp = async (email: string, password: string, otp: string) => {
    try {
        const response = await API.post('/auth/verify', {
            email: email,
            password: password,
            otp: otp
        });
        return response;
    } catch (error) {
        console.error(`Failed to verify OTP: ${error}`);
        throw error;
    }
};

export const guestSignup = async (email: string, password: string, confirmPassword: string) => {
    try {
        const response = await API.post('/auth/signup', {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });
        return response;
    } catch (error) {
        console.error(`Failed to signup user: ${error}`);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await API.post('/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error(`Failed to logout: ${error}`);
        throw error;
    }
};