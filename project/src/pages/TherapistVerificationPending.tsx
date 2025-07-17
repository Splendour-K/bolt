import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, FileText, Mail, Phone } from 'lucide-react';

export function TherapistVerificationPending() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification in Progress</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thank you for joining LanSpeech as a therapist! We're currently reviewing your credentials 
          and will have you set up within 24-48 hours.
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next?</h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Document Review</h3>
              <p className="text-sm text-gray-600">
                Our team is verifying your professional license, insurance, and credentials. 
                This ensures all therapists on our platform meet the highest standards.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Profile Setup</h3>
              <p className="text-sm text-gray-600">
                Once verified, you'll receive access to your therapist dashboard where you can 
                complete your profile, set your availability, and start receiving bookings.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Welcome Email</h3>
              <p className="text-sm text-gray-600">
                You'll receive a welcome email with your dashboard login credentials and 
                a guide to getting started on the platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">While You Wait</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Review our therapist guidelines and best practices</li>
            <li>• Prepare your professional bio and specialties</li>
            <li>• Think about your preferred session rates</li>
            <li>• Consider your availability schedule</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Platform Benefits</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• Secure, HIPAA-compliant video sessions</li>
            <li>• Automated scheduling and payment processing</li>
            <li>• Client progress tracking and analytics</li>
            <li>• Professional liability insurance coverage</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you have questions about the verification process or need to update your submitted documents, 
          our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:therapist-support@lanspeech.com"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Support</span>
          </a>
          <a
            href="tel:1-800-LANSPEECH"
            className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Support</span>
          </a>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}