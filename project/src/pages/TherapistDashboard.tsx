import React, { useState } from 'react';
import { Calendar, Clock, User, MessageCircle, TrendingUp, Bell, Settings, FileText, Video, Phone, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { MeetingRoom } from '../components/MeetingRoom';
import { MeetingService } from '../services/meetingService';

export function TherapistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data - in real app, this would come from API
  const therapistProfile = {
    name: 'Dr. Sarah Chen',
    specialty: 'Stuttering & Fluency',
    rating: 4.9,
    totalSessions: 1247,
    activeClients: 23,
    monthlyRevenue: 8400,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const upcomingBookings = [
    {
      id: 1,
      clientName: 'Alex Thompson',
      clientId: 'client_123',
      date: '2025-01-20',
      time: '10:00 AM',
      sessionType: 'Follow-up Session',
      duration: 50,
      status: 'confirmed',
      isNewClient: false,
      sessionNumber: 4,
      lastSession: '2025-01-13',
      concerns: 'Working on presentation skills for upcoming work presentation',
      preferredContact: 'video',
      progressAccess: true,
      meetingUrl: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      clientName: 'Maria Santos',
      clientId: 'client_456',
      date: '2025-01-20',
      time: '2:00 PM',
      sessionType: 'Initial Assessment',
      duration: 60,
      status: 'confirmed',
      isNewClient: true,
      sessionNumber: 1,
      concerns: 'Struggling with phone calls at work, wants to build confidence',
      preferredContact: 'video',
      progressAccess: false,
      meetingUrl: 'https://meet.google.com/xyz-uvwx-rst'
    },
    {
      id: 3,
      clientName: 'David Kim',
      clientId: 'client_789',
      date: '2025-01-21',
      time: '11:00 AM',
      sessionType: 'Intensive Workshop',
      duration: 90,
      status: 'pending_confirmation',
      isNewClient: false,
      sessionNumber: 8,
      lastSession: '2025-01-14',
      concerns: 'Preparing for conference presentation next month',
      preferredContact: 'video',
      progressAccess: true,
      meetingUrl: 'https://meet.google.com/lmn-opqr-stu'
    }
  ];

  const clientProgress = {
    'client_123': {
      name: 'Alex Thompson',
      totalSessions: 3,
      practiceMinutes: 127,
      improvementScore: 78,
      lastPractice: '2025-01-18',
      strengths: ['Clear articulation', 'Good pacing', 'Confident tone'],
      workingOn: ['Reducing filler words', 'Eye contact during presentations'],
      recentActivity: [
        { date: '2025-01-18', type: 'AI Practice', duration: 15, topic: 'Presentation Skills' },
        { date: '2025-01-17', type: 'AI Practice', duration: 12, topic: 'Job Interview' },
        { date: '2025-01-16', type: 'Monthly Talk', topic: 'My Journey with Confidence' }
      ],
      goals: [
        { goal: 'Give presentation without notes', progress: 60, target: '2025-02-15' },
        { goal: 'Reduce "um" usage by 50%', progress: 80, target: '2025-01-30' }
      ]
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'clients', label: 'Client Progress', icon: User },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleBookingAction = (bookingId, action) => {
    console.log(`${action} booking ${bookingId}`);
    // In real app, this would make API calls
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={therapistProfile.image}
            alt={therapistProfile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{therapistProfile.name}</h1>
            <p className="text-blue-600 font-medium mb-2">{therapistProfile.specialty}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{therapistProfile.rating} rating</span>
              </div>
              <div>{therapistProfile.totalSessions} total sessions</div>
              <div>{therapistProfile.activeClients} active clients</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${therapistProfile.monthlyRevenue}</div>
            <div className="text-sm text-gray-500">This month</div>
          </div>
        </div>
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-xs text-gray-500">Today's Sessions</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <User className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">23</div>
                <div className="text-xs text-gray-500">Active Clients</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">94%</div>
                <div className="text-xs text-gray-500">Client Satisfaction</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-xs text-gray-500">Practice Sessions</div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {upcomingBookings.filter(booking => booking.date === '2025-01-20').map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.time} - {booking.clientName}</p>
                        <p className="text-sm text-gray-600">{booking.sessionType} ({booking.duration} min)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {booking.preferredContact === 'video' ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Phone className="w-4 h-4 text-green-600" />
                      )}
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        Join Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Bell className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">New booking request</p>
                    <p className="text-xs text-gray-500">Maria Santos - Initial Assessment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Client progress update</p>
                    <p className="text-xs text-gray-500">Alex completed 15 min practice session</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-4 h-4 text-orange-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Session reminder</p>
                    <p className="text-xs text-gray-500">David Kim - 11:00 AM tomorrow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Block Time Slot
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Update Availability
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  View Client Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Bookings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{booking.clientName}</h3>
                      {booking.isNewClient && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          New Client
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        booking.status === 'confirmed' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(booking.date)} at {booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.sessionType} ({booking.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {booking.preferredContact === 'video' ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <Phone className="w-4 h-4" />
                          )}
                          <span>{booking.preferredContact === 'video' ? 'Video Call' : 'Phone Call'}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div><strong>Session #{booking.sessionNumber}</strong></div>
                        {booking.lastSession && (
                          <div>Last session: {formatDate(booking.lastSession)}</div>
                        )}
                        <div>Progress access: {booking.progressAccess ? 'Granted' : 'Pending'}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700"><strong>Client concerns:</strong> {booking.concerns}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    {booking.status === 'pending_confirmation' && (
                      <>
                        <button
                          onClick={() => handleBookingAction(booking.id, 'confirm')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleBookingAction(booking.id, 'decline')}
                          className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          <a href={booking.meetingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                            <Video className="w-4 h-4" />
                            <span>Join Session</span>
                          </a>
                        </button>
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client Progress Tab */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          {Object.entries(clientProgress).map(([clientId, progress]) => (
            <div key={clientId} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{progress.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Improvement Score:</span>
                  <span className="text-lg font-bold text-green-600">{progress.improvementScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{progress.totalSessions}</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{progress.practiceMinutes}</div>
                  <div className="text-sm text-gray-600">Practice Minutes</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{formatDate(progress.lastPractice)}</div>
                  <div className="text-sm text-gray-600">Last Practice</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Current Goals</h4>
                  <div className="space-y-3">
                    {progress.goals.map((goal, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{goal.goal}</span>
                          <span className="text-gray-500">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Target: {formatDate(goal.target)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {progress.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="text-sm font-medium">{activity.type}</div>
                          <div className="text-xs text-gray-500">{activity.topic}</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {activity.duration && `${activity.duration}m`} • {formatDate(activity.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
                  <div className="space-y-1">
                    {progress.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Working On</h4>
                  <div className="space-y-1">
                    {progress.workingOn.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Your Schedule</h2>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Calendar integration coming soon</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Connect Calendar
            </button>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Therapist Settings</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <input
                    type="text"
                    defaultValue={therapistProfile.specialty}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Rate</label>
                  <input
                    type="number"
                    defaultValue="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Availability Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Accept new client bookings</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Allow weekend appointments</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Offer emergency sessions</span>
                </label>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}