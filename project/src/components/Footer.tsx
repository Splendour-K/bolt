import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About LanSpeech</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A supportive platform designed to help people overcome speech challenges and build confidence in public speaking. 
              We believe every voice deserves to be heard.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>support@lanspeech.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>1-800-LANSPEECH</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Join our inclusive community where every speaking journey is celebrated and supported.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for confident communication</span>
          </p>
        </div>
      </div>
    </footer>
  );
}