// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart : cartSlice.reducer,
    wishlist : wishlistSlice.reducer 
  },
});


