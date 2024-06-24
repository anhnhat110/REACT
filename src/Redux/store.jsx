// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";



const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Thêm reducer của auth
   // Thêm reducer của product
  },
});

export default store;
