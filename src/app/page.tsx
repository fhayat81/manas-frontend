'use client';

import Link from 'next/link';
import ImpactCard from '../components/ImpactCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ImpactCardType } from '@/types/cards';
import { AchievementCardType } from '@/types/cards';
import { SuccessStoryType } from '@/types/cards';

export default function Home() {
  const [impactCards, setImpactCards] = useState<ImpactCardType[]>([]);
  const [achievements, setAchievements] = useState<AchievementCardType[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [impact, achievement, stories] = await Promise.all([
          api.fetchImpactCards(),
          api.fetchAchievementCards(),
          api.fetchSuccessStories()
        ]);
        setImpactCards(impact);
        setAchievements(achievement);
        setSuccessStories(stories);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Empowering Lives Through</span>
              <span className="block text-indigo-600">Meaningful Connections</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Breaking social barriers and creating a supportive community where widows and divorced women find dignity, hope, and new beginnings through holistic assistance and compassionate support.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Join Our Community
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/about"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact in Action Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">Our Impact in Action</h2>
            <p className="text-lg text-indigo-700">Witness the transformation and empowerment happening in our community</p>
          </div>
          {loading ? (
            <div className="text-center text-indigo-600">Loading...</div>
          ) : (
            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {impactCards.map((card) => (
                <ImpactCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">Our Achievements</h2>
          </div>
          {loading ? (
            <div className="text-center text-indigo-600">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-white rounded-lg shadow-lg p-6 text-center border border-indigo-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-4">{achievement.icon}</div>
                  <div className="text-4xl font-bold text-indigo-600">{achievement.number}</div>
                  <div className="mt-2 text-lg text-gray-700">{achievement.title}</div>
                  <p className="mt-1 text-sm text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">Success Stories</h2>
            <p className="text-lg text-indigo-700">Hear from the women whose lives have been transformed</p>
          </div>
          {loading ? (
            <div className="text-center text-indigo-600">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl text-indigo-600 mb-4">❝</div>
                  <p className="text-gray-800 italic flex-grow">&quot;{story.quote}&quot;</p>
                  <p className="mt-4 text-indigo-800 font-semibold">{story.author}</p>
                  <p className="text-sm text-gray-600">{story.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ready to Start Your New Journey Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-indigo-700 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Start Your New Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of women who have found hope, support, and meaningful connections through our community. Take the first step towards a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-md shadow-lg hover:bg-indigo-50 hover:text-indigo-700 transition"
            >
              Join Today
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-md shadow-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Get Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
