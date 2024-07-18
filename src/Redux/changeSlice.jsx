import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import changeService from '../service/changeService';
import { toast } from "react-toastify";

// Thunk for changing password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword,confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await changeService.changePassword(currentPassword, newPassword, confirmPassword);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const changeSlice = createSlice({
  name: 'change',
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Add your other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Change passwork successfully")
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Change passwork failed")
      });
  },
});

export default changeSlice;
