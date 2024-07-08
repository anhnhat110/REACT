// src/services/authService.js
import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/local", credentials);
    return response.data; // Assuming the response contains data with a `user` object
  } catch (error) {
    throw error.response.data; // Handle error response
  }
};
