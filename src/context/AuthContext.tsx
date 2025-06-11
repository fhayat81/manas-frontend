'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, RegisterData, LoginData, AuthResponse } from '@/services/api';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  age: number;
  maritalStatus: 'widow' | 'divorced';
  children: number;
  education: 'high_school' | 'bachelors' | 'masters' | 'phd' | 'other';
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: FormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
      setToken(localStorage.getItem('token'));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setError(null);
      const response = await api.login(data);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (data: FormData) => {
    try {
      setError(null);
      const response = await api.register(data);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 