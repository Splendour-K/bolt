import React, { useState, useEffect } from 'react';
import { Video, Phone, Calendar, Clock, Users, ExternalLink, Copy, Check } from 'lucide-react';
import { MeetingDetails } from '../services/meetingService';

interface MeetingRoomProps {
  meeting: MeetingDetails;
  userRole: 'client' | 'therapist';
  onEndSession?: () => void;
}

export function MeetingRoom({ meeting, userRole, onEndSession }: MeetingRoomProps) {
  const [timeUntilMeeting, setTimeUntilMeeting] = useState<string>('');
  const [meetingStatus, setMeetingStatus] = useState<'upcoming' | 'live' | 'ended'>('upcoming');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateMeetingStatus = () => {
      const now = new Date();
      const startTime = new Date(meeting.startTime);
      const endTime = new Date(meeting.endTime);
      const fiveMinutesBefore = new Date(startTime.getTime() - 5 * 60000);

      if (now < fiveMinutesBefore) {
        setMeetingStatus('upcoming');
        const timeDiff = startTime.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
          setTimeUntilMeeting(`${hours}h ${minutes}m`);
        } else {
          setTimeUntilMeeting(`${minutes}m`);
        }
      } else if (now >= fiveMinutesBefore && now <= endTime) {
        setMeetingStatus('live');
        setTimeUntilMeeting('');
      } else {
        setMeetingStatus('ended');
        setTimeUntilMeeting('');
      }
    };

    updateMeetingStatus();
    const interval = setInterval(updateMeetingStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [meeting.startTime, meeting.endTime]);

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(meeting.meetingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy meeting link:', err);
    }
  };

  const joinMeeting = () => {
    window.open(meeting.meetingUrl, '_blank', 'noopener,noreferrer');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`p-6 ${
          meetingStatus === 'live' 
            ? 'bg-green-50 border-b border-green-200' 
            : meetingStatus === 'upcoming'
            ? 'bg-blue-50 border-b border-blue-200'
            : 'bg-gray-50 border-b border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{meeting.title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(meeting.startTime)} at {formatTime(meeting.startTime)}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              meetingStatus === 'live'
                ? 'bg-green-100 text-green-800'
                : meetingStatus === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {meetingStatus === 'live' && '🔴 Live'}
              {meetingStatus === 'upcoming' && `⏰ Starts in ${timeUntilMeeting}`}
              {meetingStatus === 'ended' && '✅ Ended'}
            </div>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Duration</p>
                <p className="text-sm text-gray-600">
                  {Math.round((meeting.endTime.getTime() - meeting.startTime.getTime()) / 60000)} minutes
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Participants</p>
                <p className="text-sm text-gray-600">{meeting.participants.length + 1} people</p>
              </div>
            </div>
          </div>

          {meeting.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Session Notes</h3>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {meeting.description}
              </p>
            </div>
          )}

          {/* Meeting Link */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Meeting Link</h3>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Video className="w-4 h-4 text-gray-400" />
              <code className="flex-1 text-sm text-gray-700 font-mono">
                {meeting.meetingUrl}
              </code>
              <button
                onClick={copyMeetingLink}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy meeting link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {meetingStatus === 'live' || meetingStatus === 'upcoming' ? (
              <>
                <button
                  onClick={joinMeeting}
                  disabled={meetingStatus === 'upcoming' && timeUntilMeeting && !timeUntilMeeting.includes('m')}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    meetingStatus === 'live'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>
                    {meetingStatus === 'live' ? 'Join Meeting' : 'Join Meeting (Available 5 min before)'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={() => window.open(`tel:+1-555-MEET-NOW`, '_self')}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Join by Phone</span>
                </button>

                <button
                  onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meeting.title)}&dates=${meeting.startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${meeting.endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(meeting.description || '')}&location=${encodeURIComponent(meeting.meetingUrl)}`, '_blank')}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Calendar</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">This session has ended.</p>
                {onEndSession && (
                  <button
                    onClick={onEndSession}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Return to Dashboard
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Technical Requirements */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Before joining:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure you have a stable internet connection</li>
              <li>• Test your camera and microphone</li>
              <li>• Find a quiet, well-lit space</li>
              <li>• Have any session materials ready</li>
            </ul>
          </div>

          {/* Support Information */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact support at{' '}
              <a href="mailto:support@lanspeech.com" className="text-blue-600 hover:text-blue-700">
                support@lanspeech.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}