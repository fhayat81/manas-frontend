const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface RegisterData {
  username: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  maritalStatus: 'widow' | 'divorced';
  children: number;
  education: 'high_school' | 'bachelors' | 'masters' | 'phd' | 'other';
  address: string;
  city: string;
  state: string;
  country: string;
  profilePicture?: File;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: {
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
  };
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  age?: number;
  maritalStatus?: 'divorced' | 'widowed' | 'single' | 'married' | '';
  children?: number;
  education?: 'high-school' | 'bachelors' | 'masters' | 'phd' | 'other' | '';
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  profilePicture?: string;
}

// Helper function to get full image URL
const getImageUrl = (path: string) => {
  if (!path) return '/images/no-profile-pic.svg';
  if (path === '/images/no-profile-pic.svg') return path;
  return `${BACKEND_URL}${path}`;
};

export const api = {
  async register(data: FormData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: data // Send as FormData to handle file upload
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('Attempting login with email:', data.email);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Login failed:', responseData);
        throw new Error(responseData.message || 'Login failed');
      }

      console.log('Login successful');
      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response:', await response.text());
        throw new Error('Server returned non-JSON response');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      return response.json();
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  async uploadProfilePicture(formData: FormData): Promise<{ profilePicture: string }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`${API_URL}/auth/profile/picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response:', await response.text());
        throw new Error('Server returned non-JSON response');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload profile picture');
      }

      return response.json();
    } catch (error) {
      console.error('Profile picture upload error:', error);
      throw error;
    }
  },

  getImageUrl, // Export the helper function
}; 