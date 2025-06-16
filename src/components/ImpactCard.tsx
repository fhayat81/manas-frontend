'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ImpactCard as ImpactCardType } from '../types/cards';

interface ImpactCardProps {
  card: ImpactCardType;
}

export default function ImpactCard({ card }: ImpactCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 bg-indigo-100">
        <Image
          src={card.imageUrl}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={card.id <= 4}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="flex items-center justify-center h-full text-indigo-600 text-lg font-bold bg-gradient-to-br from-indigo-50 to-indigo-100">
                  <div class="text-center">
                    <div class="text-4xl mb-2">📸</div>
                    <div class="text-sm">${card.title}</div>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">{card.title}</h3>
        <p className="mt-2 text-gray-600">{card.description}</p>
        <Link href={card.link} className="mt-4 inline-block text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-4 py-2 text-sm font-medium transition">
          Learn More
        </Link>
      </div>
    </div>
  );
} 