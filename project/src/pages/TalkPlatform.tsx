import React, { useState } from 'react';
import { Calendar, Users, Clock, Trophy, Plus } from 'lucide-react';

export function TalkPlatform() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [talkTitle, setTalkTitle] = useState('');
  const [talkDescription, setTalkDescription] = useState('');

  const upcomingEvents = [
    {
      id: 1,
      title: 'March Speaking Circle',
      date: '2025-03-15',
      time: '7:00 PM EST',
      spotsLeft: 3,
      audienceSize: 25,
      theme: 'Personal Growth Stories'
    },
    {
      id: 2,
      title: 'April Innovation Talk',
      date: '2025-04-12',
      time: '7:00 PM EST',
      spotsLeft: 5,
      audienceSize: 30,
      theme: 'Technology & Accessibility'
    }
  ];

  const pastTalks = [
    {
      speaker: 'Alex Thompson',
      title: 'Finding My Voice Through Coding',
      date: '2025-01-15',
      views: 127,
      likes: 23
    },
    {
      speaker: 'Maria Santos',
      title: 'From Silence to Advocacy',
      date: '2025-01-08',
      views: 89,
      likes: 31
    },
    {
      speaker: 'David Kim',
      title: 'Building Confidence One Word at a Time',
      date: '2024-12-18',
      views: 156,
      likes: 42
    }
  ];

  const handleSubmitTalk = () => {
    if (talkTitle && talkDescription) {
      alert('Talk proposal submitted! We\'ll review it and get back to you within 48 hours.');
      setTalkTitle('');
      setTalkDescription('');
      setShowSubmissionForm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">LanSpeech Talk Platform</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Share your story in our supportive, judgment-free environment. Every month, we host intimate speaking events where community members can practice and inspire others.
        </p>
        <button
          onClick={() => setShowSubmissionForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Propose a Talk</span>
        </button>
      </div>

      {/* Submission Form Modal */}
      {showSubmissionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Propose Your Talk</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Talk Title
                </label>
                <input
                  type="text"
                  value={talkTitle}
                  onChange={(e) => setTalkTitle(e.target.value)}
                  placeholder="What's your talk about?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={talkDescription}
                  onChange={(e) => setTalkDescription(e.target.value)}
                  placeholder="Tell us about your story and what you'd like to share..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSubmitTalk}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Proposal
                </button>
                <button
                  onClick={() => setShowSubmissionForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {event.spotsLeft} spots left
                  </span>
                </div>
                
                <p className="text-blue-600 font-medium mb-3">{event.theme}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{event.audienceSize} audience members</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Sign Up to Speak
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Join Audience
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Talks */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Talks</h2>
          <div className="space-y-4">
            {pastTalks.map((talk, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{talk.title}</h3>
                <p className="text-blue-600 font-medium mb-3">by {talk.speaker}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{new Date(talk.date).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-4">
                    <span>{talk.views} views</span>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{talk.likes}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Watch Recording
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Speaking Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">What We Encourage:</h4>
            <ul className="space-y-1">
              <li>• Personal stories and experiences</li>
              <li>• Take your time - no rushing</li>
              <li>• Authentic, genuine sharing</li>
              <li>• Any topic that matters to you</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Our Promise:</h4>
            <ul className="space-y-1">
              <li>• Supportive, judgment-free environment</li>
              <li>• Accessible venue and technology</li>
              <li>• Practice sessions before your talk</li>
              <li>• Celebration of every voice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}