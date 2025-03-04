import API from "./_axios";

export const guestLogin = async (email: string, password: string) => {
    try {
        const response = await API.post('/api/guest/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
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
        const response = await API.post('/api/signup', {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to signup user: ${error}`);
        throw error;
    }
};

export const adminLogin = async (email: string, password: string) => {
    try {
        const response = await API.post('/api/admin/login', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(`Admin Access Token: ${response.data.access}`);
        console.log(`Admin Refresh Token: ${response.data.refresh}`);
        console.log(`Role: ${response.data.role}`);
        return response;
    } catch (error) {
        console.error(`Failed to login: ${error}`);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await API.post('/api/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.removeItem('access_token')}`
            }
        });
        console.log(`Admin Access Token: ${response.data.access}`);
        console.log(`Admin Refresh Token: ${response.data.refresh}`);
        return response;
    } catch (error) {
        console.error(`Failed to logout: ${error}`);
        throw error;
    }
};

export const sendEmailOtp = async (email: string) => {
    try {
        const response = await API.post('/api/email/otp', {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to send OTP: ${error}`);
        throw error;
    }
};

export const resendEmailOtp = async (email: string) => {
    try {
        const response = await API.post('/api/otp-resend', {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to resend OTP: ${error}`);
        throw error;
    }
};