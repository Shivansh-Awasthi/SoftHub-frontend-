import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../services/api';

// Initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
  message: '',
};

// Async thunks for admin-related API calls
export const createApp = createAsyncThunk(
  'admin/createApp',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await endpoints.apps.create(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create app');
    }
  }
);

export const updateApp = createAsyncThunk(
  'admin/updateApp',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await endpoints.apps.update(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update app');
    }
  }
);

export const deleteApp = createAsyncThunk(
  'admin/deleteApp',
  async (id, { rejectWithValue }) => {
    try {
      await endpoints.apps.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete app');
    }
  }
);

// Create the slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createApp
      .addCase(createApp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(createApp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = 'App created successfully';
      })
      .addCase(createApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Handle updateApp
      .addCase(updateApp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(updateApp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = 'App updated successfully';
      })
      .addCase(updateApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Handle deleteApp
      .addCase(deleteApp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(deleteApp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = 'App deleted successfully';
      })
      .addCase(deleteApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;
