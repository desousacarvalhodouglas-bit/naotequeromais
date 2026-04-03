import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    // Mock login for frontend-only demo
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      location: 'São Paulo, SP',
      avatar: 'https://i.pravatar.cc/150?img=68'
    };
    localStorage.setItem('token', 'mock-token-' + Date.now());
    localStorage.setItem('user', JSON.stringify(mockUser));
    setToken('mock-token');
    setUser(mockUser);
    return mockUser;
  };

  const register = async ({ name, email, password, location, phone }) => {
    // Mock registration for frontend-only demo
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      location: location || 'Brasil',
      phone: phone,
      avatar: 'https://i.pravatar.cc/150?img=68'
    };
    localStorage.setItem('token', 'mock-token-' + Date.now());
    localStorage.setItem('user', JSON.stringify(mockUser));
    setToken('mock-token');
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
