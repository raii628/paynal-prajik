import { ADMIN } from "./_axios";

export const fetchAdminProfile = async () => {
    try {
        const response = await ADMIN.get('/details', {
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error(`Failed to fetch admin profile: ${error}`);
        throw error;
    }
};

export const fetchStats = async () => {
    try {
        const response = await ADMIN.get('/stats', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch stats: ${error}`);
        throw error;
    }
};

export const areaReservations = async () => {
    try {
        const response = await ADMIN.get('/area_reservations', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch area reservations: ${error}`);
        throw error;
    }
};

export const manageUsers = async () => {
    try {
        const response = await ADMIN.get('/manage_users', {
            withCredentials: true
        });
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch users: ${error}`);
        throw error;
    }
};