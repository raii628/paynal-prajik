import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API } from "./_axios";

export const isTokenExpired = (token: string): boolean => {
    const decoded : { exp: number } = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const currentTime = Date.now() / 1000;
    return tokenExpiration < currentTime;
};

export const refreshUserToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    if (isTokenExpired(refreshToken)) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        return false;
    }

    try {
        const response = await axios.post("/auth/refresh", {
            refresh: refreshToken,
        });

        if (response.status === 200) {
            localStorage.setItem("refresh_token", response.data.refresh);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Failed to refresh token: ${error}`);
        return false;
    }
};

export const userAuth = async (): Promise<boolean> => {
    try {
        const response = await API.get('/auth/user', {
            withCredentials: true
        });
        return response.status === 200;
    } catch (error) {
        console.error(`Failed to authenticate user: ${error}`);
        return false;
    }
};