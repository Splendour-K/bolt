import React, { useState } from 'react';
import { Calendar, Clock, User, Star, MapPin, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { MeetingService, MeetingCreationRequest } from '../services/meetingService';

export function BookTherapist() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStep, setBookingStep] = useState('select'); // select, details, confirmation
  const [bookingDetails, setBookingDetails] = useState({
    sessionType: 'initial',
    concerns: '',
    previousTherapy: false,
    preferredContact: 'video'
  });

  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Stuttering & Fluency',
      rating: 4.9,
      reviewCount: 127,
      experience: '12 years',
      location: 'Online & NYC',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specializes in working with adults and teens who stutter. Uses evidence-based techniques including fluency shaping and stuttering modification in a supportive, judgment-free environment.',
      price: 120,
      credentials: ['CCC-SLP', 'Board Certified Fluency Specialist'],
      languages: ['English', 'Mandarin'],
      nextAvailable: '2025-01-20',
      sessionTypes: ['Initial Assessment', 'Follow-up Session', 'Intensive Workshop']
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      specialty: 'Public Speaking Anxiety',
      rating: 4.8,
      reviewCount: 89,
      experience: '8 years',
      location: 'Online & LA',
      image: 'https://images.pexels.com/photos/6749779/pexels-photo-6749779.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Helps individuals overcome public speaking fears and build confidence through cognitive behavioral techniques, exposure therapy, and practical speaking exercises.',
      price: 110,
      credentials: ['CCC-SLP', 'CBT Certified'],
      languages: ['English', 'Spanish'],
      nextAvailable: '2025-01-18',
      sessionTypes: ['Initial Assessment', 'Anxiety Management', 'Presentation Coaching']
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      specialty: 'Voice & Articulation',
      rating: 4.9,
      reviewCount: 156,
      experience: '15 years',
      location: 'Online & Chicago',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in voice therapy and articulation disorders. Particularly skilled with accent modification, voice feminization/masculinization, and professional voice training.',
      price: 130,
      credentials: ['CCC-SLP', 'Voice Specialist Certification'],
      languages: ['English', 'French'],
      nextAvailable: '2025-01-19',
      sessionTypes: ['Voice Assessment', 'Articulation Therapy', 'Accent Modification']
    }
  ];

  // Generate available time slots for the next 14 days
  const generateAvailableSlots = (therapistId) => {
    const slots = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for this example
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const dateStr = date.toISOString().split('T')[0];
      const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
      
      // Randomly make some slots unavailable for realism
      const availableTimes = times.filter(() => Math.random() > 0.3);
      
      if (availableTimes.length > 0) {
        slots.push({ date: dateStr, times: availableTimes });
      }
    }
    
    return slots;
  };

  const availableSlots = selectedTherapist ? generateAvailableSlots(selectedTherapist.id) : [];

  const handleTherapistSelect = (therapist) => {
    setSelectedTherapist(therapist);
    setSelectedDate('');
    setSelectedTime('');
    setBookingStep('select');
  };

  const handleBookingSubmit = () => {
    if (selectedTherapist && selectedDate && selectedTime) {
      // Create Google Meet link for the session
      const meetingService = MeetingService.getInstance();
      const meetingRequest: MeetingCreationRequest = {
        title: `Therapy Session with ${selectedTherapist.name}`,
        description: `${bookingDetails.sessionType} session. Client concerns: ${bookingDetails.concerns}`,
        startTime: new Date(`${selectedDate} ${selectedTime}`),
        duration: 50, // 50-minute session
        attendeeEmails: ['client@example.com'], // In production, use actual client email
        hostEmail: selectedTherapist.email || 'therapist@example.com'
      };
      
      meetingService.createMeeting(meetingRequest).then(meeting => {
        console.log('Meeting created:', meeting);
        // Store meeting details with booking
      });
      
      setBookingStep('confirmation');
      // In a real app, this would make an API call to create the booking
      setTimeout(() => {
        alert(`Booking confirmed with ${selectedTherapist.name} on ${selectedDate} at ${selectedTime}`);
        // Reset form
        setSelectedTherapist(null);
        setSelectedDate('');
        setSelectedTime('');
        setBookingStep('select');
        setBookingDetails({
          sessionType: 'initial',
          concerns: '',
          previousTherapy: false,
          preferredContact: 'video'
        });
      }, 2000);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (bookingStep === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Session Details</h3>
            <div className="text-sm text-green-800 space-y-1">
              <p><strong>Therapist:</strong> {selectedTherapist.name}</p>
              <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Session Type:</strong> {bookingDetails.sessionType}</p>
              <p><strong>Format:</strong> {bookingDetails.preferredContact === 'video' ? 'Video Call' : 'Phone Call'}</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            You'll receive a confirmation email with session details and a calendar invite. 
            Your therapist will contact you 24 hours before the session.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book a Session with Expert Therapists</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with certified speech-language pathologists who understand your journey and provide personalized, 
          evidence-based support in a comfortable, judgment-free environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Therapist Cards */}
        <div className="lg:col-span-2 space-y-6">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer hover:shadow-md ${
                selectedTherapist?.id === therapist.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200'
              }`}
              onClick={() => handleTherapistSelect(therapist)}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-32 h-32 rounded-lg object-cover mx-auto sm:mx-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                      <p className="text-blue-600 font-medium">{therapist.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500 mt-2 sm:mt-0">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {therapist.rating} ({therapist.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{therapist.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{therapist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>Video & Phone</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {therapist.credentials.map((cred, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {cred}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {therapist.languages.map((lang, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{therapist.bio}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${therapist.price}</span>
                      <span className="text-gray-600 text-sm">/session</span>
                      <p className="text-xs text-gray-500">Next available: {formatDate(therapist.nextAvailable)}</p>
                    </div>
                    <button
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTherapist?.id === therapist.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {selectedTherapist?.id === therapist.id ? 'Selected' : 'Select Therapist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Schedule Your Session</h3>
            
            {selectedTherapist ? (
              <div className="space-y-6">
                {/* Selected Therapist Summary */}
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <img
                    src={selectedTherapist.image}
                    alt={selectedTherapist.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                  <p className="font-medium text-gray-900">{selectedTherapist.name}</p>
                  <p className="text-sm text-blue-600">{selectedTherapist.specialty}</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">${selectedTherapist.price}/session</p>
                </div>

                {/* Session Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                  <select
                    value={bookingDetails.sessionType}
                    onChange={(e) => setBookingDetails({...bookingDetails, sessionType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {selectedTherapist.sessionTypes.map((type, index) => (
                      <option key={index} value={type.toLowerCase().replace(/\s+/g, '_')}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a date</option>
                    {availableSlots.map((slot) => (
                      <option key={slot.date} value={slot.date}>
                        {formatDate(slot.date)} ({slot.times.length} slots)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots
                        .find(slot => slot.date === selectedDate)
                        ?.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Session Details */}
                {selectedDate && selectedTime && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like to work on?
                      </label>
                      <textarea
                        value={bookingDetails.concerns}
                        onChange={(e) => setBookingDetails({...bookingDetails, concerns: e.target.value})}
                        placeholder="Briefly describe your goals or concerns..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Session Format
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="video"
                            checked={bookingDetails.preferredContact === 'video'}
                            onChange={(e) => setBookingDetails({...bookingDetails, preferredContact: e.target.value})}
                            className="mr-2"
                          />
                          <Video className="w-4 h-4 mr-1" />
                          Video Call (Recommended)
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="phone"
                            checked={bookingDetails.preferredContact === 'phone'}
                            onChange={(e) => setBookingDetails({...bookingDetails, preferredContact: e.target.value})}
                            className="mr-2"
                          />
                          <span className="w-4 h-4 mr-1">📞</span>
                          Phone Call
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <button
                  onClick={handleBookingSubmit}
                  disabled={!selectedDate || !selectedTime || !bookingDetails.concerns.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Book Session - ${selectedTherapist.price}
                </button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Sessions are 50 minutes long</p>
                  <p>• Free cancellation up to 24 hours before</p>
                  <p>• Insurance reimbursement available</p>
                  <p>• Secure, HIPAA-compliant platform</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Select a therapist to schedule your session</p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What to Expect</h4>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• Personalized assessment and treatment plan</li>
                    <li>• Evidence-based therapy techniques</li>
                    <li>• Supportive, judgment-free environment</li>
                    <li>• Progress tracking and homework exercises</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insurance & Payment Info */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance & Payment</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Most major insurance plans accepted</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Superbills provided for reimbursement</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Flexible payment plans available</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>HSA/FSA eligible</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>HIPAA-compliant platform</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>End-to-end encrypted sessions</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Secure data storage</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Licensed, certified therapists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}