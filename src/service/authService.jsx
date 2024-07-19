import axiosInstance from './axiosInstance';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/local', credentials);
      const token = response.data.jwt; // Giả sử token nằm trong response.data.jwt
      localStorage.setItem('token', token); // Lưu token vào localStorage
      localStorage.setItem('isLoggedIn', 'true');
      return response.data; // Trả về cả token và user
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  update: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  },
};

export default authService;