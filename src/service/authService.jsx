import axiosInstance from './axiosInstance';

const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/local', credentials);
    const token = response.data.jwt; // Giả sử token nằm trong response.data.jwt
    localStorage.setItem('token', token); // Lưu token vào localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', response.data.user.username); // Giả sử username nằm trong response.data.user.username
    localStorage.setItem('email',response.data.user.email)
    return response.data;
  },
};

export default authService;