import Image from 'next/image';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-400 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white mb-4">About MANAS Foundation</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Dedicated to empowering widows and divorced women through compassionate support and meaningful connections
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-10 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <span className="text-5xl mb-4">🎯</span>
              <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
              <p className="text-lg text-indigo-800">
                To empower widows and divorced women by providing dignified pathways to remarriage and companionship, creating a supportive community that breaks social stigmas and promotes healing, hope, and new beginnings.
              </p>
            </div>
            {/* Vision Card */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-10 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <span className="text-5xl mb-4">🌟</span>
              <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Vision</h2>
              <p className="text-lg text-indigo-800">
                A society where every woman, regardless of her past circumstances, has the opportunity to find love, companionship, and support in a judgment-free environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">Our Story</h2>
            <p className="text-lg text-indigo-700">A journey of empowerment and transformation</p>
          </div>
          {/* Timeline */}
          <div className="relative flex flex-col gap-8 md:gap-12 pl-12 md:pl-0">
            {/* Vertical line for desktop */}
            <div className="absolute left-6 md:left-1/4 h-full border-l-2 border-indigo-200"></div>

            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">2019</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Foundation Established</h3>
                <p className="text-indigo-800">MANAS Foundation was founded with a vision to empower widows and divorced women</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">2020</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">First Connections</h3>
                <p className="text-indigo-800">Facilitated our first 10 successful matches and connections</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">2021</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Multi-City Expansion</h3>
                <p className="text-indigo-800">Expanded services to 15 cities across India</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">2022</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Digital Platform Launch</h3>
                <p className="text-indigo-800">Launched our secure online matchmaking platform</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">2023</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">100+ Connections</h3>
                <p className="text-indigo-800">Reached milestone of 100+ successful matches</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">2024</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">200+ Lives Empowered</h3>
                <p className="text-indigo-800">Expanded programs to empower over 200 women</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">Our Team</h2>
            <p className="text-lg text-indigo-700">Dedicated professionals committed to our mission</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">MS</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Dr. Meera Sharma</h3>
              <div className="text-indigo-600 font-semibold mb-2">Founder & CEO</div>
              <p className="text-indigo-800">Women's rights advocate with 15+ years experience in social work and women empowerment</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">RK</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Rajesh Kumar</h3>
              <div className="text-indigo-600 font-semibold mb-2">Community Outreach Manager</div>
              <p className="text-indigo-800">Social worker specializing in community programs and grassroots initiatives</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">PP</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Priya Patel</h3>
              <div className="text-indigo-600 font-semibold mb-2">Relationship Counselor</div>
              <p className="text-indigo-800">Licensed counselor with expertise in grief counseling and remarriage support</p>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">AS</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Anita Singh</h3>
              <div className="text-indigo-600 font-semibold mb-2">Operations Manager</div>
              <p className="text-indigo-800">Administrative expert ensuring smooth platform operations and user experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Initiatives Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-2">Our Programs & Initiatives</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Empowerment Through Skills</h3>
              <p className="text-indigo-800 mb-4">Skills training program helping women develop employable skills</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">150 beneficiaries</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">6-month programs</span>
              </div>
            </div>
            {/* Program 2 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">🧩</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Counseling and Support</h3>
              <p className="text-indigo-800 mb-4">Ongoing psychological support and counseling services</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">200 individuals</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Ongoing support</span>
              </div>
            </div>
            {/* Program 3 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Digital Literacy Initiative</h3>
              <p className="text-indigo-800 mb-4">Digital skills training for better connectivity and opportunities</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">100 participants</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">3-month cycles</span>
              </div>
            </div>
            {/* Program 4 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">💞</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Matchmaking Platform</h3>
              <p className="text-indigo-800 mb-4">Secure online platform for meaningful connections</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">300 beneficiaries</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Ongoing service</span>
              </div>
            </div>
            {/* Program 5 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Legal Aid Support</h3>
              <p className="text-indigo-800 mb-4">Legal assistance and guidance for critical matters</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">80 women</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Case-by-case</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 