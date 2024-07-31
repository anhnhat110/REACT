import axiosInstance from "./axiosInstance";

export const registerUser = async (user) => {
  try {
    const { data } = await axiosInstance.post('/auth/local/register', user);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred during registration.");
  }
};
