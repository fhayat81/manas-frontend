"use client";

import React, { useEffect, useState } from 'react';
import MediaCard from '../../components/MediaCard';
import { api } from '../../services/api';
import { MediaCardType } from '@/types/cards';

const Media = () => {
  const [mediaCards, setMediaCards] = useState<MediaCardType[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const cards = await api.fetchMediaCards();
        setMediaCards(cards);
      } catch {
        setMediaCards([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4 pt-4">Media Coverage</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          See how our work is making an impact and gaining recognition.
        </p>
        {loading ? (
          <div className="text-center text-indigo-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaCards.map((card) => (
              <MediaCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Media; 