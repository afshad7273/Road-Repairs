// paymentAPI.js (API Functions)
import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getUserData } from "../utils/storageHandler";

export const makePaymentAPI = async (values) => {
    const token = getUserData()
    console.log(values);
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${BASE_URL}/payments`, values, config);
    return response.data;
};