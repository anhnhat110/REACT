import axios from "axios";

export const registerUser = async (user) => {
  try {
    const { data } = await axios.post('http://localhost:1338/api/auth/local/register', user);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred during registration.");
  }
};
