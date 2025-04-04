import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../services/api';

// Initial state
const initialState = {
  allApps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  macApps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  macSoftware: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  pcApps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  pcSoftware: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  androidApps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  androidSoftware: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  ps2Apps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  ps3Apps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  ps4Apps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  ppssppApps: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
  currentApp: {
    data: null,
    loading: false,
    error: null,
  },
  searchResults: {
    data: [],
    total: 0,
    loading: false,
    error: null,
  },
};

// Async thunks for API calls
export const fetchAllApps = createAsyncThunk(
  'apps/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await endpoints.apps.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch apps');
    }
  }
);

export const fetchAppById = createAsyncThunk(
  'apps/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await endpoints.apps.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch app');
    }
  }
);

export const fetchAppsByCategory = createAsyncThunk(
  'apps/fetchByCategory',
  async ({ category, params }, { rejectWithValue }) => {
    try {
      const response = await endpoints.apps.getByCategory(category, params);
      return { category, data: response.data };
    } catch (error) {
      return rejectWithValue({ 
        category, 
        error: error.response?.data || `Failed to fetch ${category} apps` 
      });
    }
  }
);

export const searchApps = createAsyncThunk(
  'apps/search',
  async (params, { rejectWithValue }) => {
    try {
      const response = await endpoints.apps.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to search apps');
    }
  }
);

// Helper function to handle loading state
const setPending = (state, category) => {
  state[category].loading = true;
  state[category].error = null;
};

// Helper function to handle error state
const setRejected = (state, category, action) => {
  state[category].loading = false;
  state[category].error = action.payload;
};

// Create the slice
const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    clearAppErrors: (state) => {
      // Clear all error states
      Object.keys(state).forEach(key => {
        if (state[key].error) {
          state[key].error = null;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllApps
      .addCase(fetchAllApps.pending, (state) => {
        setPending(state, 'allApps');
      })
      .addCase(fetchAllApps.fulfilled, (state, action) => {
        state.allApps.loading = false;
        state.allApps.data = action.payload.apps;
        state.allApps.total = action.payload.total;
      })
      .addCase(fetchAllApps.rejected, (state, action) => {
        setRejected(state, 'allApps', action);
      })
      
      // Handle searchApps
      .addCase(searchApps.pending, (state) => {
        setPending(state, 'searchResults');
      })
      .addCase(searchApps.fulfilled, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.data = action.payload.apps;
        state.searchResults.total = action.payload.total;
      })
      .addCase(searchApps.rejected, (state, action) => {
        setRejected(state, 'searchResults', action);
      })
      
      // Handle fetchAppById
      .addCase(fetchAppById.pending, (state) => {
        state.currentApp.loading = true;
        state.currentApp.error = null;
      })
      .addCase(fetchAppById.fulfilled, (state, action) => {
        state.currentApp.loading = false;
        state.currentApp.data = action.payload.app;
      })
      .addCase(fetchAppById.rejected, (state, action) => {
        state.currentApp.loading = false;
        state.currentApp.error = action.payload;
      })
      
      // Handle fetchAppsByCategory
      .addCase(fetchAppsByCategory.pending, (state, action) => {
        const { meta } = action;
        const category = meta.arg.category;
        
        // Map API category to state property
        const categoryMap = {
          'mac': 'macApps',
          'smac': 'macSoftware',
          'pc': 'pcApps',
          'spc': 'pcSoftware',
          'android': 'androidApps',
          'sandroid': 'androidSoftware',
          'ps2': 'ps2Apps',
          'ps3': 'ps3Apps',
          'ps4': 'ps4Apps',
          'ppsspp': 'ppssppApps',
        };
        
        const stateCategory = categoryMap[category] || category;
        
        if (state[stateCategory]) {
          setPending(state, stateCategory);
        }
      })
      .addCase(fetchAppsByCategory.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        
        // Map API category to state property
        const categoryMap = {
          'mac': 'macApps',
          'smac': 'macSoftware',
          'pc': 'pcApps',
          'spc': 'pcSoftware',
          'android': 'androidApps',
          'sandroid': 'androidSoftware',
          'ps2': 'ps2Apps',
          'ps3': 'ps3Apps',
          'ps4': 'ps4Apps',
          'ppsspp': 'ppssppApps',
        };
        
        const stateCategory = categoryMap[category] || category;
        
        if (state[stateCategory]) {
          state[stateCategory].loading = false;
          state[stateCategory].data = data.apps;
          state[stateCategory].total = data.total;
        }
      })
      .addCase(fetchAppsByCategory.rejected, (state, action) => {
        const { category, error } = action.payload;
        
        // Map API category to state property
        const categoryMap = {
          'mac': 'macApps',
          'smac': 'macSoftware',
          'pc': 'pcApps',
          'spc': 'pcSoftware',
          'android': 'androidApps',
          'sandroid': 'androidSoftware',
          'ps2': 'ps2Apps',
          'ps3': 'ps3Apps',
          'ps4': 'ps4Apps',
          'ppsspp': 'ppssppApps',
        };
        
        const stateCategory = categoryMap[category] || category;
        
        if (state[stateCategory]) {
          setRejected(state, stateCategory, { payload: error });
        }
      });
  },
});

export const { clearAppErrors } = appsSlice.actions;

export default appsSlice.reducer;
