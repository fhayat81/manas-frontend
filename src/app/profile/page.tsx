'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { api, UpdateProfileData, getImageUrl, Gender, MaritalStatus, Education } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [tempProfilePicture, setTempProfilePicture] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateProfileData>({
    username: authUser?.username || '',
    full_name: authUser?.full_name || '',
    email: authUser?.email || '',
    age: authUser?.age,
    gender: authUser?.gender,
    marital_status: authUser?.marital_status,
    education: authUser?.education,
    location: {
      address: authUser?.location?.address || '',
      city: authUser?.location?.city || '',
      country: authUser?.location?.country || ''
    },
    children_count: authUser?.children_count
  });

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    } else if (authUser) {
      setFormData({
        username: authUser.username || '',
        full_name: authUser.full_name || '',
        email: authUser.email || '',
        age: authUser.age,
        gender: authUser.gender,
        marital_status: authUser.marital_status,
        education: authUser.education,
        location: {
          address: authUser.location?.address || '',
          city: authUser.location?.city || '',
          country: authUser.location?.country || ''
        },
        children_count: authUser.children_count
      });
      setProfilePicture(authUser.profile_photo || null);
      setTempProfilePicture(null);
    }
  }, [authUser, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationKey = name.split('.')[1] as keyof typeof formData.location;
      setFormData(prev => ({
        ...prev,
        location: {
          ...(prev.location || { address: '', city: '', country: '' }),
          [locationKey]: value
        }
      }));
    } else if (name === 'age' || name === 'children_count') {
      // Handle numeric fields
      const numValue = Number(value);
      if (isNaN(numValue)) {
        toast.error(`${name === 'age' ? 'Age' : 'Children count'} must be a number`);
        return;
      }
      if (name === 'age' && numValue < 18) {
        toast.error('Age must be at least 18');
        return;
      }
      if (name === 'children_count' && numValue < 0) {
        toast.error('Children count cannot be negative');
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else {
      setFormData(prev => ({
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
        const img = new window.Image();
        img.src = URL.createObjectURL(file);
        
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
      });
    };

    try {
      const compressedBase64 = await compressImage(file);
      setTempProfilePicture(compressedBase64);
      // Update form data with the compressed profile photo
      setFormData(prev => ({
        ...prev,
        profile_photo: compressedBase64
      }));
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error('Failed to process image');
    }
  };

  const handleRemovePhoto = () => {
    setTempProfilePicture('');
    // Update form data to remove profile photo
    setFormData(prev => ({
      ...prev,
      profile_photo: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Starting profile update...');
      console.log('Current form data:', formData);

      const updateData: UpdateProfileData = {};
      let hasChanges = false;

      // Process each field
      Object.entries(formData).forEach(([key, value]) => {
        // Skip empty values except for profile_photo
        if (value === '' && key !== 'profile_photo') return;

        // Handle location fields
        if (key === 'location' && typeof value === 'object') {
          const location = value as { address: string; city: string; country: string };
          if (location.address || location.city || location.country) {
            updateData.location = {
              address: location.address || '',
              city: location.city || '',
              country: location.country || ''
            };
            hasChanges = true;
            console.log('Added location fields:', updateData.location);
          }
          return;
        }

        // Handle numeric fields
        if (key === 'age' || key === 'children_count') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            updateData[key as 'age' | 'children_count'] = numValue;
            hasChanges = true;
            console.log(`Added numeric field ${key}:`, numValue);
          }
          return;
        }

        // Handle profile photo
        if (key === 'profile_photo') {
          updateData.profile_photo = value.toString();
          hasChanges = true;
          console.log('Added profile photo:', value ? 'has value' : 'empty');
          return;
        }

        // Handle other fields
        if (key === 'username' || key === 'full_name' || key === 'email' || 
            key === 'gender' || key === 'marital_status' || key === 'education') {
          updateData[key] = value.toString();
          hasChanges = true;
          console.log(`Added field ${key}:`, value);
        }
      });

      // Check if we have any changes
      if (!hasChanges) {
        console.warn('No changes detected in form data');
        toast.error('No changes to save');
        return;
      }

      console.log('Sending profile update request with data:', updateData);

      // Send the update request
      const response = await api.updateProfile(updateData);
      console.log('Profile update response:', response);

      // Update local state
      setProfilePicture(response.profile_photo || null);
      setTempProfilePicture(null);
      setIsEditing(false);
      toast.success('Profile updated successfully');

    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (authUser) {
      setFormData({
        username: authUser.username || '',
        full_name: authUser.full_name || '',
        email: authUser.email || '',
        age: authUser.age,
        gender: authUser.gender,
        marital_status: authUser.marital_status,
        education: authUser.education,
        location: {
          address: authUser.location?.address || '',
          city: authUser.location?.city || '',
          country: authUser.location?.country || ''
        },
        children_count: authUser.children_count
      });
    }
    setTempProfilePicture(null);
    setIsEditing(false);
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-600">Profile</h1>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Edit Profile
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Picture */}
                <div className="md:col-span-2 flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    {(tempProfilePicture || profilePicture) ? (
                      <Image
                        src={tempProfilePicture || getImageUrl(profilePicture)}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">
                          {formData.full_name?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex gap-4">
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className="hidden"
                          id="profile-picture"
                        />
                        <Button
                          type="button"
                          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={() => document.getElementById('profile-picture')?.click()}
                        >
                          Change Photo
                        </Button>
                      </div>
                      {(tempProfilePicture || profilePicture) && (
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={handleRemovePhoto}
                        >
                          Remove Photo
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Basic Information */}
                <div className="md:col-span-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    value={formData.age || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  >
                    <option value="">Select gender</option>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.FEMALE}>Female</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="marital_status">Marital Status</Label>
                  <Select
                    id="marital_status"
                    name="marital_status"
                    value={formData.marital_status || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  >
                    <option value="">Select status</option>
                    <option value={MaritalStatus.DIVORCEE}>Divorcee</option>
                    <option value={MaritalStatus.WIDOW}>Widow</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Select
                    id="education"
                    name="education"
                    value={formData.education || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  >
                    <option value="">Select education</option>
                    <option value={Education.HIGH_SCHOOL}>High School</option>
                    <option value={Education.BACHELORS}>Bachelor&apos;s</option>
                    <option value={Education.MASTERS}>Master&apos;s</option>
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
                    value={formData.children_count ?? 0}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                {/* Location Information */}
                <div className="md:col-span-2">
                  <Label htmlFor="location.address">Address</Label>
                  <Input
                    id="location.address"
                    name="location.address"
                    value={formData.location?.address || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="location.city">City</Label>
                  <Input
                    id="location.city"
                    name="location.city"
                    value={formData.location?.city || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="location.country">Country</Label>
                  <Input
                    id="location.country"
                    name="location.country"
                    value={formData.location?.country || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 