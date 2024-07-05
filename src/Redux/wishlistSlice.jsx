// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const item = action.payload;
      const isExist = state.favItems.some((i) => i.id === item.id);
      if (!isExist) {
        state.favItems.push(item);
      }
    },
    removeFromFav: (state, action) => {
      const id = action.payload;
      state.favItems = state.favItems.filter((item) => item.id !== id);
    },
  },
});

export const { addToFav, removeFromFav } = wishlistSlice.actions;
export default wishlistSlice;
