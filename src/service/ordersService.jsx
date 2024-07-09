import axiosInstance from './axiosInstance';

// Function để tạo đơn hàng mới
export const createOrder = async (products) => {
  try {
    const response = await axiosInstance.post(import.meta.env.VITE_ORDER_API, { products });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    throw error;
  }
};
export const fetchOrderLatest = async () => {
  try {
    const response = await axiosInstance.get(import.meta.env.VITE_LATEST_ORDER);
    const latestOrder = response.data.data[0]; // Giả sử lấy đơn hàng đầu tiên trong mảng
    const orderDetails = latestOrder.attributes.products;
    return {
      id: latestOrder.id,
      createdAt: latestOrder.attributes.createdAt,
      products: orderDetails
    };
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm được tạo mới nhất:', error);
    throw error;
  }
};
