import axiosInstance from './axiosInstance';

// Function để tạo đơn hàng mới
export const createOrder = async (products) => {
  try {
    const response = await axiosInstance.post("/orders", { products });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    throw error;
  }
};
