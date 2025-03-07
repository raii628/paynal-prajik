import { API } from "./_axios";

export const login = async (email: string, password: string) => {
    try {
        const response = await API.post('/auth/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to login: ${error}`);
        throw error
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
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');

        if (!access_token) throw new Error('Access token not found');

        const response = await API.post('/auth/logout', {
            refresh: refresh_token
        });
        console.log(`Admin Access Token: ${response.data.access}`);
        console.log(`Admin Refresh Token: ${response.data.refresh}`);
        
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('role');

        return response;
    } catch (error) {
        console.error(`Failed to logout: ${error}`);
        throw error;
    }
};

export const sendEmailOtp = async (email: string) => {
    try {
        const response = await API.post('/email/otp', {
            email: email
        });
        return response;
    } catch (error) {
        console.error(`Failed to send OTP: ${error}`);
        throw error;
    }
};

export const resendEmailOtp = async (email: string) => {
    try {
        const response = await API.post('/otp-resend', {
            email: email
        });
        return response;
    } catch (error) {
        console.error(`Failed to resend OTP: ${error}`);
        throw error;
    }
};