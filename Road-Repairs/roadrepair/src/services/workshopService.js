// workshopService.js
import axios from "axios";
import { BASE_URL } from "../utils/urls";

// Reverse Geocoding Function (copied as it’s used in fetchWorkshopProfile)
const reverseGeocode = async (lat, lng) => {
  try {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );

    if (response.data.status === "OK" && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
  }
  return "Unknown Location";
};

// Fetch Workshop Profile API
export const fetchWorkshopProfile = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated.");
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.location?.coordinates) {
      const [lng, lat] = data.location.coordinates;
      data.location = await reverseGeocode(lat, lng);
    }

    return data;
  } catch (error) {
    console.error("Fetch Profile Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update Workshop Profile API
export const updateWorkshopProfile = async (updatedData) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated.");
  }

  const cleanedData = {};
  for (const [key, value] of Object.entries(updatedData)) {
    if (value !== undefined && value !== null) {
      cleanedData[key] = value;
    }
  }

  if (!Object.keys(cleanedData).length) {
    throw new Error("No valid data to update.");
  }

  console.log("Sending update to:", `${BASE_URL}/user/profile`);
  console.log("Cleaned update data:", cleanedData);
  console.log("Token:", token);

  try {
    const { data } = await axios.put(`${BASE_URL}/user/profile`, cleanedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Update response:", data);
    return data;
  } catch (error) {
    console.error("Update Profile Error:", error.response?.data || error.message);
    throw error;
  }
};

// Existing login and register APIs (copied from your input)
export const wloginAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/user/login`, data);
  console.log("ee", response);
  return response.data;
};

export const wregisterAPI = async (data) => {
  console.log("data", data);
  const response = await axios.post(`${BASE_URL}/user`, data);
  console.log(response);
  return response.data;
};