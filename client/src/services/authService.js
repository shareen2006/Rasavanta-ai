import apiClient from './api.js';

const AUTH_USER_KEY = 'rasavanta_user';
const AUTH_TOKEN_KEY = 'rasavanta_auth_token';
const USERS_STORE_KEY = 'rasavanta_registered_accounts';

// Seed default verified test chef
const getStoredAccounts = () => {
  try {
    const raw = localStorage.getItem(USERS_STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse error
  }
  return [
    {
      id: 'usr-demo-chef',
      name: 'Chef Rasavanta',
      email: 'chef.rasavanta@example.com',
      password: 'TasteIntelligence2026',
      role: 'Master Chef',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joinedDate: '2026-01-15'
    }
  ];
};

const saveStoredAccounts = (accounts) => {
  try {
    localStorage.setItem(USERS_STORE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to persist accounts:', err);
  }
};

export const authService = {
  async login(credentials) {
    const { email, password } = credentials;

    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (apiError) {
      // Offline fallback: validate against seeded demo chef and local registered accounts
      await new Promise((resolve) => setTimeout(resolve, 500));

      const accounts = getStoredAccounts();
      const normalizedEmail = (email || '').trim().toLowerCase();
      const found = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

      // Check if credentials match
      if (!found || found.password !== password) {
        const error = new Error('Invalid email or password. Please verify credentials.');
        error.code = 'INVALID_CREDENTIALS';
        throw error;
      }

      const userSession = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role || 'Home Chef',
        avatar: found.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        joinedDate: found.joinedDate
      };

      const token = `jwt_token_${found.id}_${Date.now()}`;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userSession));
      return { user: userSession, token };
    }
  },

  async register(userData) {
    const { name, email, password } = userData;

    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (apiError) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const accounts = getStoredAccounts();
      const normalizedEmail = (email || '').trim().toLowerCase();

      // Check for duplicate email
      const exists = accounts.some((acc) => acc.email.toLowerCase() === normalizedEmail);
      if (exists) {
        const error = new Error('An account with this email address already exists.');
        error.code = 'DUPLICATE_EMAIL';
        throw error;
      }

      const newAccount = {
        id: 'usr-' + Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password: password,
        role: 'Home Chef',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        joinedDate: new Date().toISOString().split('T')[0]
      };

      accounts.push(newAccount);
      saveStoredAccounts(accounts);

      const userSession = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        avatar: newAccount.avatar,
        joinedDate: newAccount.joinedDate
      };

      const token = `jwt_token_${newAccount.id}_${Date.now()}`;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userSession));
      return { user: userSession, token };
    }
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }
};
