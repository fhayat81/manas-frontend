'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    maritalStatus: 'divorced',
    children: '',
    education: 'high-school',
    address: '',
    city: '',
    state: '',
    country: ''
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string>('/images/no-profile-pic.svg');
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfilePicture(file);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Error processing image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.entries(registrationData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      // Append profile picture if exists
      if (profilePicture) {
        formDataToSend.append('profilePicture', profilePicture);
      }

      await register(formDataToSend);
      router.push('/profile');
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-gray-900 placeholder-gray-400";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create an Account</h1>
            
            {error && (
              <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                    {isUploading ? 'Uploading...' : 'Add Profile Picture (Optional)'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Choose a username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    placeholder="Create a password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    placeholder="Confirm your password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-xs font-medium text-gray-700">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    required
                    min="18"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Marital Status */}
                <div>
                  <label htmlFor="maritalStatus" className="block text-xs font-medium text-gray-700">
                    Marital Status *
                  </label>
                  <select
                    name="maritalStatus"
                    id="maritalStatus"
                    required
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                  >
                    <option value="">Select status</option>
                    <option value="widow">Widow</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>

                {/* Children */}
                <div>
                  <label htmlFor="children" className="block text-xs font-medium text-gray-700">
                    Number of Children *
                  </label>
                  <input
                    type="number"
                    name="children"
                    id="children"
                    required
                    min="0"
                    value={formData.children}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Enter number of children"
                  />
                </div>

                {/* Education */}
                <div>
                  <label htmlFor="education" className="block text-xs font-medium text-gray-700">
                    Education *
                  </label>
                  <select
                    name="education"
                    id="education"
                    required
                    value={formData.education}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                  >
                    <option value="">Select education level</option>
                    <option value="high_school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-medium text-gray-700">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Enter your street address"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs font-medium text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Enter your city"
                  />
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-xs font-medium text-gray-700">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Enter your state or province"
                  />
                </div>

                {/* Country */}
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-xs font-medium text-gray-700">
                    Country *
                  </label>
                  <select
                    name="country"
                    id="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 disabled:opacity-50"
                  >
                    <option value="">Select your country</option>
                    <option value="india">India</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in here
                  </Link>
                </p>
              </div>

              <p className="mt-4 text-xs text-gray-500 text-center">
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 