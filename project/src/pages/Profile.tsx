import React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Calendar, Trophy, TrendingUp, Target, MessageCircle } from 'lucide-react';

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    goals: user?.goals || []
  });

  const handleSave = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...editForm.goals];
    newGoals[index] = value;
    setEditForm({ ...editForm, goals: newGoals });
  };

  const addGoal = () => {
    setEditForm({ ...editForm, goals: [...editForm.goals, ''] });
  };

  const removeGoal = (index: number) => {
    const newGoals = editForm.goals.filter((_, i) => i !== index);
    setEditForm({ ...editForm, goals: newGoals });
  };

  const userStats = [
    { label: 'Practice Sessions', value: '24', icon: MessageCircle, color: 'text-blue-600' },
    { label: 'Talks Given', value: '3', icon: Trophy, color: 'text-orange-600' },
    { label: 'Days Streak', value: '12', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Goals Completed', value: '8', icon: Target, color: 'text-purple-600' }
  ];

  const recentActivity = [
    {
      type: 'practice',
      title: 'Completed AI Practice Session',
      description: 'Worked on presentation skills for 15 minutes',
      time: '2 hours ago',
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'goal',
      title: 'Goal Achievement',
      description: 'Completed "Phone Call Confidence" challenge',
      time: '1 day ago',
      icon: Target,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'booking',
      title: 'Therapist Session Booked',
      description: 'Session with Dr. Sarah Chen scheduled for Friday',
      time: '3 days ago',
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const currentGoals = [
    {
      title: 'Practice Daily for 30 Days',
      progress: 40,
      target: '30 days',
      current: '12 days'
    },
    {
      title: 'Give First Monthly Talk',
      progress: 75,
      target: '1 talk',
      current: 'Preparing'
    },
    {
      title: 'Complete Beginner Course',
      progress: 60,
      target: '10 modules',
      current: '6 modules'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="text-center sm:text-left flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded text-lg font-bold"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded text-lg font-bold"
                    placeholder="Last name"
                  />
                </div>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 rounded"
                  placeholder="Phone number"
                />
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 rounded"
                  rows={2}
                  placeholder="Tell us about your speaking journey..."
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600 mb-3">
                  Member since {user?.memberSince ? new Date(user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                </p>
                {user?.phone && (
                  <p className="text-sm text-gray-500 mb-2">📞 {user.phone}</p>
                )}
                <p className="text-sm text-gray-500 max-w-md">
                  {user?.bio || '"LanSpeech has helped me find confidence in my voice. Every small step counts on this journey."'}
                </p>
              </>
            )}
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                <div className={`w-8 h-8 ${stat.color} mx-auto mb-2`}>
                  <stat.icon className="w-full h-full" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Goals */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Current Goals</h2>
              {isEditing && (
                <button
                  onClick={addGoal}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Add Goal
                </button>
              )}
            </div>
            <div className="space-y-6">
              {isEditing ? (
                <div className="space-y-3">
                  {editForm.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => handleGoalChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                        placeholder="Enter your goal..."
                      />
                      <button
                        onClick={() => removeGoal(index)}
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {user?.goals && user.goals.length > 0 ? (
                    user.goals.map((goal, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">{goal}</p>
                      </div>
                    ))
                  ) : (
                    currentGoals.map((goal, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-gray-900">{goal.title}</h3>
                          <span className="text-sm text-gray-500">{goal.current} / {goal.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{goal.progress}% complete</div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Account Type</label>
                <p className="text-gray-900 capitalize">{user?.role}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Member Since</label>
                <p className="text-gray-900">
                  {user?.memberSince ? new Date(user.memberSince).toLocaleDateString() : 'Recently'}
                </p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Practice Streak</label>
                <p className="text-gray-900">{user?.practiceStreak || 0} days</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Start AI Practice
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Book Therapist
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Browse Resources
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">First Talk</p>
                  <p className="text-xs text-gray-500">Completed your first monthly talk</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Goal Setter</p>
                  <p className="text-xs text-gray-500">Set and completed 5 goals</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Practice Streak</p>
                  <p className="text-xs text-gray-500">10 days of consistent practice</p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Notification Preferences
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Privacy Settings
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Accessibility Options
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}