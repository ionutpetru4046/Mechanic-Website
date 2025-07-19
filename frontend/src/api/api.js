import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const API = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true, // this is request for cors and cookies
});

// Add JWT token to request automatically if exists
API.interceptors.request.use((req) => {
  if (
    req.url &&
    (req.url.includes('/auth/login') || req.url.includes('/auth/register'))
  ) {
    return req;
  }

  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
