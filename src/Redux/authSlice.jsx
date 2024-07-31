import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from '../service/authService';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.jwt);
      localStorage.setItem('user', JSON.stringify(response.user)); // Store user data as a JSON string
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Parse JSON string to object
    if (token && user) {
      return { token, user };
    }
    throw new Error('No token or user found');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('phone')
      toast.info('You have logged out successfully');
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
        toast.success('Login successful');
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        toast.error('Login failed');
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice;
