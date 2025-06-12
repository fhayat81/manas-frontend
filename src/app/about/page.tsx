import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              About MANAS Foundation
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Empowering widows and divorced women through compassionate support and meaningful connections
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                At MANAS Foundation, we are dedicated to breaking social barriers and creating a supportive community where widows and divorced women can find dignity, hope, and new beginnings. Through our compassionate matchmaking services and comprehensive support programs, we empower women to rebuild their lives with confidence and purpose.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                We believe that every woman deserves the opportunity to create meaningful connections and build a fulfilling life, regardless of their past circumstances. Our foundation provides a safe, respectful, and supportive environment where women can explore new possibilities and forge lasting relationships.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/celebration.jpg"
                  alt="Community Celebration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              The principles that guide our work and shape our community
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-indigo-600 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900">Compassion</h3>
              <p className="mt-2 text-gray-500">
                We approach every individual with empathy and understanding, recognizing the unique challenges they face.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-indigo-600 text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold text-gray-900">Empowerment</h3>
              <p className="mt-2 text-gray-500">
                We provide the tools, resources, and support needed for women to take control of their lives and futures.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-indigo-600 text-4xl mb-4">🤲</div>
              <h3 className="text-xl font-semibold text-gray-900">Community</h3>
              <p className="mt-2 text-gray-500">
                We foster a supportive network where women can connect, share experiences, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Making a difference in the lives of women across the country
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2">
            <div className="bg-indigo-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900">Success Stories</h3>
              <p className="mt-4 text-gray-500">
                Over 75 successful matches have been made through our platform, leading to meaningful relationships and new beginnings. Our community has grown to include more than 200 empowered women who have found support, friendship, and hope.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900">Community Reach</h3>
              <p className="mt-4 text-gray-500">
                Our programs and services have reached women in over 50 cities across the country. Through workshops, support groups, and networking events, we&apos;ve created a nationwide community of support and empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 