import axios from 'axios';

// Get the base URL from your environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✨ This is the magic part: The Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage before every request is sent
    const token = localStorage.getItem('authToken');

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config; // Allow the request to continue
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;