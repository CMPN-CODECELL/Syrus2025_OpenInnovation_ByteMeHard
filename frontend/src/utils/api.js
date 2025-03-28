import axios from "axios";

// Base URL for your backend
const API_BASE_URL = import.meta.env.VITE_BACKEND; // Change this for production

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic request function
export const apiRequest = async (method, url, data = null, params = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error.message; // Rethrow for handling
  }
};

// Shortcut functions for common requests
export const getRequest = (url, params) => apiRequest("get", url, null, params);
export const postRequest = (url, data) => apiRequest("post", url, data);
export const putRequest = (url, data) => apiRequest("put", url, data);
export const deleteRequest = (url, data) => apiRequest("delete", url, data);
