import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getUserData } from "../utils/storageHandler";

// const token = sessionStorage.getItem("token"); // Removed direct dependency

//Helper function to get the token
const getToken = () => {
  const token = getUserData(); // Assumes getUserData() retrieves token
  if (!token) {
    throw new Error("User not authenticated.");
  }
  return token;
};

export const loginAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/user/login`, data);
  console.log("ee", response);
  return response.data;
};

export const registerAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/user`, data);
  return response.data;
};

export const profileAPI = async () => {
  const token = getToken(); // Get token dynamically
  const response = await axios.get(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCustomersByDistrictAPI = async () => {
  const token = getToken(); // Get token dynamically
  const response = await axios.get(`${BASE_URL}/user/customers-by-district`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
