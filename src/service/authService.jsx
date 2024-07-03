// src/services/authService.js

import axiosInstance from './axiosInstance';

// Login function
export const login = async (identifier, password) => {
  try {
    const response = await axiosInstance.post('/auth/local', {
      identifier,
      password,
    });
    const { jwt, user } = response.data;
    localStorage.setItem('token', jwt);
    return { user, jwt };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
};

// Function to get the authenticated user
export const getAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};
