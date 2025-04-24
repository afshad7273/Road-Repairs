import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getUserData } from "../utils/storageHandler";

// 🔥 Create Breakdown API
export const createBreakdownAPI = async (formData) => {
  const token =getUserData()
  const response = await axios.post(`${BASE_URL}/breakdown`, formData, {
    headers: { 'Content-Type': 'multipart/form-data',
      Authorization:`Bearer ${token}`
     },
  });
  return response.data;
};


export const getAddressFromCoordinates = async (lat, lng) => {
    const GOOGLE_MAPS_API_KEY = "AIzaSyBtQPXtHqD_fDGbUAP9euLOb-AjMUTJAiM"; // Replace with your API key
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
  
    if (response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    } else {
      throw new Error("Unable to fetch address from coordinates");
    }
  };



  export const findByLocationAPI = async ({ latitude, longitude, radius, issueType, userLat, userLon }) => {
    const token = getUserData();
    const response = await axios.get(`${BASE_URL}/location/workshops/nearby`, {
        params: {
            latitude,
            longitude,
            radius,
            issueType,
            userLat,
            userLon
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  };
    
    // ✅ 2. Accept a complaint by ID
    export const acceptBreakdownAPI = async (id) => {
      const token = getUserData();
      const res = await axios.put(`${BASE_URL}/breakdown/${id}/accept`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    };
    
    // ✅ 3. Reject a complaint by ID
    export const rejectBreakdownAPI = async (id) => {
      const token = getUserData();
      console.log(token);
      
      const res = await axios.put(`${BASE_URL}/breakdown/${id}/reject`,null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    };

    export const breakdownRequestAPI = async(values)=>{
      const token = getUserData();
      const response = await axios.post(`${BASE_URL}/breakdown/request`,values,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data
    }


    export const getMyComplaintsAPI = async()=>{
      
      const token = getUserData();
      const response = await axios.get(`${BASE_URL}/breakdown/requestview`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response.data
    }

    export const getBreakdownByIdAPI = async (breakdownId) => {
      
      const token = getUserData();
      const response = await axios.get(`${BASE_URL}/breakdown/${breakdownId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return response.data;
  };


  export const updateBreakdownStatusAPI = async ({ id, amount }) => {
    const token = getUserData();
    const response = await axios.put(`${BASE_URL}/breakdown/${id}/complete`, { amount }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getMyBreakdownsAPI = async () => {
  const token = getUserData();
  const response = await axios.get(`${BASE_URL}/breakdown/my`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};


export const createNotificationAPI = async ({ userId, message, relatedObjectId, type }) => {
  const token = getUserData();
  console.log("createNotificationAPI - Request URL:", `${BASE_URL}/notifications`); // Debug
  console.log("createNotificationAPI - Token:", token); // Debug
  console.log("createNotificationAPI - Payload:", { userId, message, relatedObjectId, type }); // Debug
  try {
    const response = await axios.post(
      `${BASE_URL}/notifications`,
      { userId, message, relatedObjectId, type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("createNotificationAPI - Response:", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error("createNotificationAPI - Error:", error.response?.data || error.message); // Debug
    throw error;
  }
};