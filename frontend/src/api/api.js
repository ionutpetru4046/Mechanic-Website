import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // your backend base url
});

// Add JWT token to request automatically if exists
API.interceptors.request.use((req) => {
    // If the request is for login or registration, do not add the token
    if (req.url.endsWith("/auth/login") || req.url.endsWith("/auth/register")) {
        return req;
    }

    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;