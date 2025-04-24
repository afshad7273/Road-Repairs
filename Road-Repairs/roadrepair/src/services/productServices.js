import axios from "axios";
import { getUserData } from "../utils/storageHandler";
import { BASE_URL } from "../utils/urls";

// You can move this to a separate config file if reused elsewhere

export const addProductAPI = async (formData) => {
  console.log(formData);
  
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.post(`${BASE_URL}/product`, formData,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Add Product API Error:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};


const getWorkshopProductsAPI = async () => {
  const token = getUserData()
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BASE_URL}/product/workshop`, config);
  return response.data;
};

const updateProductCountAPI = async ({productId, productCount}) => {
  const token = getUserData()
  console.log(productCount);
  console.log(productId)
  
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${BASE_URL}/product/${productId}/count`, { productCount }, config);
  return response.data;
};

const deleteProductAPI = async (productId) => {
  try {
    const token = getUserData();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${BASE_URL}/product/${productId}`, config);
    return response.data;
  } catch (error) {
    console.error("Delete Product API Error:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};

export const getAllProductAPI = async (params) => {
  const token = getUserData();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.productType) query.append('productType', params.productType);
  query.append('page', params.page);
  query.append('limit', params.limit);
  if (params.sort) query.append('sort', params.sort);

  const response = await axios.get(`${BASE_URL}/product?${query.toString()}`, config);
  return response.data;
};


export { getWorkshopProductsAPI, updateProductCountAPI, deleteProductAPI };