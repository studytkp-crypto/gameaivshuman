import React, { createContext, useContext, useState, useEffect } from 'react';
import { API } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hvai_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.getMe();
        setUser(res.user);
      } catch (err) {
        console.warn('Session expired:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.login(email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('hvai_token', res.token);
    return res;
  };

  const register = async (email, password, name) => {
    const res = await API.register(email, password, name);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('hvai_token', res.token);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('hvai_token');
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await API.getMe();
      setUser(res.user);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
