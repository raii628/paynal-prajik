import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        console.log("No access token found");
        return false;
    }

    if (isTokenExpired(accessToken)) {
        const response = await refreshUserToken();
        return response ?? false;
    }

    console.log("Token expiry checked.");
    return true;
}