import { configureStore } from '@reduxjs/toolkit';
import appsReducer from './slices/appsSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    apps: appsReducer,
    user: userReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
