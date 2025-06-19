'use client';

import Image from 'next/image';
import { MediaCardType } from '../types/cards';

export default function MediaCard({ card }: { card: MediaCardType }) {
  return (
    <div className="bg-indigo-50 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
      <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
        <Image
          src={card.imageUrl}
          alt={`${card.source} Icon`}
          width={80}
          height={80}
          className="object-contain"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="flex items-center justify-center h-full text-indigo-600 text-lg font-bold bg-gradient-to-br from-indigo-50 to-indigo-100">
                  <div class="text-center">
                    <div class="text-4xl mb-2">📰</div>
                    <div class="text-sm">${card.source}</div>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
          {card.title}
        </h2>
        <div className="text-gray-500 text-sm mb-4 flex items-center">
          <span className="mr-2">🗓️ {card.date}</span>
          <span className="text-indigo-600 font-medium">{card.source}</span>
        </div>
        <p className="text-gray-700 mb-4 flex-grow">
          {card.description}
        </p>
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto self-start bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  );
} 