// src/services/reviewServices.js
import axios from 'axios';
import { BASE_URL } from '../utils/urls';
import { getUserData } from '../utils/storageHandler';

// Utility to get the auth token
const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

export const submitReviewAPI = async (reviewData) => {
  if (!reviewData || !reviewData.workshopId || !reviewData.rating) {
    throw new Error('Missing required fields: workshopId and rating are mandatory');
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.post(`${BASE_URL}/review/`, reviewData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Review submission successful:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while submitting the review';
    console.error('Review submission failed:', errorMessage, error);
    throw new Error(errorMessage);
  }
};


export const getWorkshopReviewsAPI = async () => {
  const token = getUserData();
    const response = await axios.get(`${BASE_URL}/review/workshop`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};