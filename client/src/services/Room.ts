import { room } from "./_axios";

export const fetchAllRooms = async () => {
    try {
        const response = await room.get('/rooms', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch rooms: ${error}`);
        throw error;
    }
};