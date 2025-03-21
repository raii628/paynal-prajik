import { booking } from "./_axios";

export const fetchBookings = async () => {
    try {
        const response = await booking.get('/bookings', {
            withCredentials: true
        });
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch bookings: ${error}`);
        throw error;
    }
};

export const fetchReservations = async () => {
    try {
        const response = await booking.get('/reservation', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch reservations: ${error}`);
        throw error;
    }
};

export const fetchAvailability = async (arrival: string, departure: string) => {
    try {
        const response = await booking.get('/availability', {
            params: { arrival, departure },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch availability: ${error}`);
        throw error;
    }
};