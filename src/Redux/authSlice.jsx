// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../service/authService";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  username: "",
  loginError: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await loginUser(user);
      return response;
    } catch (error) {
      throw rejectWithValue(error); // Propagate error for handling in extraReducers
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginError = null; // Clear previous login errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.user?.username; // Ensure `action.payload` has `user` object
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", action.payload.user?.username);
        toast.success("Logged in successfully!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false; // Set isLoggedIn to false on login failure
        state.loginError = action.payload.message; // Access the error message from
        toast.error("Check your credentials");
      });
  },
});
export const { setUser, clearLoginError, logout } = authSlice.actions;
export default authSlice;
