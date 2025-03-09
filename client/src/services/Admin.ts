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