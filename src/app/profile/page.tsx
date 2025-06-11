'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, UpdateProfileData } from '@/services/api';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<UpdateProfileData>({
    name: '',
    email: '',
    username: '',
    phone: '',
    age: 0,
    maritalStatus: '',
    children: 0,
    education: '',
    address: '',
    city: '',
    state: '',
    country: '',
    profilePicture: ''
  });
  const [profileImage, setProfileImage] = useState<string>('/images/no-profile-pic.svg');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setError(null);
        const response = await api.getCurrentUser();
        console.log('Profile response:', response);
        console.log("ms", response.maritalStatus);
        
        if (response) {
          const updatedProfileData = {
            name: response.name || '',
            email: response.email || '',
            username: response.username || '',
            phone: response.phone || '',
            age: response.age || 0,
            maritalStatus: response.maritalStatus || '',
            children: response.children || 0,
            education: response.education || '',
            address: response.address || '',
            city: response.city || '',
            state: response.state || '',
            country: response.country || '',
            profilePicture: response.profilePicture || ''
          };
          console.log("Updated profile data:", updatedProfileData);
          setProfileData(updatedProfileData);
          setProfileImage(api.getImageUrl(response.profilePicture));
        } else {
          setError('Failed to load profile data');
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'children' ? parseInt(value) || 0 : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await api.uploadProfilePicture(formData);
      if (response.profilePicture) {
        // Update both profileData and profileImage states
        setProfileData(prev => ({
          ...prev,
          profilePicture: response.profilePicture
        }));
        setProfileImage(response.profilePicture); // Update the displayed image immediately
      } else {
        throw new Error('No profile picture URL in response');
      }
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setError(null);
      const updatedData = {
        ...profileData,
        profilePicture: ''
      };
      await api.updateProfile(updatedData);
      setProfileImage('/images/no-profile-pic.svg');
      setProfileData(prev => ({ ...prev, profilePicture: '/images/no-profile-pic.svg' }));
    } catch (error: any) {
      console.error('Error removing profile picture:', error);
      setError(error.message || 'Failed to remove profile picture');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await api.updateProfile(profileData);
      setIsEditing(false);
      // Refresh profile data after update
      const response = await api.getCurrentUser();
      if (response) {
        setProfileData({
          name: response.name || '',
          email: response.email || '',
          username: response.username || '',
          phone: response.phone || '',
          age: response.age || 0,
          maritalStatus: response.maritalStatus || '',
          children: response.children || 0,
          education: response.education || '',
          address: response.address || '',
          city: response.city || '',
          state: response.state || '',
          country: response.country || '',
          profilePicture: response.profilePicture || ''
        });
        setProfileImage(api.getImageUrl(response.profilePicture));
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  if (loading || isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              {isEditing && (
                <div className="flex flex-col items-center">
                  <div className="flex gap-2">
                    <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                      {isUploading ? 'Uploading...' : 'Change Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    {profileData.profilePicture && !profileData.profilePicture.includes('no-profile-pic.svg') && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profileData.age || 0}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your age"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Marital Status</label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={profileData.maritalStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-gray-900 placeholder-gray-400 disabled:bg-gray-50 text-sm"
                    disabled={!isEditing}
                  >
                    <option value="">Select status</option>
                    <option value="divorced">Divorced</option>
                    <option value="widow">Widow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Number of Children</label>
                  <input
                    type="number"
                    name="children"
                    value={profileData.children || 0}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter number of children"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Education</label>
                  <select
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-gray-900 placeholder-gray-400 disabled:bg-gray-50 text-sm"
                    disabled={!isEditing}
                  >
                    <option value="high_school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your city"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your state"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your country"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 disabled:bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 