// ProductService.jsx
import axiosInstance from './axiosInstance';

// Function để lấy danh sách sản phẩm
export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get(import.meta.env.VITE_PRODUCT_API);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error;
  }
};

// Function để lấy chi tiết sản phẩm bằng ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}?populate=*`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết sản phẩm ${productId}:`, error);
    throw error;
  }
};
