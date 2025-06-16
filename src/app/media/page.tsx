'use client';

import React from 'react';
import { mediaCardsData } from '../../data/cardsData';
import MediaCard from '../../components/MediaCard';

const Media = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4 pt-4">Media Coverage</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          See how our work is making an impact and gaining recognition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaCardsData.map((card) => (
            <MediaCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media; 