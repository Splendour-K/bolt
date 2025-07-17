import React from 'react';
import { useAIPractice } from '../hooks/useAIPractice';
import { SessionSelector } from '../components/SessionSelector';
import { ChatInterface } from '../components/ChatInterface';

export function PracticeAI() {
  const {
    messages,
    isLoading,
    isListening,
    currentSession,
    error,
    startSession,
    sendMessage,
    startListening,
    stopListening,
    speakMessage,
    endSession,
    clearError
  } = useAIPractice();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!currentSession ? (
        <SessionSelector 
          onStartSession={startSession}
          isLoading={isLoading}
        />
      ) : (
        <div className="h-[700px]">
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            isListening={isListening}
            onSendMessage={sendMessage}
            onStartListening={startListening}
            onStopListening={stopListening}
            onSpeakMessage={speakMessage}
            onEndSession={endSession}
            error={error}
          />
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={clearError}
            className="mt-2 text-red-600 text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {!currentSession && (
        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Before You Start</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• Make sure you're in a quiet environment</p>
              <p>• Allow microphone access when prompted</p>
              <p>• Take your time - there's no rush</p>
              <p>• Remember: every attempt is progress!</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Practice Topics</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Job interviews</li>
            <li>• Presentations</li>
            <li>• Casual conversations</li>
            <li>• Phone calls</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Feedback Areas</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Speaking pace</li>
            <li>• Clarity</li>
            <li>• Confidence building</li>
            <li>• Fluency techniques</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-2">Accessibility</h3>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Stutter-friendly pacing</li>
            <li>• No time pressure</li>
            <li>• Gentle corrections</li>
            <li>• Positive reinforcement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}