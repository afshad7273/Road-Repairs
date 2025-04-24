import axios from "axios";
import { BASE_URL } from "../utils/urls";

export const wloginAPI=async(data)=>{
const response = await axios.post(`${BASE_URL}/user/login`,data)
console.log("ee",response);
return response.data
}

export const wregisterAPI=async(data)=>{
    console.log("data",data);
    
    const response = await axios.post(`${BASE_URL}/user`,data)
    console.log(response);
    
    return response.data
    }