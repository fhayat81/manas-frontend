'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { MediaCardType } from '@/types/cards';

export default function MediaDetailPage() {
  const { id } = useParams();
  const [card, setCard] = useState<MediaCardType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const cards = await api.fetchMediaCards();
        const found = cards.find((c: MediaCardType) => String(c._id || c.id) === id);
        setCard(found || null);
      } catch {
        setCard(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center text-indigo-600 py-20">Loading...</div>;
  if (!card) return notFound();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/media" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Media
            </Link>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-indigo-600">{card.title}</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {card.description}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className='text-black'><strong>Date:</strong> {card.date}</p>
            <p className='text-black'><strong>Source:</strong> {card.source}</p>
            <div 
              className="mt-6"
              dangerouslySetInnerHTML={{ __html: card.detailedDescription || card.description }}
            />
          </div>
        </div>
      </section>
    </>
  );
} 