import axios from 'axios';

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60s timeout for generative AI responses
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request interceptor to attach JWT token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rasavanta_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error reporting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend isn't reachable (e.g., in standalone frontend demo mode), pass error cleanly
    if (!error.response) {
      console.info('Backend server is offline or unreachable; using local demo data store.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
