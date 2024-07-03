import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, image, size, price, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id && item.size === size);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ id, name, image, size, price, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(item => !(item.id === id && item.size === size));
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find(item => item.id === id && item.size === size);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice;
