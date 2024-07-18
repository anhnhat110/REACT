import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setOrdersLoading(state, action) {
      state.loading = action.payload;
    },
    setOrdersError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setOrdersLoading, setOrdersError } = ordersSlice.actions;

export default ordersSlice;