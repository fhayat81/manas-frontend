// Backend API URL - configured via environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://manas-backend-new.onrender.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://manas-backend-new.onrender.com/api';
// const BACKEND_URL = 'http://localhost:5000';
// const API_URL = 'http://localhost:5000/api';


// Match backend enums
export enum Gender {
  MALE = "male",
  FEMALE = "female"
}

export enum MaritalStatus {
  DIVORCEE = "divorcee",
  WIDOW = "widow",
  SINGLE = "single"
}

export enum Education {
  NONE = "none",
  PRIMARY_SCHOOL = "primary school",
  HIGH_SCHOOL = "high school",
  BACHELORS = "bachelor's",
  MASTERS = "master's",
  PHD = "phd"
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  age: number;
  gender: Gender;
  marital_status: MaritalStatus;
  education: Education;
  profession: string;
  phone_number: string;
  interests_hobbies?: string;
  brief_personal_description?: string;
  location: {
    city: string;
    state: string;
  };
  children_count: number;
  profile_photo: string; // Always a string, empty string if no photo
}

interface LoginData {
  username_or_email: string;
  password: string;
}

export interface User {
  _id: string;
  full_name: string;
  email: string;
  age: number;
  gender: Gender;
  marital_status: MaritalStatus;
  education: Education;
  profession?: string;
  phone_number?: string;
  interests_hobbies?: string;
  brief_personal_description?: string;
  location?: {
    city: string;
    state: string;
  };
  children_count: number;
  profile_photo?: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

interface AuthResponse {
  token: string;
  user: User;
}

export interface UpdateProfileData {
  full_name?: string;
  email?: string;
  age?: number;
  gender?: Gender;
  marital_status?: MaritalStatus;
  education?: Education;
  profession?: string;
  phone_number?: string;
  interests_hobbies?: string;
  brief_personal_description?: string;
  location?: {
    city: string;
    state: string;
  };
  children_count?: number;
  profile_photo?: string; // Only string type - base64 encoded image or empty string
}

export interface ProfilesResponse {
  profiles: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ProfileFilters {
  location?: string;
  ageRange?: string;
  profession?: string;
  search?: string;
  gender?: Gender;
  marital_status?: MaritalStatus;
  education?: Education;
  limit?: number;
  page?: number;
}

// Helper function to get full image URL
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '/images/no-profile-pic.svg';
  if (path.startsWith('data:')) return path; // Return base64 image directly
  if (path === '/images/no-profile-pic.svg') return path;
  return `${BACKEND_URL}${path}`;
};

const getToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

export const api = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('Attempting registration with data:', { ...data, password: '[REDACTED]' });
      console.log('Registration URL:', `${API_URL}/auth/register`);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors'
      });

      console.log('Registration response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        throw new Error(errorData.message || 'Registration failed');
      }

      const responseData = await response.json();
      console.log('Registration successful');
      return responseData;
    } catch (error) {
      console.error('Registration error details:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('Attempting login with:', data.username_or_email);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        throw new Error(errorData.message || 'Login failed');
      }

      const responseData = await response.json();
      console.log('Login successful');
      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async verifyOTP(email: string, otp: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, code: otp }),
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }

      await response.json();
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },

  async resendOTP(email: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user data');
    }

    return response.json();
  },

  async getAllProfiles(filters: ProfileFilters = {}): Promise<ProfilesResponse> {
    try {
      const token = getToken();
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${API_URL}/users/profiles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      console.log('API Request URL:', url);
      console.log('API Request filters:', filters);
      console.log('API Request query params:', queryParams.toString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors'
      });

      console.log('API Response status:', response.status);
      console.log('API Response ok:', response.ok);

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error response:', error);
        throw new Error(error.message || 'Failed to fetch profiles');
      }

      const data = await response.json();
      console.log('API Success response:', data);
      return data;
    } catch (error) {
      console.error('Get all profiles error:', error);
      throw error;
    }
  },

  async getProfileById(id: string): Promise<User> {
    try {
      const token = getToken();
      
      const response = await fetch(`${API_URL}/users/profile/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch profile');
      }

      return response.json();
    } catch (error) {
      console.error('Get profile by ID error:', error);
      throw error;
    }
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    try {
      console.log('Starting profile update request...');
      console.log('API URL:', `${API_URL}/users/profile`);
      console.log('Request method:', 'PUT');
      console.log('Data being sent:', data);

      const token = getToken();
      console.log('Using token:', token ? 'Token exists' : 'No token');

      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Get the raw response text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      // Parse the successful response
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing success response:', e);
        throw new Error('Invalid response from server');
      }

      console.log('Parsed response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  async uploadProfilePicture(formData: FormData): Promise<{ profile_photo: string }> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
      // Check if we're removing the photo
      const isRemoving = formData.get('profile_photo') instanceof Blob && 
                        (formData.get('profile_photo') as Blob).size === 0;

      const response = await fetch(`${API_URL}/users/profile/photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type header for FormData
        },
        body: formData,
        mode: 'cors'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload profile picture');
      }

      const data = await response.json();
      return { profile_photo: isRemoving ? '' : data.profile_photo };
    } catch (error) {
      console.error('Upload profile picture error:', error);
      throw error;
    }
  },

  getImageUrl, // Export the helper function
}; 