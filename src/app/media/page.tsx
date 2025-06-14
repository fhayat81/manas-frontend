'use client';

import React from 'react';
import Image from 'next/image';

const Media = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4 pt-4">Media Coverage</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          See how our work is making an impact and gaining recognition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Media Card 1 */}
          <div className="bg-indigo-50 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
              {/* Placeholder for image/icon */}
              <Image
                src="/images/newspaper.png" // This image path needs to exist in public/images
                alt="Newspaper Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                MANAS Foundation Featured in National Women's Day Coverage
              </h2>
              <div className="text-gray-500 text-sm mb-4 flex items-center">
                <span className="mr-2">🗓️ March 8, 2024</span>
                <span className="text-indigo-600 font-medium">Times of India</span>
              </div>
              <p className="text-gray-700 mb-4 flex-grow">
                Our work in empowering widows and divorced women was highlighted in national media coverage on International Women's Day.
              </p>
              <button className="mt-auto self-start bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                Read More
              </button>
            </div>
          </div>

          {/* Media Card 2 (placeholder) */}
          <div className="bg-indigo-50 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
              {/* Placeholder for image/icon */}
              <Image
                src="/images/trophy.png" // This image path needs to exist in public/images
                alt="Trophy Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                Success Story: 50 Successful Matches This Year
              </h2>
              <div className="text-gray-500 text-sm mb-4 flex items-center">
                <span className="mr-2">🗓️ February 15, 2024</span>
                <span className="text-indigo-600 font-medium">Hindu Business Line</span>
              </div>
              <p className="text-gray-700 mb-4 flex-grow">
                MANAS Foundation celebrates milestone of facilitating 50 successful matches between widows/divorced women and understanding partners.
              </p>
              <button className="mt-auto self-start bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                Read More
              </button>
            </div>
          </div>

          {/* Media Card 3 (placeholder) */}
          <div className="bg-indigo-50 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
              {/* Placeholder for image/icon */}
              <Image
                src="/images/medal.png" // This image path needs to exist in public/images
                alt="Medal Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                NGO Recognition Award for Social Impact
              </h2>
              <div className="text-gray-500 text-sm mb-4 flex items-center">
                <span className="mr-2">🗓️ January 20, 2024</span>
                <span className="text-indigo-600 font-medium">Indian Express</span>
              </div>
              <p className="text-gray-700 mb-4 flex-grow">
                Foundation receives recognition for innovative approach to addressing social stigma around widow remarriage in Indian society.
              </p>
              <button className="mt-auto self-start bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media; 