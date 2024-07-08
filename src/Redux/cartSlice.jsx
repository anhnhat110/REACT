import { createSlice } from '@reduxjs/toolkit';

// Lấy dữ liệu từ localStorage
const getInitialState = () => {
  const storedItems = localStorage.getItem('cartItems');
  return {
    cartItems: storedItems ? JSON.parse(storedItems) : [],
  };
};

const initialState = getInitialState();

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
      // Cập nhật localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(item => !(item.id === id && item.size === size));
      // Cập nhật localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find(item => item.id === id && item.size === size);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        // Cập nhật localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice;
