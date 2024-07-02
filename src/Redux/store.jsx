// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart : cartSlice.reducer,
  
     // Thêm reducer của auth
   // Thêm reducer của product
  },
});

export default store;
