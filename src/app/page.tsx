import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Empowering Lives Through</span>
              <span className="block text-indigo-600">Meaningful Connections</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Breaking social barriers and creating a supportive community where widows and divorced women find dignity, hope, and new beginnings through compassionate matchmaking.
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

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">200+</div>
              <div className="mt-2 text-lg text-gray-600">Lives Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">75+</div>
              <div className="mt-2 text-lg text-gray-600">Successful Matches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">50+</div>
              <div className="mt-2 text-lg text-gray-600">Cities Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact in Action
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Witness the transformation and empowerment happening in our community
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature cards */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                {/* <Image
                  src="/images/workshop.jpg"
                  alt="Community Workshop"
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Community Workshop</h3>
                <p className="mt-2 text-gray-500">Women participating in empowerment workshop</p>
                <button className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
                  Learn More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                {/* <Image
                  src="/images/support.jpg"
                  alt="Support Group Meeting"
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Support Group Meeting</h3>
                <p className="mt-2 text-gray-500">Safe space for sharing experiences and support</p>
                <button className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
                  Learn More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                {/* <Image
                  src="/images/training.jpg"
                  alt="Skills Training Session"
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Skills Training Session</h3>
                <p className="mt-2 text-gray-500">Hands-on training for professional development</p>
                <button className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
