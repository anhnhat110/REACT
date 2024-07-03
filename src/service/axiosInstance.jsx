// axiosInstance.js

import axios from 'axios';

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:1338/api',
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
    // Xử lý lỗi 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Xóa token nếu không được ủy quyền
      localStorage.removeItem('token');
      // Chuyển hướng người dùng đến trang đăng nhập hoặc hiển thị thông báo
      // window.location.href = '/login'; // Có thể chuyển hướng đến trang login
      // Ví dụ: Hiển thị thông báo lỗi
      console.error('Unauthorized access. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
