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
import { Gender, MaritalStatus, Education, Caste, Religion, RegisterData } from '@/services/api';

interface RegisterFormData {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  education: string;
  location: {
    village: string;
    tehsil: string;
    district: string;
    state: string;
  };
  guardian: {
    name: string;
    contact: string;
  };
  caste: string;
  religion: string;
  divorce_finalized: boolean;
  children: {
    gender: 'boy' | 'girl';
    age: number;
  }[];
  children_count: string;
  profile_photo: string | null;
  profession: string;
  phone_number: string;
  interests_hobbies: string;
  brief_personal_description: string;
}

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirm_password: '',
    full_name: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
    education: '',
    location: {
      village: '',
      tehsil: '',
      district: '',
      state: ''
    },
    guardian: {
      name: '',
      contact: ''
    },
    caste: '',
    religion: '',
    divorce_finalized: false,
    children: [],
    children_count: '0',
    profile_photo: null,
    profession: '',
    phone_number: '',
    interests_hobbies: '',
    brief_personal_description: ''
  });
  const [tempProfilePicture, setTempProfilePicture] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showDivorceField, setShowDivorceField] = useState(false);
  const [showChildrenFields, setShowChildrenFields] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update divorce field visibility based on marital status
  useEffect(() => {
    setShowDivorceField(formData.marital_status === 'divorcee');
    if (formData.marital_status !== 'divorcee') {
      setFormData(prev => ({ ...prev, divorce_finalized: false }));
    }
  }, [formData.marital_status]);

  // Update children fields visibility based on children count
  useEffect(() => {
    const count = parseInt(formData.children_count) || 0;
    setShowChildrenFields(count > 0);
    if (count === 0) {
      setFormData(prev => ({ ...prev, children: [] }));
    } else if (formData.children.length > count) {
      setFormData(prev => ({ ...prev, children: prev.children.slice(0, count) }));
    } else if (formData.children.length < count) {
      const newChildren = [...formData.children];
      for (let i = formData.children.length; i < count; i++) {
        newChildren.push({ gender: 'boy', age: 0 });
      }
      setFormData(prev => ({ ...prev, children: newChildren }));
    }
  }, [formData.children_count, formData.children.length, formData.children]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else if (name.startsWith('guardian.')) {
      const guardianField = name.split('.')[1];
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        guardian: {
          ...prev.guardian,
          [guardianField]: value
        }
      }));
    } else if (name.startsWith('children.')) {
      const parts = name.split('.');
      const childIndex = parseInt(parts[1]);
      const childField = parts[2];
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        children: prev.children.map((child, index) => 
          index === childIndex 
            ? { ...child, [childField]: type === 'number' ? parseInt(value) : value }
            : child
        )
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: RegisterFormData) => ({
        ...prev,
        [name]: checked
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
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['email', 'password', 'confirm_password', 'full_name', 'date_of_birth', 'gender', 'marital_status', 'education', 'profession', 'phone_number', 'guardian.name', 'guardian.contact', 'caste', 'religion'];
      const missingFields = requiredFields.filter(field => {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          const parentObj = formData[parent as keyof RegisterFormData];
          if (typeof parentObj === 'object' && parentObj !== null) {
            return !(parentObj as Record<string, unknown>)[child];
          }
          return true;
        }
        return !formData[field as keyof RegisterFormData];
      });
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate passwords match
      if (formData.password !== formData.confirm_password) {
        throw new Error('Passwords do not match');
      }

      // Validate location fields
      if (!formData.location.village || !formData.location.tehsil || !formData.location.district || !formData.location.state) {
        throw new Error('Please fill in all location fields');
      }

      // Validate guardian fields
      if (!formData.guardian.name || !formData.guardian.contact) {
        throw new Error('Please fill in all guardian fields');
      }

      // Validate terms and conditions checkbox
      if (!acceptTerms) {
        throw new Error('You must accept the Privacy Policy and Terms of Service');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirm_password, ...registrationData } = formData; // Only exclude confirm_password
      
      // Format data for API
      const formattedData: RegisterData = {
        ...registrationData,
        children_count: parseInt(registrationData.children_count),
        gender: registrationData.gender as Gender,
        marital_status: registrationData.marital_status as MaritalStatus,
        education: registrationData.education as Education,
        caste: registrationData.caste as Caste,
        religion: registrationData.religion as Religion,
        location: {
          village: registrationData.location.village,
          tehsil: registrationData.location.tehsil,
          district: registrationData.location.district,
          state: registrationData.location.state
        },
        profile_photo: registrationData.profile_photo || '' // Convert null to empty string
      };

      await register(formattedData);
      toast.success('Registration successful! Please check your email for verification code.');
      router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error('Form validation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // Return null on server-side to prevent hydration mismatch
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
              Join Our Community
            </h1>
            <p className="text-base text-gray-600">
              Take the first step towards finding meaningful connections and support
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-200">
                  <Image
                    src={tempProfilePicture || '/images/no-profile-pic.png'}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex space-x-4">
                  <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
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

              {/* Personal Information */}
              <div className="w-full">
                <h2 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="full_name" className="text-gray-700">Full Name *</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your full name"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date_of_birth" className="text-gray-700">Date of Birth *</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      required
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your date of birth"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender" className="text-gray-700">Gender *</Label>
                    <Select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select gender</option>
                      <option value={Gender.MALE}>Male</option>
                      <option value={Gender.FEMALE}>Female</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location.village" className="text-gray-700">Village *</Label>
                    <Input
                      id="location.village"
                      name="location.village"
                      type="text"
                      required
                      value={formData.location.village}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your village"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location.tehsil" className="text-gray-700">Tehsil *</Label>
                    <Input
                      id="location.tehsil"
                      name="location.tehsil"
                      type="text"
                      required
                      value={formData.location.tehsil}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your tehsil"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location.district" className="text-gray-700">District *</Label>
                    <Input
                      id="location.district"
                      name="location.district"
                      type="text"
                      required
                      value={formData.location.district}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your district"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location.state" className="text-gray-700">State *</Label>
                    <Input
                      id="location.state"
                      name="location.state"
                      type="text"
                      required
                      value={formData.location.state}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your state"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profession" className="text-gray-700">Profession *</Label>
                    <Input
                      id="profession"
                      name="profession"
                      type="text"
                      required
                      value={formData.profession}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your profession"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="education" className="text-gray-700">Education *</Label>
                    <Select
                      id="education"
                      name="education"
                      required
                      value={formData.education}
                      onChange={handleInputChange}
                      disabled={loading}
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

                  <div>
                    <Label htmlFor="guardian.name" className="text-gray-700">Father/Guardian&apos;s Name *</Label>
                    <Input
                      id="guardian.name"
                      name="guardian.name"
                      type="text"
                      required
                      value={formData.guardian.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter father/guardian's name"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guardian.contact" className="text-gray-700">Father/Guardian&apos;s Contact *</Label>
                    <Input
                      id="guardian.contact"
                      name="guardian.contact"
                      type="tel"
                      required
                      value={formData.guardian.contact}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter father/guardian's contact"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  {/* Message for users who do not want to fill guardian details */}
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mt-1">
                      If you do not wish to provide guardian details, you can proceed by entering <span className="font-semibold">"NA"</span> in these fields.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="caste" className="text-gray-700">Caste *</Label>
                    <Select
                      id="caste"
                      name="caste"
                      required
                      value={formData.caste}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select caste</option>
                      <option value={Caste.GENERAL}>General</option>
                      <option value={Caste.OBC}>OBC</option>
                      <option value={Caste.SC}>SC</option>
                      <option value={Caste.ST}>ST</option>
                      <option value={Caste.OTHER}>Other</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="religion" className="text-gray-700">Religion *</Label>
                    <Select
                      id="religion"
                      name="religion"
                      required
                      value={formData.religion}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select religion</option>
                      <option value={Religion.HINDU}>Hindu</option>
                      <option value={Religion.MUSLIM}>Muslim</option>
                      <option value={Religion.CHRISTIAN}>Christian</option>
                      <option value={Religion.SIKH}>Sikh</option>
                      <option value={Religion.BUDDHIST}>Buddhist</option>
                      <option value={Religion.JAIN}>Jain</option>
                      <option value={Religion.OTHER}>Other</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="children_count" className="text-gray-700">Number of Children</Label>
                    <Input
                      id="children_count"
                      name="children_count"
                      type="number"
                      min="0"
                      value={formData.children_count}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter number of children"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Conditional Divorce Field */}
              {showDivorceField && (
                <div className="mt-6">
                  <div className="flex items-center">
                    <input
                      id="divorce_finalized"
                      name="divorce_finalized"
                      type="checkbox"
                      checked={formData.divorce_finalized}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="divorce_finalized" className="ml-2 text-gray-700">
                      Has the divorce been legally finalized?
                    </Label>
                  </div>
                </div>
              )}

              {/* Children Details */}
              {showChildrenFields && formData.children.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Children Details</h3>
                  <div className="space-y-4">
                    {formData.children.map((child, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                        <div>
                          <Label htmlFor={`children.${index}.gender`} className="text-gray-700">Child {index + 1} Gender</Label>
                          <Select
                            id={`children.${index}.gender`}
                            name={`children.${index}.gender`}
                            required
                            value={child.gender}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`children.${index}.age`} className="text-gray-700">Child {index + 1} Age</Label>
                          <Input
                            id={`children.${index}.age`}
                            name={`children.${index}.age`}
                            type="number"
                            min="0"
                            required
                            value={child.age}
                            onChange={handleInputChange}
                            disabled={loading}
                            placeholder="Enter age"
                            className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact & Status */}
              <div className="w-full mt-8">
                <h2 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Contact & Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your email"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone_number" className="text-gray-700">Phone Number *</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      required
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter your phone number"
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="marital_status" className="text-gray-700">Marital Status *</Label>
                    <Select
                      id="marital_status"
                      name="marital_status"
                      required
                      value={formData.marital_status}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="mt-1 bg-white border-gray-300 text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Status</option>
                      <option value={MaritalStatus.DIVORCEE}>Divorcee</option>
                      <option value={MaritalStatus.WIDOW}>Widow</option>
                      <option value={MaritalStatus.SINGLE}>Single</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-700">Password *</Label>
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
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm_password" className="text-gray-700">Confirm Password *</Label>
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
                      className="mt-1 bg-white border-gray-300 text-gray-600 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="w-full mt-8">
                <h2 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Additional Information</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="interests_hobbies" className="text-gray-700">Interests and Hobbies</Label>
                    <Input
                      id="interests_hobbies"
                      name="interests_hobbies"
                      type="text"
                      value={formData.interests_hobbies}
                      onChange={handleInputChange}
                      disabled={loading}
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
                      disabled={loading}
                      placeholder="Tell us about yourself and what you're looking for..."
                      className="mt-1 block w-full rounded-md shadow-sm bg-white border-gray-300 text-gray-600 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center">
                  <input
                    id="accept_terms"
                    name="accept_terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded bg-white"
                  />
                  <label htmlFor="accept_terms" className="ml-2 block text-sm text-gray-700">
                    I accept the{' '}
                    <Link href="/privacy-policy" className="font-medium text-indigo-600 hover:text-indigo-700">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms-of-service" className="font-medium text-indigo-600 hover:text-indigo-700">
                      Terms of Service
                    </Link>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
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
    </>
  );
} 