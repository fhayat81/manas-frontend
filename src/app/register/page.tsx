'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { api } from '@/services/api';
import { Gender, MaritalStatus, Education, RegisterData } from '@/services/api';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  age: string;
  gender: string;
  marital_status: string;
  education: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  children_count: string;
  profile_photo: string | null;
}

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    full_name: '',
    age: '',
    gender: '',
    marital_status: '',
    education: '',
    location: {
      address: '',
      city: '',
      country: ''
    },
    children_count: '0',
    profile_photo: null
  });
  const [tempProfilePicture, setTempProfilePicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Profile picture must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Compress image before converting to base64
    const compressImage = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new window.Image();
          img.onload = () => {
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Could not get canvas context'));
              return;
            }

            // Calculate new dimensions (max 800px width/height)
            let width = img.width;
            let height = img.height;
            const maxSize = 800;
            
            if (width > height && width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            } else if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to base64 with reduced quality
            const base64String = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
            resolve(base64String);
          };
          img.onerror = () => {
            reject(new Error('Failed to load image'));
          };
          img.src = e.target?.result as string;
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      const compressedBase64 = await compressImage(file);
      setTempProfilePicture(compressedBase64);
      // Update form data with the compressed profile photo
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        profile_photo: compressedBase64
      }));
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error('Failed to process image');
    }
  };

  const handleRemovePhoto = () => {
    setTempProfilePicture(null);
    setFormData((prev: RegisterFormData) => ({
      ...prev,
      profile_photo: null
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirm_password) {
        throw new Error('Passwords do not match');
      }

      // Validate required fields
      const requiredFields = ['username', 'email', 'password', 'full_name', 'age', 'gender', 'marital_status', 'education'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof RegisterFormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate location fields
      if (!formData.location.address || !formData.location.city || !formData.location.country) {
        throw new Error('Please fill in all location fields');
      }

      const { confirm_password, ...registrationData } = formData;
      
      // Format data for API
      const formattedData: RegisterData = {
        ...registrationData,
        age: parseInt(registrationData.age),
        children_count: parseInt(registrationData.children_count),
        gender: registrationData.gender as Gender,
        marital_status: registrationData.marital_status as MaritalStatus,
        education: registrationData.education as Education,
        location: {
          address: registrationData.location.address,
          city: registrationData.location.city,
          country: registrationData.location.country
        },
        profile_photo: registrationData.profile_photo || '' // Convert null to empty string
      };

      await register(formattedData);
      toast.success('Registration successful!');
      router.push('/login');
    } catch (err) {
      console.error('Form validation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // Return null on server-side to prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={tempProfilePicture || '/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-4">
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
                {tempProfilePicture && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="md:col-span-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  maxLength={30}
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Choose a username"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Create a password (min. 6 characters)"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="confirm_password">Confirm Password *</Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Confirm your password"
                  className="mt-1"
                />
              </div>

              {/* Additional Information */}
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your age"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select gender</option>
                  <option value={Gender.MALE}>Male</option>
                  <option value={Gender.FEMALE}>Female</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="marital_status">Marital Status *</Label>
                <Select
                  id="marital_status"
                  name="marital_status"
                  required
                  value={formData.marital_status}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select status</option>
                  <option value={MaritalStatus.DIVORCEE}>Divorcee</option>
                  <option value={MaritalStatus.WIDOW}>Widow</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="education">Education *</Label>
                <Select
                  id="education"
                  name="education"
                  required
                  value={formData.education}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select education</option>
                  <option value={Education.NONE}>None</option>
                  <option value={Education.PRIMARY_SCHOOL}>Primary School</option>
                  <option value={Education.HIGH_SCHOOL}>High School</option>
                  <option value={Education.BACHELORS}>Bachelor's Degree</option>
                  <option value={Education.MASTERS}>Master's Degree</option>
                  <option value={Education.PHD}>PhD</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="children_count">Number of Children</Label>
                <Input
                  id="children_count"
                  name="children_count"
                  type="number"
                  min="0"
                  value={formData.children_count}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter number of children"
                  className="mt-1"
                />
              </div>

              {/* Location Information */}
              <div className="md:col-span-2">
                <Label htmlFor="location.address">Address *</Label>
                <Input
                  id="location.address"
                  name="location.address"
                  type="text"
                  required
                  value={formData.location.address}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your address"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location.city">City *</Label>
                <Input
                  id="location.city"
                  name="location.city"
                  type="text"
                  required
                  value={formData.location.city}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your city"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location.country">Country *</Label>
                <Input
                  id="location.country"
                  name="location.country"
                  type="text"
                  required
                  value={formData.location.country}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your country"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
                  Sign in here
                </Link>
              </p>
            </div>

            <p className="text-xs text-gray-500 text-center">
              * Required fields
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 