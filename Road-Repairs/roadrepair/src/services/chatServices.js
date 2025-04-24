import axios from 'axios';
import { getUserData } from '../utils/storageHandler';

const API_URL = import.meta.env.VITE_APP_BASE_URL+ 'api/v1/chat';
console.log(API_URL);


export const createChatMessageAPI = async (messageData) => {
    const token = getUserData(); 
    const response = await axios.post(API_URL, messageData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
};


export const getUserChatsAPI = async (breakdownId, userId) => {
    const response = await axios.get(`${API_URL}/${breakdownId}/user/${userId}`);
    return response.data;
};

export const getUserChatListAPI = async () => {
    const token = getUserData();
    const response = await axios.get(`${API_URL}/chat-list`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
};

export const getChatMessagesAPI = async ( breakdownId, currentUserId, receiverId ) => {
    const token = getUserData();
    const response = await axios.get(`${API_URL}/${breakdownId}/${currentUserId}/${receiverId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
