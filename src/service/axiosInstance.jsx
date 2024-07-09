// axiosInstance.js
import axios from 'axios';

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000, // Thay đổi baseURL thành đường dẫn của API Strapi của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào headers của request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      console.error('Unauthorized access. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
