"use client";

import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { MediaCardType } from '@/types/cards';
import MediaCard from '@/components/MediaCard';

export default function MediaPage() {
  const [media, setMedia] = useState<MediaCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const cards = await api.fetchMediaCards();
        setMedia(cards);
      } catch {
        setMedia([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">Media Coverage</h1>
        {loading ? (
          <div className="text-center text-indigo-600 py-20">Loading...</div>
        ) : media.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No media coverage found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map(card => (
              <MediaCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 