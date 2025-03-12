<<<<<<< HEAD
import API from "./_axios";

export const getGuestDetails = async () => {
    try {
        const response = await API.get('/api/guest', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to get guest details: ${error}`);
        throw error;
    }
};
=======
import { guest } from "./_axios";

export const getGuestDetails = async (id: string) => {
    try {
        const { data } = await guest.get(`/${id}`, {
            withCredentials: true
        });
        return data;
    } catch (error) {
        console.error(`Failed to fetch guest details: ${error}`);
        throw error;
    }
};

export const updateGuestDetails = async (id: string, data: string[]) => {
    try {
        const response = await guest.put(`/${id}`, {
            data: data
        }, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error(`Failed to update guest details: ${error}`);
        throw error;
    }
}
>>>>>>> upstream/main
