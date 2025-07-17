import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Mic, Calendar, BookOpen, Trophy } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Practice Partner',
      description: 'Practice with our supportive AI that provides gentle, encouraging feedback',
      link: '/practice',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Users,
      title: 'Expert Therapists',
      description: 'Book sessions with certified speech therapists who understand your journey',
      link: '/therapist',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Mic,
      title: 'Monthly Talks',
      description: 'Share your voice in our judgment-free TED-style speaking platform',
      link: '/talks',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Calendar,
      title: 'Annual Conference',
      description: 'Get invited to speak at our yearly celebration of diverse voices',
      link: '/conference',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access tools, exercises, and challenges to build your speaking confidence',
      link: '/resources',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Celebrate your improvements with personalized progress tracking',
      link: '/profile',
      color: 'bg-yellow-50 text-yellow-600'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Voice, <br />
            <span className="text-blue-600">Share Your Story</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            LanSpeech is a supportive platform designed to help people overcome speech challenges 
            and build confidence in public speaking. Every voice matters, and every story deserves to be heard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/practice"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Practicing
            </Link>
            <Link
              to="/therapist"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides multiple ways to practice, learn, and grow your speaking confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Speakers Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Therapists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">1,200+</div>
              <div className="text-gray-600">Talks Given</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}