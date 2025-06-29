'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, User, getImageUrl } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ViewProfilePage() {
  const { user: currentUser, loading, refreshUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;
  
  const [profile, setProfile] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [sendingAgain, setSendingAgain] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      const profileData = await api.getProfileById(profileId);
      setProfile(profileData);
      toast.dismiss('loading-profile');
    } catch {
      toast.dismiss('loading-profile');
      toast.error('Failed to load profile');
      router.push('/view-profiles');
    } finally {
      setLoadingProfile(false);
    }
  }, [profileId, router]);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
      return;
    }
    
    if (profileId) {
      fetchProfile();
    }
  }, [currentUser, loading, router, profileId, fetchProfile]);

  const handleExpressInterest = async () => {
    try {
      await api.expressInterest(profileId);
      toast.success(`Interest expressed in ${profile?.full_name}'s profile!`);
      // Optionally, refresh user context
    } catch {
      toast.error('Failed to express interest.');
    }
  };

  const handleAcceptInterest = async () => {
    setAccepting(true);
    toast.loading('Accepting interest...', { id: 'accept-interest' });
    try {
      await api.acceptInterest(profileId);
      toast.success('Interest accepted! Contact information has been shared with both users.', { id: 'accept-interest' });
      if (typeof refreshUser === 'function') await refreshUser();
    } catch {
      toast.error('Failed to accept interest.', { id: 'accept-interest' });
    } finally {
      setAccepting(false);
    }
  };

  const handleRejectInterest = async () => {
    setRejecting(true);
    toast.loading('Rejecting interest...', { id: 'reject-interest' });
    try {
      await api.rejectInterest(profileId);
      toast.success('Interest rejected successfully.', { id: 'reject-interest' });
      if (typeof refreshUser === 'function') await refreshUser();
    } catch {
      toast.error('Failed to reject interest.', { id: 'reject-interest' });
    } finally {
      setRejecting(false);
    }
  };

  const handleBackToProfiles = () => {
    router.push('/view-profiles');
  };

  const sentInterest = currentUser?.expressed_interests?.find(
    (entry) => entry.user._id === profileId
  );
  const receivedInterest = currentUser?.received_interests?.find(
    (entry) => entry.user._id === profileId
  );

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Date of Birth</Label>
                  <p className="text-sm text-gray-900">{new Date(profile.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Gender</Label>
                  <p className="text-sm text-gray-900 capitalize">{profile.gender}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Village</label>
                  <p className="mt-1 text-gray-900">{profile.location?.village}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tehsil</label>
                  <p className="mt-1 text-gray-900">{profile.location?.tehsil}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">District</label>
                  <p className="mt-1 text-gray-900">{profile.location?.district}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <p className="mt-1 text-gray-900">{profile.location?.state}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profession</label>
                  <p className="mt-1 text-gray-900">{profile.profession}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <p className="mt-1 text-gray-900 capitalize">{profile.education}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Caste</label>
                  <p className="mt-1 text-gray-900 capitalize">{profile.caste}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Religion</label>
                  <p className="mt-1 text-gray-900 capitalize">{profile.religion}</p>
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="w-full mt-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6 border-b border-gray-300 pb-2">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Name</label>
                  <p className="mt-1 text-gray-900">{profile.guardian?.name}</p>
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

                {profile.divorce_finalized !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Divorce Finalized</label>
                    <p className="mt-1 text-gray-900">{profile.divorce_finalized ? 'Yes' : 'No'}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Children</label>
                  <p className="mt-1 text-gray-900">{profile.children_count} child(ren)</p>
                </div>

                {profile.children && profile.children.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Children Details</label>
                    <div className="mt-1 space-y-1">
                      {profile.children.map((child, index) => (
                        <p key={index} className="text-gray-900">
                          Child {index + 1}: {child.gender}, Age: {child.age}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

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
                        &quot;{profile.brief_personal_description}&quot;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t border-gray-200">
              {sentInterest ? (
                <Button
                  onClick={async () => {
                    await api.removeInterest(profileId);
                    if (typeof refreshUser === 'function') await refreshUser();
                    toast.success('Interest removed!');
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
                >
                  Remove Interest
                </Button>
              ) : receivedInterest ? (
                receivedInterest.status === 'pending' ? (
                  <>
                    <Button
                      onClick={handleAcceptInterest}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
                      disabled={accepting}
                    >
                      {accepting ? (
                        <span className="flex items-center"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>Accepting...</span>
                      ) : 'Accept Interest'}
                    </Button>
                    <Button
                      onClick={handleRejectInterest}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
                      disabled={rejecting}
                    >
                      {rejecting ? (
                        <span className="flex items-center"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>Rejecting...</span>
                      ) : 'Reject Interest'}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={async () => {
                      setSendingAgain(true);
                      await api.removeInterest(profileId);
                      await new Promise(res => setTimeout(res, 200));
                      await api.expressInterest(profileId);
                      if (typeof refreshUser === 'function') await refreshUser();
                      setSendingAgain(false);
                      toast.success('Interest sent!');
                    }}
                    disabled={sendingAgain}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
                  >
                    {sendingAgain ? 'Sending...' : 'Send Interest'}
                  </Button>
                )
              ) : (
                <Button
                  onClick={handleExpressInterest}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg text-lg"
                >
                  Express Interest
                </Button>
              )}
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