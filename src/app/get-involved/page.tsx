+'use client'
import Link from 'next/link';
import { FaHeart, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { api, type Event } from '@/services/api';

export default function GetInvolved() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* Hero Section */}
      <section className="pt-20 pb-20 text-center bg-white shadow-sm">
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">Get Involved</h1>
        <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
          Join our mission to empower women and create meaningful connections in our community.
        </p>
      </section>

      {/* CTA Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Volunteer With Us */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <FaHeart className="text-6xl text-indigo-600 mb-6" />
            <h2 className="text-2xl font-bold text-indigo-800 mb-3">Volunteer With Us</h2>
            <p className="text-gray-700 mb-6 flex-grow">
              Become a volunteer and be part of our mission to empower women. Your time and skills can change
              lives and bring hope to those in need.
            </p>
            <Link href="#" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
              Learn More
            </Link>
          </div>

          {/* Card 2: Share Your Story */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <FaBookOpen className="text-6xl text-indigo-600 mb-6" />
            <h2 className="text-2xl font-bold text-indigo-800 mb-3">Share Your Story</h2>
            <p className="text-gray-700 mb-6 flex-grow">
              Share your story of empowerment and resilience with us. Your journey can inspire and motivate
              others going through similar experiences.
            </p>
            <Link href="#" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
              Share Now
            </Link>
          </div>

          {/* Card 3: Attend Our Events */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <FaCalendarAlt className="text-6xl text-indigo-600 mb-6" />
            <h2 className="text-2xl font-bold text-indigo-800 mb-3">Attend Our Events</h2>
            <p className="text-gray-700 mb-6 flex-grow">
              Join our events to connect with like-minded individuals and support our cause. Together, we
              can create a strong community of support and understanding.
            </p>
            <Link href="#" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
              Get Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-indigo-900 text-center mb-12">Upcoming Events</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading events...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="bg-indigo-600 text-white p-4 flex flex-col items-center justify-center w-24 text-center">
                    <span className="text-4xl font-bold leading-none">{event.month}</span>
                    <span className="text-3xl font-bold">{event.day}</span>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-1 flex items-center"><FaRegCalendar className="mr-2 text-indigo-600" /> {new Date(event.date).toLocaleDateString()} • <FaRegClock className="mx-2 text-indigo-600" /> {event.startTime} - {event.endTime}</p>
                    <p className="text-gray-600 text-sm mb-3 flex items-center"><FaLocationDot className="mr-2 text-indigo-600" /> {event.location}</p>
                    <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                    <div className="flex gap-2">
                      {event.registerLink && event.registerLink.trim() !== '' ? (
                        <Link
                          href={event.registerLink}
                          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register
                        </Link>
                      ) : (
                        <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md">Coming Soon</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 