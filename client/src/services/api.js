import axios from 'axios';

// Detect browser environment and production host
const isBrowser = typeof window !== 'undefined';
const isProduction =
  isBrowser &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1';

// Prioritize explicitly set env variable, then intelligent production/local default
const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  (isProduction ? 'https://rasavanta-ai.onrender.com/api/v1' : 'http://localhost:5000/api/v1');

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
      // Purge legacy unverified mock tokens automatically
      if (token.startsWith('jwt_token_')) {
        localStorage.removeItem('rasavanta_auth_token');
        localStorage.removeItem('rasavanta_user');
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error reporting and session invalidation
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend reports expired or invalid token, safely clear stale credentials
    if (error.response && error.response.status === 401) {
      const code = error.response.data?.code;
      if (code === 'TOKEN_EXPIRED' || code === 'INVALID_TOKEN' || code === 'INVALID_CLAIMS') {
        localStorage.removeItem('rasavanta_auth_token');
        localStorage.removeItem('rasavanta_user');
      }
    }
    if (!error.response) {
      console.info('Backend server is offline or unreachable; using local demo data store.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
