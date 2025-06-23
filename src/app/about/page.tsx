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

      {/* Founder Story Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-10 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">About Us</h2>
            <p className="text-lg text-indigo-800 mb-4">
              Manas Foundation was established from the vision of Mr. D.S. Lahane. From his childhood, having witnessed the suffering of widowed sisters, his mother, and his aunts at home, as well as injustices in society, he resolved to work in this field.
            </p>
            <p className="text-lg text-indigo-800 mb-4">
              In 2022, while preparing for a district council election candidacy, he organized for the first time at the district level a Rakshabandhan program specifically for women, in which a large number of widowed women participated. Building on that social commitment, he then began work toward the remarriage of widowed, divorced, and separated women.
            </p>
            <p className="text-lg text-indigo-800">
              To date, he has played a vital role in guiding hundreds of women, providing them with employment, training, and a renewed start in life.
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
              <p className="text-lg text-left text-indigo-800">
                To empower widows and divorced women by providing dignified pathways to remarriage and companionship, creating a supportive community that breaks social stigmas and promotes healing, hope, and new beginnings.
              </p>
              <ul className="text-left mt-6 space-y-3 text-indigo-800 text-lg list-disc list-inside">
                <li>To give new life and hope to widowed, divorced, and abandoned women in society.</li>
                <li>To free women from traditional constraints and make them economically, socially, and emotionally self-reliant.</li>
                <li>To provide all necessary opportunities, guidance, and support for women to lead a renewed life.</li>
                <li>To help them gain dignity and respect in society through the path of remarriage.</li>
              </ul>
            </div>
            {/* Vision Card */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-10 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <span className="text-5xl mb-4">🌟</span>
              <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Vision</h2>
              <p className="text-lg text-indigo-800">
                A society where every woman, regardless of her past circumstances, has the opportunity to find love, companionship, and support in a judgment-free environment.
              </p>
              <ul className="text-left mt-6 space-y-3 text-indigo-800 text-lg list-disc list-inside">
                <li>To transform societal attitudes by eliminating the stigma around widowhood and remarriage.</li>
                <li>To build an inclusive society where every woman, regardless of her marital status, can live with respect and purpose.</li>
                <li>To ensure systemic and policy-level support for the empowerment and welfare of single women.</li>
                <li>To make remarriage a socially accepted and celebrated norm that restores identity and equality to affected women.</li>
              </ul>
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

            {/* August 2022 */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">Aug 2022</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Widow Women Rakshabandhan Program, Buldhana</h3>
                <p className="text-indigo-800">Organized to celebrate Rakshabandhan with widowed women, fostering emotional support and social bonding.</p>
              </div>
            </div>
            {/* November 2022 */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">Nov 2022</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Entrepreneur & Business Meet, Buldhana</h3>
                <p className="text-indigo-800">Aimed at creating employment opportunities and business connections for single women.</p>
              </div>
            </div>
            {/* December 2023 */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">Dec 2023</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Widow Women Parishad, Buldhana</h3>
                <p className="text-indigo-800">A district-level gathering where widowed, divorced, and abandoned women voiced their concerns in a safe space.</p>
              </div>
            </div>
            {/* January 2024 */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">Jan 2024</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Remarriage Ceremony, Sindkhed Raja</h3>
                <p className="text-indigo-800">A dignified group remarriage event held with community participation and traditional celebration.</p>
              </div>
            </div>
            {/* March 2024 */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex-shrink-0 flex justify-center md:justify-end md:w-1/4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-8 py-2 rounded-full text-xl font-bold">Mar 2024</span>
              </div>
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 mt-4 md:mt-0 md:w-3/4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">Community Remarriage Ceremony, Buldhana (2nd event)</h3>
                <p className="text-indigo-800">Another collective remarriage event conducted in Buldhana, continuing the mission with equal enthusiasm.</p>
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
            <p className="text-lg text-indigo-700">Meet the dedicated leaders behind our mission</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">DL</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Dattatraya Lahane</h3>
              <div className="text-indigo-600 font-semibold mb-2">President</div>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">GN</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Ganesh Nikam</h3>
              <div className="text-indigo-600 font-semibold mb-2">Vice President</div>
              <p className="text-indigo-800">Reputed News Reporter</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">SP</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Shahina Pathan</h3>
              <div className="text-indigo-600 font-semibold mb-2">Treasurer</div>
              <p className="text-indigo-800">Women&apos;s rights advocate with 25+ years experience in social work and women empowerment</p>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 flex flex-col items-center text-center transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-6">ML</div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-1">Meena Lahane</h3>
              <div className="text-indigo-600 font-semibold mb-2">Secretary</div>
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
                {/* <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">150 beneficiaries</span> */}
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">6-month programs</span>
              </div>
            </div>
            {/* Program 2 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">🧩</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">On-Ground Assistance & Support
              </h3>
              <p className="text-indigo-800 mb-4">Practical help to address challenges from in-laws, family, and societal pressures</p>
              <div className="flex flex-wrap gap-2">
                {/* <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">200 individuals</span> */}
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Ongoing support</span>
              </div>
            </div>
            {/* Program 4 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">💞</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Matchmaking Platform</h3>
              <p className="text-indigo-800 mb-4">Secure online platform for meaningful connections</p>
              <div className="flex flex-wrap gap-2">
                {/* <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">300 beneficiaries</span> */}
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Ongoing service</span>
              </div>
            </div>
            {/* Program 5 */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-md p-8 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">Legal Aid Support</h3>
              <p className="text-indigo-800 mb-4">Legal assistance and guidance for critical matters</p>
              <div className="flex flex-wrap gap-2">
                {/* <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">80 women</span> */}
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">Case-by-case</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 