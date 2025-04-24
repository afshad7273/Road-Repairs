import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getUserData } from "../utils/storageHandler";
const token=getUserData()



export const adminloginAPI=async(data)=>{
 
const response = await axios.post(`${BASE_URL}/user/login`,data)
return response.data
}

export const registerAPI=async(data)=>{
    const response = await axios.post(`${BASE_URL}/user/reg`,data)
    return response.data
    }


export const getAllCustomersAPI = async () => {
  const token=getUserData()
 const response = await axios.get(`${BASE_URL}/admin/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const getAllWorkshopsAPI = async () => {
  const token=getUserData()
  try {
    const response = await axios.get(`${BASE_URL}/admin/workshops`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., log, throw, or return a default value)
    console.error("Error fetching workshops:", error);
    throw error; // Or return a default value, or rethrow the error
  }
};

// export const acceptWorkshopsAPI = async () => {
//   const { data } = await axios.get(`${BASE_URL}`);
//   return data;
// };

// Verify (accept) a workshop
export const verifyWorkshopAPI = async (workshopId) => {
  const token=getUserData()
  const response = await axios.put(
    `${BASE_URL}/admin/workshops/${workshopId}/verify`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    }
  );
  return response.data;
};

// Suspend (reject) a workshop
export const suspendWorkshopAPI = async (workshopId) => {
  const token=getUserData()
  const response = await axios.put(
    `${BASE_URL}/admin/workshops/${workshopId}/suspend`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    }
  );
  return response.data;
};




