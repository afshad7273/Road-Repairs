import axios from "axios";



// Google Maps API Key
const GOOGLE_API_KEY = "AIzaSyBtQPXtHqD_fDGbUAP9euLOb-AjMUTJAiM";
// Reverse Geocoding API
export const getAddressFromCoordinates = async (lat, lon) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
    const { data } = await axios.get(url);

    if (data?.status === "OK" && data?.results?.length > 0) {
      // Get the formatted address from the first result
      return data.results[0].formatted_address;
    } else {
      return "Location not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching location";
  }
};



export const getUserLocation = async (setCoordinates, setFormData) => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          
          setCoordinates({ lat: latitude, lng: longitude });

          try {
            // 🌍 Get address from coordinates
            const address = await getAddressFromCoordinates(latitude, longitude);
            resolve(address);
          } catch (error) {
            console.error("Error fetching address:", error);
            reject("Failed to fetch address");
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          reject("Unable to fetch location");
        }
      );
    } else {
      reject("Geolocation is not supported by your browser");
    }
  });
};






