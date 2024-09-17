import axios from "axios";

export const subscription = async (clientId) => {
    try {
        if (clientId) {
            const response = await axios.post('/api/clients/', { clientId });
            if (response.data && response.data.clientData) {
                return await response.data.clientData;
            } else {
                throw new Error('No Response For Client Data');
            }
        }
    } catch (error) {
        throw error;
    }
};
