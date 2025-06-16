import { ImpactCard, AchievementCard, SuccessStory, MediaCard } from '../types/cards';

// Impact Cards Data
export const impactCardsData: ImpactCard[] = [
  {
    id: 1,
    title: "Community Workshop",
    description: "Women participating in empowerment workshop",
    imageUrl: "/images/no-photo.svg",
    link: "/impact/community-workshop",
    detailedDescription: `
      <div class="space-y-8">
        <h2 class="text-4xl font-bold text-indigo-900 mb-6 text-center">Community Workshop: Empowering Women Together</h2>
        
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border-l-4 border-indigo-500">
          <p class="text-lg text-indigo-800 mb-4 leading-relaxed">
            Our community workshops serve as safe havens where women from diverse backgrounds come together to share experiences, 
            learn new skills, and build lasting connections. These sessions are designed to address the unique challenges 
            faced by widows and divorced women in our society.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
              <span class="text-3xl mr-3">🎯</span>
              Workshop Activities
            </h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-center">
                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Confidence building exercises
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Communication skills training
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Financial literacy sessions
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Emotional support groups
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Career guidance workshops
              </li>
            </ul>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
              <span class="text-3xl mr-3">📊</span>
              Impact Statistics
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <span class="font-medium">Women Participated</span>
                <span class="text-2xl font-bold text-indigo-600">150+</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span class="font-medium">Increased Confidence</span>
                <span class="text-2xl font-bold text-green-600">85%</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span class="font-medium">Career Opportunities</span>
                <span class="text-2xl font-bold text-blue-600">60%</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span class="font-medium">Supportive Friendships</span>
                <span class="text-2xl font-bold text-purple-600">90%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-2xl">
          <h3 class="text-2xl font-bold mb-4 flex items-center">
            <span class="text-3xl mr-3">🎉</span>
            Join Our Next Workshop
          </h3>
          <p class="text-lg mb-6 leading-relaxed">
            Ready to take the first step towards empowerment? Our next community workshop is scheduled for 
            <span class="font-bold text-yellow-200">March 15th, 2024</span> at our community center.
          </p>
          <div class="bg-white/20 p-4 rounded-lg">
            <p class="text-sm opacity-90">
              Contact us to register and be part of this transformative experience.
            </p>
          </div>
        </div>

        <div class="text-center">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105">
            Register Now
          </button>
        </div>
      </div>
    `
  },
  {
    id: 2,
    title: "Support Group Meeting",
    description: "Safe space for sharing experiences and support",
    imageUrl: "/images/no-photo.svg",
    link: "/impact/support-group",
    detailedDescription: `
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-indigo-900 mb-4">Support Group Meetings: A Circle of Understanding</h2>
        
        <div class="bg-indigo-50 p-6 rounded-lg">
          <p class="text-lg text-indigo-800 mb-4">
            Our support group meetings provide a confidential and nurturing environment where women can openly 
            share their experiences, challenges, and triumphs. These sessions are facilitated by trained counselors 
            and peer mentors who understand the journey of healing and growth.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Meeting Structure</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Weekly group sessions</li>
              <li>• One-on-one counseling</li>
              <li>• Peer mentoring programs</li>
              <li>• Crisis intervention support</li>
              <li>• Follow-up care services</li>
            </ul>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Success Stories</h3>
            <div class="space-y-3 text-gray-700">
              <p><strong>Priya's Journey:</strong> "The support group helped me find my voice again after years of silence."</p>
              <p><strong>Anita's Transformation:</strong> "I learned that I'm not alone in my struggles."</p>
              <p><strong>Meera's Growth:</strong> "From victim to survivor to thriver - that's my story."</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Find Your Support Circle</h3>
          <p class="mb-4">
            Our support groups meet every <strong>Tuesday and Thursday</strong> at 6:00 PM. 
            New members are always welcome, and all sessions are completely confidential.
          </p>
          <p class="text-sm opacity-90">
            Take the first step towards healing - you don't have to face this journey alone.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 3,
    title: "Skills Training Session",
    description: "Hands-on training for professional development",
    imageUrl: "/images/no-photo.svg",
    link: "/impact/skills-training",
    detailedDescription: `
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-indigo-900 mb-4">Skills Training: Building Careers, Building Confidence</h2>
        
        <div class="bg-indigo-50 p-6 rounded-lg">
          <p class="text-lg text-indigo-800 mb-4">
            Our comprehensive skills training program equips women with practical skills needed for today's job market. 
            From digital literacy to entrepreneurship, we provide hands-on training that leads to real employment 
            opportunities and financial independence.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Digital Skills</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Computer basics</li>
              <li>• Microsoft Office</li>
              <li>• Social media marketing</li>
              <li>• Online safety</li>
              <li>• E-commerce platforms</li>
            </ul>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Business Skills</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Entrepreneurship</li>
              <li>• Financial planning</li>
              <li>• Marketing strategies</li>
              <li>• Customer service</li>
              <li>• Business management</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Soft Skills</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Communication</li>
              <li>• Leadership</li>
              <li>• Problem solving</li>
              <li>• Teamwork</li>
              <li>• Time management</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Transform Your Future</h3>
          <p class="mb-4">
            Our next training cycle begins <strong>April 1st, 2024</strong>. 
            Limited seats available - apply now to secure your spot!
          </p>
          <p class="text-sm opacity-90">
            All training programs are free of cost and include certification upon completion.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 4,
    title: "Success Celebration",
    description: "Celebrating successful matches and connections",
    imageUrl: "/images/no-photo.svg",
    link: "/impact/success-celebration",
    detailedDescription: `
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-indigo-900 mb-4">Success Celebrations: Honoring New Beginnings</h2>
        
        <div class="bg-indigo-50 p-6 rounded-lg">
          <p class="text-lg text-indigo-800 mb-4">
            Our success celebrations are joyous occasions where we honor the courage, resilience, and determination 
            of women who have found new love and companionship. These events showcase the positive impact of 
            our matchmaking services and inspire hope in others.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Celebration Highlights</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Couple testimonials</li>
              <li>• Cultural performances</li>
              <li>• Award ceremonies</li>
              <li>• Community networking</li>
              <li>• Future planning sessions</li>
            </ul>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Success Metrics</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• 75+ successful matches</li>
              <li>• 90% satisfaction rate</li>
              <li>• 60% long-term relationships</li>
              <li>• 40% marriages celebrated</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Share Your Success Story</h3>
          <p class="mb-4">
            Have you found love through our platform? We'd love to celebrate your journey and inspire others 
            with your story of hope and happiness.
          </p>
          <p class="text-sm opacity-90">
            Contact us to share your success story and be featured in our next celebration event.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 5,
    title: "Volunteer Team",
    description: "Dedicated volunteers supporting our mission",
    imageUrl: "/images/no-photo.svg",
    link: "/impact/volunteer-team",
    detailedDescription: `
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-indigo-900 mb-4">Volunteer Team: The Heart of Our Mission</h2>
        
        <div class="bg-indigo-50 p-6 rounded-lg">
          <p class="text-lg text-indigo-800 mb-4">
            Our dedicated team of volunteers is the backbone of our organization. These compassionate individuals 
            donate their time, skills, and expertise to support our mission of empowering women and creating 
            meaningful connections in our community.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Volunteer Roles</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Event coordinators</li>
              <li>• Counselors and mentors</li>
              <li>• Skills trainers</li>
              <li>• Administrative support</li>
              <li>• Community outreach</li>
              <li>• Fundraising coordinators</li>
            </ul>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Volunteer Impact</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• 50+ active volunteers</li>
              <li>• 10,000+ hours donated</li>
              <li>• 15+ specialized roles</li>
              <li>• 100% commitment rate</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Join Our Volunteer Team</h3>
          <p class="mb-4">
            Ready to make a difference? We're always looking for passionate individuals who want to 
            contribute to our mission of empowering women and building stronger communities.
          </p>
          <p class="text-sm opacity-90">
            No experience required - we provide training and support for all volunteer positions.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 6,
    title: "Community Event",
    description: "Bringing together women from different backgrounds",
    imageUrl: "/images/no-photo.svg",
    link: "/impact/community-event",
    detailedDescription: `
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-indigo-900 mb-4">Community Events: Building Bridges of Understanding</h2>
        
        <div class="bg-indigo-50 p-6 rounded-lg">
          <p class="text-lg text-indigo-800 mb-4">
            Our community events bring together women from diverse backgrounds, cultures, and experiences. 
            These gatherings foster understanding, break down social barriers, and create a supportive 
            network that celebrates diversity and promotes inclusion.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Event Types</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• Cultural festivals</li>
              <li>• Networking meetups</li>
              <li>• Educational seminars</li>
              <li>• Health and wellness fairs</li>
              <li>• Art and craft workshops</li>
              <li>• Holiday celebrations</li>
            </ul>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-indigo-700 mb-3">Community Impact</h3>
            <ul class="space-y-2 text-gray-700">
              <li>• 500+ participants annually</li>
              <li>• 20+ events per year</li>
              <li>• 15+ partner organizations</li>
              <li>• 95% participant satisfaction</li>
            </ul>
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Upcoming Events</h3>
          <p class="mb-4">
            <strong>Women's Empowerment Summit</strong> - March 8th, 2024<br>
            <strong>Cultural Harmony Festival</strong> - April 15th, 2024<br>
            <strong>Health & Wellness Fair</strong> - May 20th, 2024
          </p>
          <p class="text-sm opacity-90">
            All events are open to the public. Registration required for some activities.
          </p>
        </div>
      </div>
    `
  }
];

// Achievements Cards Data
export const achievementsData: AchievementCard[] = [
  {
    id: 1,
    icon: "👩‍❤‍👩",
    number: "200+",
    title: "Lives Empowered",
    description: "Women supported through our various programs"
  },
  {
    id: 2,
    icon: "💖",
    number: "75+",
    title: "Successful Matches",
    description: "Meaningful connections facilitated"
  },
  {
    id: 3,
    icon: "🏢",
    number: "50+",
    title: "Cities Reached",
    description: "Geographic spread of our impact"
  },
  {
    id: 4,
    icon: "🗓️",
    number: "5+",
    title: "Years of Service",
    description: "Dedicated service to the community"
  }
];

// Success Stories Data
export const successStoriesData: SuccessStory[] = [
  {
    id: 1,
    quote: "MANAS Foundation helped me find not just a partner, but a new beginning. The support and understanding I received made all the difference in my journey.",
    author: "Priya Sharma",
    location: "Mumbai • Beneficiary"
  },
  {
    id: 2,
    quote: "Through MANAS Foundation, I connected with someone who truly understands my situation. It's more than matchmaking - it's about rebuilding lives with dignity.",
    author: "Anita Verma",
    location: "Delhi • Beneficiary"
  },
  {
    id: 3,
    quote: "Working with MANAS Foundation has been incredibly rewarding. Seeing women regain their confidence and find happiness again is truly inspiring.",
    author: "Dr. Rajesh Gupta",
    location: "Chennai • Volunteer"
  }
];

// Media Cards Data
export const mediaCardsData: MediaCard[] = [
  {
    id: 1,
    title: "MANAS Foundation Featured in National Women's Day Coverage",
    date: "March 8, 2024",
    source: "Times of India",
    description: "Our work in empowering widows and divorced women was highlighted in national media coverage on International Women's Day.",
    imageUrl: "/images/no-photo.svg",
    link: "#"
  },
  {
    id: 2,
    title: "Success Story: 50 Successful Matches This Year",
    date: "February 15, 2024",
    source: "Hindu Business Line",
    description: "MANAS Foundation celebrates milestone of facilitating 50 successful matches between widows/divorced women and understanding partners.",
    imageUrl: "/images/no-photo.svg",
    link: "#"
  },
  {
    id: 3,
    title: "NGO Recognition Award for Social Impact",
    date: "January 20, 2024",
    source: "Indian Express",
    description: "Foundation receives recognition for innovative approach to addressing social stigma around widow remarriage in Indian society.",
    imageUrl: "/images/no-photo.svg",
    link: "#"
  },
  {
    id: 4,
    title: "Community Impact: 200+ Lives Transformed",
    date: "December 10, 2023",
    source: "The Hindu",
    description: "Local newspaper features our community outreach programs and the positive impact on women's lives across multiple cities.",
    imageUrl: "/images/no-photo.svg",
    link: "#"
  },
  {
    id: 5,
    title: "Digital Innovation in Social Work",
    date: "November 25, 2023",
    source: "Economic Times",
    description: "Our digital platform for matchmaking and community support receives recognition for innovative use of technology in social work.",
    imageUrl: "/images/no-photo.svg",
    link: "#"
  },
  {
    id: 6,
    title: "Volunteer Recognition Program",
    date: "October 15, 2023",
    source: "Deccan Herald",
    description: "Annual volunteer recognition program celebrates the dedication and contribution of our volunteer team in empowering women.",
    imageUrl: "/images/no-photo.svg",
    link: "#"
  }
]; 