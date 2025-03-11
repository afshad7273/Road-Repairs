import axios from "axios";
import { BASE_URL } from "../utils/urls";

export const loginAPI=async(data)=>{
const response = await axios.post(`${BASE_URL}/user/login`,data)
return response.data
}

export const registerAPI=async(data)=>{
    const response = await axios.post(`${BASE_URL}/user/reg`,data)
    return response.data
    }