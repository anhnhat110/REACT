// features/cart/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        item => !(item.id === id && item.size === size)
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id && item.size === size);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice;
