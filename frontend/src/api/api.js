import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add JWT token to request automatically if exists
API.interceptors.request.use((req) => {
  if (req.url.endsWith('/auth/login') || req.url.endsWith('/auth/register')) {
    return req;
  }

  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
