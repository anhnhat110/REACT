// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { identifier: "", password: "" },
  isLoggedIn: false,
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user[action.payload.field] = action.payload.value;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
    },
  },
});

export const { setUser, loginSuccess, logout } = authSlice.actions;
export default authSlice;
