/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const GET = (url: string) => API.get(url);
export const POST = (url: string, data: any) => API.post(url, data);
export const PUT = (url: string, data: any) => API.put(url, data);
export const DELETE = (url: string) => API.delete(url);

export const getMessage = async () => {
    try {
        const response = await GET('/users');
        return response;
    } catch (error: any) {
        console.error(`Error: ${error}`);
        throw error;
    }
};