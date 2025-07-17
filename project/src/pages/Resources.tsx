import React, { useState } from 'react';
import { BookOpen, PlayCircle, Target, Users, Download, Star } from 'lucide-react';

export function Resources() {
  const [activeTab, setActiveTab] = useState('exercises');

  const exercises = [
    {
      title: 'Breathing for Fluency',
      description: 'Learn diaphragmatic breathing techniques to support smooth speech',
      duration: '10 minutes',
      difficulty: 'Beginner',
      type: 'Audio Guide'
    },
    {
      title: 'Easy Onset Practice',
      description: 'Gentle speech initiation exercises to reduce tension',
      duration: '15 minutes',
      difficulty: 'Beginner',
      type: 'Interactive'
    },
    {
      title: 'Slow Motion Speech',
      description: 'Practice speaking at a slower pace to improve fluency',
      duration: '20 minutes',
      difficulty: 'Intermediate',
      type: 'Video Guide'
    },
    {
      title: 'Presentation Structure',
      description: 'Learn to organize your thoughts for clear, confident delivery',
      duration: '25 minutes',
      difficulty: 'Intermediate',
      type: 'Workshop'
    }
  ];

  const articles = [
    {
      title: 'Understanding Your Speech Pattern',
      author: 'Dr. Sarah Chen',
      readTime: '8 min read',
      category: 'Foundation',
      excerpt: 'Learn to identify your unique speech patterns and work with them, not against them.'
    },
    {
      title: 'Building Confidence Through Small Wins',
      author: 'Marcus Johnson',
      readTime: '6 min read',
      category: 'Confidence',
      excerpt: 'Practical strategies for celebrating progress and building speaking confidence gradually.'
    },
    {
      title: 'Workplace Communication Strategies',
      author: 'Emma Rodriguez',
      readTime: '12 min read',
      category: 'Professional',
      excerpt: 'Navigate professional settings with confidence using these proven communication techniques.'
    },
    {
      title: 'The Science of Stuttering',
      author: 'Dr. Michael Torres',
      readTime: '10 min read',
      category: 'Research',
      excerpt: 'Latest research findings on stuttering mechanisms and evidence-based treatments.'
    }
  ];

  const challenges = [
    {
      title: '7-Day Speaking Challenge',
      description: 'Start small with daily 2-minute speaking exercises',
      participants: 1284,
      duration: '1 week',
      difficulty: 'Beginner'
    },
    {
      title: 'Phone Call Confidence',
      description: 'Practice making phone calls with increasing complexity',
      participants: 856,
      duration: '2 weeks',
      difficulty: 'Intermediate'
    },
    {
      title: 'Public Speaking Bootcamp',
      description: 'Intensive 30-day program to build presentation skills',
      participants: 423,
      duration: '30 days',
      difficulty: 'Advanced'
    }
  ];

  const tools = [
    {
      name: 'Speech Pace Tracker',
      description: 'Monitor and adjust your speaking rate in real-time',
      type: 'Web App',
      icon: Target
    },
    {
      name: 'Voice Recorder & Analysis',
      description: 'Record practice sessions and track improvement over time',
      type: 'Mobile App',
      icon: PlayCircle
    },
    {
      name: 'Conversation Starter Cards',
      description: 'Downloadable cards for practicing social interactions',
      type: 'PDF Download',
      icon: Download
    },
    {
      name: 'Breathing Exercise Timer',
      description: 'Guided breathing sessions with customizable timing',
      type: 'Web Tool',
      icon: Target
    }
  ];

  const tabs = [
    { id: 'exercises', label: 'Practice Exercises', icon: Target },
    { id: 'articles', label: 'Articles & Guides', icon: BookOpen },
    { id: 'challenges', label: 'Challenges', icon: Star },
    { id: 'tools', label: 'Tools & Apps', icon: PlayCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive tools, exercises, and guides to support your speaking journey. All resources are designed with accessibility and individual progress in mind.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Practice Exercises */}
      {activeTab === 'exercises' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{exercise.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  {exercise.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Duration: {exercise.duration}</span>
                <span>Level: {exercise.difficulty}</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Start Exercise
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Articles & Guides */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {article.author}</p>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Read Article →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Challenges */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{challenge.title}</h3>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              
              <div className="space-y-2 mb-6 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{challenge.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="font-medium">{challenge.difficulty}</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                Join Challenge
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tools & Apps */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <tool.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                      {tool.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Launch Tool
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Personalized Guidance?</h2>
        <p className="text-gray-600 mb-6">
          Our resources are great for self-paced learning, but sometimes personal guidance makes all the difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Book a Therapist Session
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Join Community Discussion
          </button>
        </div>
      </div>
    </div>
  );
}