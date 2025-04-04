import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (e.g., 401 unauthorized, etc.)
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Apps endpoints
  apps: {
    getAll: (params) => api.get('/api/apps/all', { params }),
    getById: (id) => api.get(`/api/apps/get/${id}`),
    getByCategory: (category, params) => api.get(`/api/apps/category/${category}`, { params }),
    create: (formData) => api.post('/api/apps/admin/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, formData) => api.put(`/api/apps/admin/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/api/apps/delete/${id}`),
  },
  
  // User endpoints
  user: {
    login: (credentials) => api.post('/api/user/signin', credentials),
    register: (userData) => api.post('/api/user/signup', userData),
    getCurrentUser: () => api.get('/api/user'),
  },
};

export default api;
