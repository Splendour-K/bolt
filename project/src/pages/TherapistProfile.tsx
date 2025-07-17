import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Star, MapPin, Calendar, DollarSign, Award, Languages, Clock } from 'lucide-react';

export function TherapistProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    specialty: user?.specialty || '',
    experience: user?.experience || '',
    sessionRate: user?.sessionRate || 120,
    location: user?.location || '',
    credentials: user?.credentials || [],
    languages: user?.languages || []
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

  const handleCredentialChange = (index: number, value: string) => {
    const newCredentials = [...editForm.credentials];
    newCredentials[index] = value;
    setEditForm({ ...editForm, credentials: newCredentials });
  };

  const addCredential = () => {
    setEditForm({ ...editForm, credentials: [...editForm.credentials, ''] });
  };

  const removeCredential = (index: number) => {
    const newCredentials = editForm.credentials.filter((_, i) => i !== index);
    setEditForm({ ...editForm, credentials: newCredentials });
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...editForm.languages];
    newLanguages[index] = value;
    setEditForm({ ...editForm, languages: newLanguages });
  };

  const addLanguage = () => {
    setEditForm({ ...editForm, languages: [...editForm.languages, ''] });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = editForm.languages.filter((_, i) => i !== index);
    setEditForm({ ...editForm, languages: newLanguages });
  };

  const therapistStats = [
    { label: 'Total Sessions', value: '156', icon: Calendar, color: 'text-blue-600' },
    { label: 'Client Rating', value: '4.9', icon: Star, color: 'text-yellow-600' },
    { label: 'Active Clients', value: '23', icon: User, color: 'text-green-600' },
    { label: 'This Month', value: '$3,840', icon: DollarSign, color: 'text-purple-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
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
                  type="text"
                  value={editForm.specialty}
                  onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-purple-600 font-medium"
                  placeholder="Specialty (e.g., Stuttering & Fluency)"
                />
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
                  rows={3}
                  placeholder="Professional bio and approach..."
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-purple-600 font-medium mb-3">{user?.specialty || 'Speech-Language Pathologist'}</p>
                {user?.phone && (
                  <p className="text-sm text-gray-500 mb-2">📞 {user.phone}</p>
                )}
                <p className="text-sm text-gray-500 max-w-md">
                  {user?.bio || 'Dedicated speech-language pathologist helping clients achieve their communication goals.'}
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
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
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
            {therapistStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                <div className={`w-8 h-8 ${stat.color} mx-auto mb-2`}>
                  <stat.icon className="w-full h-full" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="e.g., 12 years"
                  />
                ) : (
                  <p className="text-gray-900">{user?.experience || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Session Rate</label>
                {isEditing ? (
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">$</span>
                    <input
                      type="number"
                      value={editForm.sessionRate}
                      onChange={(e) => setEditForm({ ...editForm, sessionRate: parseInt(e.target.value) })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      placeholder="120"
                    />
                    <span className="text-gray-500 ml-1">/session</span>
                  </div>
                ) : (
                  <p className="text-gray-900">${user?.sessionRate || 120}/session</p>
                )}
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="e.g., Online & NYC"
                  />
                ) : (
                  <p className="text-gray-900">{user?.location || 'Online'}</p>
                )}
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">License Number</label>
                <p className="text-gray-900">{user?.licenseNumber || 'SLP-12345'}</p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Credentials & Certifications</h2>
              {isEditing && (
                <button
                  onClick={addCredential}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                >
                  Add Credential
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                {editForm.credentials.map((credential, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={credential}
                      onChange={(e) => handleCredentialChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      placeholder="Enter credential..."
                    />
                    <button
                      onClick={() => removeCredential(index)}
                      className="text-red-600 hover:text-red-800 px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(user?.credentials || ['CCC-SLP', 'Board Certified Fluency Specialist']).map((credential, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {credential}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
              {isEditing && (
                <button
                  onClick={addLanguage}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                >
                  Add Language
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                {editForm.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => handleLanguageChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      placeholder="Enter language..."
                    />
                    <button
                      onClick={() => removeLanguage(index)}
                      className="text-red-600 hover:text-red-800 px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(user?.languages || ['English', 'Mandarin']).map((language, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {language}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                View Dashboard
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Manage Schedule
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Client Progress
              </button>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Account Type</label>
                <p className="text-gray-900 capitalize">{user?.role}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Verification Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  user?.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.verified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-gray-700 hover:text-purple-600 transition-colors">
                Availability Settings
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-purple-600 transition-colors">
                Notification Preferences
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-purple-600 transition-colors">
                Payment Settings
              </button>
              <button className="w-full text-left text-sm text-gray-700 hover:text-purple-600 transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}