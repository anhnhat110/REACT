import axiosInstance from './axiosInstance';

const changeService = {
  changePassword: async (currentPassword, newPassword,confirmPassword) => {
    try {
      const response = await axiosInstance.post('/auth/change-password', {
        currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default changeService;