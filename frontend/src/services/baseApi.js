import axios from 'axios';

// Prefer Vite env var; fallback to localhost for dev
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect immediately - let the router handle it
      localStorage.removeItem('token');
      // Dispatch logout action instead of redirecting
      if (window.store) {
        window.store.dispatch('auth/logout');
      }
    }
    return Promise.reject(error);
  }
);

export default api;