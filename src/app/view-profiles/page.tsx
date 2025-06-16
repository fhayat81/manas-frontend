'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, User, ProfileFilters, ProfilesResponse, getImageUrl } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { extractUniqueValues, filterProfiles } from '@/utils/fuzzySearch';
import { SearchableSelect } from '@/components/SearchableSelect';
import { SmartLocationSelect } from '@/components/SmartLocationSelect';

// Debounce hook for search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ViewProfilesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<User[]>([]);
  const [allProfiles, setAllProfiles] = useState<User[]>([]); // Store all profiles for filtering
  const [pagination, setPagination] = useState<ProfilesResponse['pagination'] | null>(null);
  const [filters, setFilters] = useState<ProfileFilters>({
    location: '',
    ageRange: '',
    profession: '',
    search: '',
  });
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce

  // Extract unique values for filter dropdowns
  const uniqueStates = useMemo(() => {
    return extractUniqueValues(allProfiles, (profile) => profile.location?.state);
  }, [allProfiles]);

  const uniqueCities = useMemo(() => {
    return extractUniqueValues(allProfiles, (profile) => profile.location?.city);
  }, [allProfiles]);

  const uniqueProfessions = useMemo(() => {
    return extractUniqueValues(allProfiles, (profile) => profile.profession);
  }, [allProfiles]);

  // Filter profiles based on debounced search query
  const filteredProfiles = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return profiles;
    }
    return filterProfiles(profiles, debouncedSearchQuery);
  }, [profiles, debouncedSearchQuery]);

  const fetchProfiles = useCallback(async (currentFilters?: ProfileFilters) => {
    setLoadingProfiles(true);
    try {
      const activeFilters = currentFilters || filters;
      console.log('Fetching profiles with filters:', activeFilters);
      
      const response = await api.getAllProfiles(activeFilters);
      setProfiles(response.profiles);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      
      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      toast.error(`Failed to load profiles: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoadingProfiles(false);
    }
  }, [filters]);

  // Fetch all profiles for filter options (without pagination)
  const fetchAllProfilesForFilters = useCallback(async () => {
    try {
      const response = await api.getAllProfiles({ limit: 1000 }); // Get a large number for filter options
      setAllProfiles(response.profiles);
    } catch (error) {
      console.error('Failed to fetch all profiles for filters:', error);
      // Don't show error toast for this, as it's not critical
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      fetchProfiles();
      fetchAllProfilesForFilters(); // Fetch all profiles for filter options
    }
  }, [user, loading, router, fetchProfiles, fetchAllProfilesForFilters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      // Escape to clear search
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const applyFilters = () => {
    fetchProfiles(filters);
  };

  const clearFilters = () => {
    const emptyFilters: ProfileFilters = {
      location: '',
      ageRange: '',
      profession: '',
      search: '',
    };
    setFilters(emptyFilters);
    setSearchQuery('');
    fetchProfiles(emptyFilters);
  };

  const loadNextPage = () => {
    if (pagination?.hasNextPage) {
      fetchProfiles({ ...filters, page: (pagination.currentPage || 1) + 1 });
    }
  };

  const loadPrevPage = () => {
    if (pagination?.hasPrevPage) {
      fetchProfiles({ ...filters, page: (pagination.currentPage || 1) - 1 });
    }
  };

  const handleViewProfile = (profileId: string) => {
    if (!user) {
      toast.error('Please log in to view profiles.');
      router.push('/login');
      return;
    }
    toast.loading('Loading profile...', { id: 'loading-profile' });
    router.push(`/view-profile/${profileId}`);
  };

  const handleCardClick = (profileId: string) => {
    if (!user) {
      toast.error('Please log in to view profiles.');
      router.push('/login');
      return;
    }
    toast.loading('Loading profile...', { id: 'loading-profile' });
    router.push(`/view-profile/${profileId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-indigo-50">Loading user data...</div>;
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your Perfect Match</h1>
          <p className="text-lg text-gray-600">Browse through our community members and find meaningful connections.</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <SmartLocationSelect
                id="location"
                name="location"
                value={filters.location || ''}
                onChange={handleFilterChange}
                states={uniqueStates}
                cities={uniqueCities}
                placeholder="Type to search states or cities..."
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-600"
                label="Location"
              />
            </div>

            <div>
              <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">Age Range</label>
              <Select
                id="ageRange"
                name="ageRange"
                value={filters.ageRange}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-600"
              >
                <option value="">All Ages</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46+">46+</option>
              </Select>
            </div>

            <div>
              <SearchableSelect
                id="profession"
                name="profession"
                value={filters.profession || ''}
                onChange={handleFilterChange}
                options={uniqueProfessions}
                placeholder="Type to search professions..."
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-600"
                label="Profession"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 sr-only">Search profiles...</label>
              <div className="relative">
                <Input
                  id="search"
                  name="search"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name, profession, location... (Ctrl+K)"
                  className="mt-1 block w-full text-gray-600 pr-10"
                />
                {searchQuery !== debouncedSearchQuery && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                  </div>
                )}
              </div>
              {searchQuery && (
                <p className="mt-1 text-xs text-gray-500">
                  Search across names, professions, and locations • Press Esc to clear
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 text-right space-x-4">
            <Button
              onClick={clearFilters}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md shadow"
            >
              Clear Filters
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Search Results Info */}
        {debouncedSearchQuery && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredProfiles.length} of {profiles.length} profiles matching &quot;{debouncedSearchQuery}&quot;
            </p>
          </div>
        )}

        {/* Profiles Grid */}
        {loadingProfiles ? (
          <div className="text-center text-gray-600 text-lg">Loading profiles...</div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            {debouncedSearchQuery ? 'No profiles found matching your search criteria.' : 'No profiles found matching your criteria.'}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProfiles.map(profile => (
                <div 
                  key={profile._id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-indigo-200 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleCardClick(profile._id)}
                >
                  <div className="relative h-48 bg-indigo-500 flex items-center justify-center">
                    {profile.profile_photo ? (
                      <Image
                        src={getImageUrl(profile.profile_photo)}
                        alt={profile.full_name}
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                      />
                    ) : (
                      <span className="text-white text-7xl font-bold uppercase">
                        {profile.full_name?.charAt(0)}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-4 text-white text-lg font-semibold">
                      {profile.full_name}
                    </div>
                  </div>
                  <div className="p-6 space-y-4 text-gray-700">
                    <p className="text-sm">
                      <span className="font-semibold">Age:</span> {profile.age} years
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Location:</span> {profile.location?.city}, {profile.location?.state}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Profession:</span> {profile.profession}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Education:</span> {profile.education}
                    </p>
                    {profile.interests_hobbies && (
                      <p className="text-sm">
                        <span className="font-semibold">Interests:</span> {profile.interests_hobbies}
                      </p>
                    )}
                    {profile.brief_personal_description && (
                      <p className="text-sm italic">&quot;{profile.brief_personal_description}&quot;</p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        {profile.marital_status}
                      </span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(profile._id);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls - Only show when not searching */}
            {!debouncedSearchQuery && pagination && (pagination.totalPages > 1) && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <Button
                  onClick={loadPrevPage}
                  disabled={!pagination.hasPrevPage}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md shadow"
                >
                  Previous
                </Button>
                
                <span className="text-gray-600">
                  Page {pagination.currentPage} of {pagination.totalPages} 
                  ({pagination.totalCount} total profiles)
                </span>
                
                <Button
                  onClick={loadNextPage}
                  disabled={!pagination.hasNextPage}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md shadow"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 