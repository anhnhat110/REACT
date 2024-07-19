// ProductService.jsx
import axiosInstance from './axiosInstance';

// Function để lấy danh sách sản phẩm
export const fetchProducts = async (category,sort=null,filters=[]) => {
  try {
    const sortParam = sort ? `&sort=${sort}` : '';
    let filterParams = '';
    if (Array.isArray(filters) && filters.length > 0) {
      filterParams = filters.map((filter) => `&filters[types][name][$eq]=${filter}`).join('');
    }
    const response = await axiosInstance.get(`http://localhost:1338/api/products?populate=*&filters[categories][name][$eq]=${category}${filterParams}${sortParam}`);
    return response.data.data;
  } catch (error) {
    console.error('Error', error);
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

export const fetchProductsLimit = async (category,limit) => {
  try {
    const response = await axiosInstance.get(`/products?populate=*&filters[categories][name][$eq]=${category}&pagination[limit]=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error;
  }
};
