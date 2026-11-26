import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = authService.getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.name || 'Chef'}!`);
      return res;
    } catch (err) {
      toast.error(err.message || 'Sign in failed. Please verify credentials.');
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await authService.register({ name, email, password });
      setUser(res.user);
      if (res.emailSent) {
        toast.success('Registration successful! Please check your inbox to verify your email.', { duration: 5000 });
      } else {
        toast.success('Welcome to Rasavanta AI! Your account is active.');
      }
      return res;
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
      throw err;
    }
  };

  const googleLogin = async (credential) => {
    try {
      const res = await authService.googleLogin(credential);
      setUser(res.user);
      toast.success(`Welcome, ${res.user.name || 'Chef'}!`);
      return res;
    } catch (err) {
      toast.error(err.message || 'Google sign-in failed. Please try again.');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Signed out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
