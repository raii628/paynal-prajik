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