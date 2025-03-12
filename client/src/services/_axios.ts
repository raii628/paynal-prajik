import axios from "axios";

export const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const ADMIN = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/master`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const guest = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/guest`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});