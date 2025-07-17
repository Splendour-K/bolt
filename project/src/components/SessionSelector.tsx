import React from 'react';
import { MessageCircle, Presentation, Phone, Briefcase } from 'lucide-react';
import { PracticeSession } from '../services/aiService';

interface SessionSelectorProps {
  onStartSession: (type: PracticeSession['type'], difficulty: PracticeSession['difficulty']) => void;
  isLoading: boolean;
}

export function SessionSelector({ onStartSession, isLoading }: SessionSelectorProps) {
  const sessionTypes = [
    {
      type: 'conversation' as const,
      title: 'Casual Conversation',
      description: 'Practice everyday conversations and social interactions',
      icon: MessageCircle,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      type: 'presentation' as const,
      title: 'Presentation Skills',
      description: 'Work on structuring and delivering presentations',
      icon: Presentation,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      type: 'interview' as const,
      title: 'Job Interview',
      description: 'Practice interview questions and professional communication',
      icon: Briefcase,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      type: 'phone_call' as const,
      title: 'Phone Calls',
      description: 'Build confidence in voice-only communication',
      icon: Phone,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  const difficulties = [
    { value: 'beginner' as const, label: 'Beginner', description: 'Simple, supportive conversations' },
    { value: 'intermediate' as const, label: 'Intermediate', description: 'Moderate complexity topics' },
    { value: 'advanced' as const, label: 'Advanced', description: 'Complex scenarios and challenges' }
  ];

  const [selectedType, setSelectedType] = React.useState<PracticeSession['type'] | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<PracticeSession['difficulty']>('beginner');

  const handleStartSession = () => {
    if (selectedType) {
      onStartSession(selectedType, selectedDifficulty);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Practice Session</h2>
        <p className="text-gray-600">
          Select the type of conversation you'd like to practice. Remember, there's no pressure - 
          we'll go at your pace and celebrate every step forward.
        </p>
      </div>

      {/* Session Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What would you like to practice?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessionTypes.map((session) => (
            <button
              key={session.type}
              onClick={() => setSelectedType(session.type)}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                selectedType === session.type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${session.color}`}>
                  <session.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{session.title}</h4>
                  <p className="text-sm text-gray-600">{session.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      {selectedType && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose your comfort level</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.value}
                onClick={() => setSelectedDifficulty(difficulty.value)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedDifficulty === difficulty.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-1">{difficulty.label}</h4>
                <p className="text-sm text-gray-600">{difficulty.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Button */}
      {selectedType && (
        <div className="text-center">
          <button
            onClick={handleStartSession}
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Starting Session...' : 'Start Practice Session'}
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Your session will be private and supportive. Take your time, and remember - every attempt is progress!
          </p>
        </div>
      )}
    </div>
  );
}