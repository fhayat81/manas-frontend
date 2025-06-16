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

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [tempProfilePicture, setTempProfilePicture] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateProfileData>({
    full_name: authUser?.full_name || '',
    email: authUser?.email || '',
    age: authUser?.age,
    gender: authUser?.gender,
    marital_status: authUser?.marital_status,
    education: authUser?.education,
    profession: authUser?.profession || '',
    phone_number: authUser?.phone_number || '',
    interests_hobbies: authUser?.interests_hobbies || '',
    brief_personal_description: authUser?.brief_personal_description || '',
    location: {
      city: authUser?.location?.city || '',
      state: authUser?.location?.state || ''
    },
    children_count: authUser?.children_count
  });

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    } else if (authUser) {
      setFormData({
        full_name: authUser.full_name || '',
        email: authUser.email || '',
        age: authUser.age,
        gender: authUser.gender,
        marital_status: authUser.marital_status,
        education: authUser.education,
        profession: authUser.profession || '',
        phone_number: authUser.phone_number || '',
        interests_hobbies: authUser.interests_hobbies || '',
        brief_personal_description: authUser.brief_personal_description || '',
        location: {
          city: authUser.location?.city || '',
          state: authUser.location?.state || ''
        },
        children_count: authUser.children_count
      });
      setProfilePicture(authUser.profile_photo || null);
      setTempProfilePicture(null);
    }
  }, [authUser, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationKey = name.split('.')[1] as keyof typeof formData.location;
      setFormData(prev => ({
        ...prev,
        location: {
          ...(prev.location || { city: '', state: '' }),
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
        // Skip empty values except for profile_photo and optional text fields
        if (value === '' && key !== 'profile_photo' && 
            key !== 'interests_hobbies' && key !== 'brief_personal_description') return;

        // Handle location fields
        if (key === 'location' && typeof value === 'object') {
          const location = value as { city: string; state: string };
          if (location.city || location.state) {
            updateData.location = {
              city: location.city || '',
              state: location.state || ''
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
        if (key === 'full_name' || key === 'email' || 
            key === 'gender' || key === 'marital_status' || key === 'education' ||
            key === 'profession' || key === 'phone_number' || 
            key === 'interests_hobbies' || key === 'brief_personal_description') {
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
        full_name: authUser.full_name || '',
        email: authUser.email || '',
        age: authUser.age,
        gender: authUser.gender,
        marital_status: authUser.marital_status,
        education: authUser.education,
        profession: authUser.profession || '',
        phone_number: authUser.phone_number || '',
        interests_hobbies: authUser.interests_hobbies || '',
        brief_personal_description: authUser.brief_personal_description || '',
        location: {
          city: authUser.location?.city || '',
          state: authUser.location?.state || ''
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
              Your Profile
            </h1>
            <p className="text-base text-gray-600">
              Manage your personal information and preferences
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-indigo-600">Profile Information</h2>
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
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-200">
                  {(tempProfilePicture || profilePicture) ? (
                    <Image
                      src={tempProfilePicture || getImageUrl(profilePicture)}
                      alt="Profile"
                      fill
                      className="object-cover"
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
                  <div className="flex space-x-4">
                    <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                    {(tempProfilePicture || profilePicture) && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="w-full">
                <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="full_name" className="text-gray-700">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-gray-700">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      value={formData.age || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your age"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender" className="text-gray-700">Gender</Label>
                    <Select
                      id="gender"
                      name="gender"
                      value={formData.gender || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select gender</option>
                      <option value={Gender.MALE}>Male</option>
                      <option value={Gender.FEMALE}>Female</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location.city" className="text-gray-700">City</Label>
                    <Input
                      id="location.city"
                      name="location.city"
                      type="text"
                      value={formData.location?.city || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your city"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location.state" className="text-gray-700">State</Label>
                    <Input
                      id="location.state"
                      name="location.state"
                      type="text"
                      value={formData.location?.state || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your state"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profession" className="text-gray-700">Profession</Label>
                    <Input
                      id="profession"
                      name="profession"
                      type="text"
                      value={formData.profession}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your profession"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="education" className="text-gray-700">Education</Label>
                    <Select
                      id="education"
                      name="education"
                      value={formData.education || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select education</option>
                      <option value={Education.NONE}>None</option>
                      <option value={Education.PRIMARY_SCHOOL}>Primary School</option>
                      <option value={Education.HIGH_SCHOOL}>High School</option>
                      <option value={Education.BACHELORS}>Bachelor&apos;s Degree</option>
                      <option value={Education.MASTERS}>Master&apos;s Degree</option>
                      <option value={Education.PHD}>PhD</option>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact & Status */}
              <div className="w-full mt-8">
                <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Contact & Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone_number" className="text-gray-700">Phone Number</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="marital_status" className="text-gray-700">Marital Status</Label>
                    <Select
                      id="marital_status"
                      name="marital_status"
                      value={formData.marital_status || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Status</option>
                      <option value={MaritalStatus.DIVORCEE}>Divorcee</option>
                      <option value={MaritalStatus.WIDOW}>Widow</option>
                      <option value={MaritalStatus.SINGLE}>Single</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="children_count" className="text-gray-700">Number of Children</Label>
                    <Input
                      id="children_count"
                      name="children_count"
                      type="number"
                      min="0"
                      value={formData.children_count ?? 0}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter number of children"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="w-full mt-8">
                <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Additional Information</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="interests_hobbies" className="text-gray-700">Interests and Hobbies</Label>
                    <Input
                      id="interests_hobbies"
                      name="interests_hobbies"
                      type="text"
                      value={formData.interests_hobbies}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="e.g., Reading, Gardening, Music"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="brief_personal_description" className="text-gray-700">Brief Personal Description</Label>
                    <textarea
                      id="brief_personal_description"
                      name="brief_personal_description"
                      rows={4}
                      value={formData.brief_personal_description}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself and what you're looking for..."
                      className="mt-1 block w-full rounded-md shadow-sm bg-white border-gray-300 text-gray-600 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm px-2 py-1"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Status */}
              <div className="w-full mt-8">
                <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Profile Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                      authUser?.is_verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {authUser?.is_verified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-gray-900">
                      {authUser?.created_at ? new Date(authUser.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-600 hover:bg-red-700 text-white"
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