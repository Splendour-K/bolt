import React from 'react';
import { Trophy, Calendar, MapPin, Users, Star, Clock } from 'lucide-react';

export function Conference() {
  const featuredSpeakers = [
    {
      name: 'Emma Rodriguez',
      title: 'Overcoming Fear, Finding Freedom',
      bio: 'Software engineer who transformed her stutter into a superpower',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'TED Talk: 2M+ views'
    },
    {
      name: 'Marcus Johnson',
      title: 'The Power of Imperfect Communication',
      bio: 'Teacher and advocate for inclusive communication',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Author of "Speak Your Truth"'
    },
    {
      name: 'Dr. Priya Patel',
      title: 'Neurodiversity in Professional Settings',
      bio: 'Researcher and advocate for workplace inclusion',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Forbes 30 Under 30'
    }
  ];

  const conferenceStats = [
    { label: 'Speakers Selected', value: '24', icon: Users },
    { label: 'Attendees Expected', value: '500+', icon: MapPin },
    { label: 'Days of Programming', value: '3', icon: Calendar },
    { label: 'Countries Represented', value: '15', icon: Star }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Trophy className="w-4 h-4" />
          <span>Annual Conference 2025</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          LanSpeech Conference
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Voices That Matter
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Join us for three days of inspiring talks, workshops, and community connections. 
          Where every voice is celebrated and every story has the power to change lives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors">
            Apply to Speak
          </button>
          <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-50 transition-colors">
            Register to Attend
          </button>
        </div>
      </div>

      {/* Conference Details */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">When</h3>
            <p className="text-gray-600">September 15-17, 2025</p>
          </div>
          <div>
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Where</h3>
            <p className="text-gray-600">San Francisco Convention Center</p>
            <p className="text-sm text-gray-500">+ Virtual Attendance</p>
          </div>
          <div>
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Format</h3>
            <p className="text-gray-600">10-minute talks</p>
            <p className="text-sm text-gray-500">No slides required</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {conferenceStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Speakers */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Featured Speakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSpeakers.map((speaker, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{speaker.name}</h3>
              <h4 className="text-purple-600 font-medium mb-3">"{speaker.title}"</h4>
              <p className="text-gray-600 text-sm mb-3">{speaker.bio}</p>
              <div className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full inline-block">
                {speaker.achievement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Get Selected */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Get Selected</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selection Criteria</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <span>Active participation in LanSpeech monthly talks</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <span>Compelling personal story or unique perspective</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <span>Demonstrated growth in speaking confidence</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <span>Positive community engagement</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Process</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <span className="text-gray-700">Submit your story outline</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <span className="text-gray-700">Practice session with coach</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <span className="text-gray-700">Community vote & expert review</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                <span className="text-gray-700">Final selection announcement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Share Your Story?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Applications for 2025 open in June. Start participating in our monthly talks now to increase your chances of being selected.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Join Monthly Talks
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}