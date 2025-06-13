'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, User, Gender, MaritalStatus, Education } from '@/services/api';

interface RegisterData {
  username: string;
  full_name: string;
  email: string;
  password: string;
  age: number;
  gender: Gender;
  marital_status: MaritalStatus;
  education: Education;
  location: {
    address: string;
    city: string;
    country: string;
  };
  children_count: number;
  profile_photo: string;
}

interface LoginData {
  username_or_email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await api.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await api.register(data);
      // Don't store token or set user since email needs to be verified first
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const login = async (data: LoginData) => {
    try {
      const response = await api.login(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
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