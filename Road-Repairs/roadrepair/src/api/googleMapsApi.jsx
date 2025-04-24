// src/api/googleMapsApi.js
import axios from "axios";

// 🌍 Get address from coordinates using Google Maps API
export const getAddressFromCoordinates = async (lat, lng) => {
  return new Promise(async (resolve, reject) => {
    const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY"; // ✅ Replace with your valid API key

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.results.length > 0) {
        resolve(response.data.results[0].formatted_address);
      } else {
        reject("Unable to fetch address from coordinates");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      reject("Error while fetching address from Google Maps API");
    }
  });
};
