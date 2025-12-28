import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

// Confession APIs
export const confessionAPI = {
  getAll: (page = 1, category = '') => api.get(`/confessions?page=${page}&category=${category}`),
  getById: (id) => api.get(`/confessions/${id}`),
  create: (confessionData) => api.post('/confessions', confessionData),
  delete: (id) => api.delete(`/confessions/${id}`),
  like: (id) => api.post(`/confessions/${id}/like`),
  addComment: (id, commentData) => api.post(`/confessions/${id}/comments`, commentData),
  getComments: (id) => api.get(`/confessions/${id}/comments`),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getUserConfessions: () => api.get('/users/confessions'),
};

export default api;
