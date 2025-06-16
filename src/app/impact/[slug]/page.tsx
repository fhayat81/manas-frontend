import Link from 'next/link';
import { impactCardsData } from '../../../data/cardsData';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ImpactDetailPage({ params }: PageProps) {
  // Find the card based on the slug
  const card = impactCardsData.find(card => 
    card.link === `/impact/${params.slug}`
  );

  if (!card) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
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
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: card.detailedDescription }}
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-900 mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-lg text-indigo-700 mb-8">
            Join our community and be part of the positive change we&apos;re creating together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-md shadow-lg hover:bg-indigo-700 transition"
            >
              Join Our Community
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-bold rounded-md shadow-lg hover:bg-indigo-50 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 