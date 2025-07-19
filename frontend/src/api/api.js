import axios from 'axios';

const baseURL =
  import.meta.env.VITE_ENV === 'production'
    ? import.meta.env.VITE_PROD_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL;

const API = axios.create({
  baseURL,
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
