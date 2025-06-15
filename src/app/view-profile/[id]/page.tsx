'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, User, getImageUrl } from '@/services/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ViewProfilePage() {
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;
  
  const [profile, setProfile] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
      return;
    }
    
    if (profileId) {
      fetchProfile();
    }
  }, [currentUser, loading, router, profileId]);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const profileData = await api.getProfileById(profileId);
      setProfile(profileData);
      toast.dismiss('loading-profile');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.dismiss('loading-profile');
      toast.error('Failed to load profile');
      router.push('/view-profiles');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleExpressInterest = () => {
    toast.success(`Interest expressed in ${profile?.full_name}'s profile! Our team will contact you within 48 hours.`);
  };

  const handleBackToProfiles = () => {
    router.push('/view-profiles');
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-indigo-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-indigo-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Profile not found</p>
          <Button onClick={handleBackToProfiles} className="mt-4">
            Back to Profiles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Profile Details
            </h1>
            <p className="text-base text-gray-600">
              View detailed information about this profile
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Header with Back Button */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-indigo-600">Profile Information</h2>
              <Button
                onClick={handleBackToProfiles}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                ← Back to Profiles
              </Button>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-200">
                {profile.profile_photo ? (
                  <Image
                    src={getImageUrl(profile.profile_photo)}
                    alt={profile.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">
                      {profile.full_name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{profile.full_name}</h3>
            </div>

            {/* Personal Information */}
            <div className="w-full">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <p className="mt-1 text-gray-900">{profile.age} years old</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <p className="mt-1 text-gray-900 capitalize">{profile.gender}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <p className="mt-1 text-gray-900">{profile.location?.city}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <p className="mt-1 text-gray-900">{profile.location?.country}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profession</label>
                  <p className="mt-1 text-gray-900">{profile.profession}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <p className="mt-1 text-gray-900 capitalize">{profile.education}</p>
                </div>
              </div>
            </div>

            {/* Contact & Status */}
            <div className="w-full mt-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Contact & Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                  <p className="mt-1 text-gray-900 capitalize">{profile.marital_status}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Children</label>
                  <p className="mt-1 text-gray-900">{profile.children_count} child(ren)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Verification Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                    profile.is_verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profile.is_verified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-gray-900">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="w-full mt-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Additional Information</h3>
              <div className="space-y-6">
                {profile.interests_hobbies && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Interests and Hobbies</label>
                    <p className="mt-1 text-gray-900">{profile.interests_hobbies}</p>
                  </div>
                )}

                {profile.brief_personal_description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Brief Personal Description</label>
                    <div className="mt-1 bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 italic">
                        "{profile.brief_personal_description}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handleExpressInterest}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
              >
                Express Interest
              </Button>
              <Button
                onClick={handleBackToProfiles}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
              >
                Back to All Profiles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 