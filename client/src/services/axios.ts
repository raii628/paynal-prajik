/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const getMessage = async () => {
    try {
        const response = await API.get('/users');
        return response;
    } catch (error: any) {
        console.error(`Error: ${error}`);
        throw error;
    }
};