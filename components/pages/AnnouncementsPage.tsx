'use client'

import { 
  SpeakerWaveIcon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface AnnouncementsPageProps {
  onBack: () => void;
}

export default function AnnouncementsPage({ onBack }: AnnouncementsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-yellow-light"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center">
                  <SpeakerWaveIcon className="w-5 h-5 text-cherish-dark" />
                </div>
                <h1 className="text-2xl font-bold text-cherish-dark">Announcements</h1>
              </div>
            </div>
            <button className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors rounded-xl hover:bg-cherish-gray-100">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-cherish-gray-100">
          {/* Empty State */}
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-cherish-yellow-light to-cherish-yellow-light/50 rounded-3xl mx-auto flex items-center justify-center mb-6 border border-cherish-yellow/20">
                <div className="w-20 h-20 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center shadow-lg">
                  <SpeakerWaveIcon className="w-10 h-10 text-cherish-dark" />
                </div>
              </div>
              
              {/* Illustration */}
              <div className="max-w-sm mx-auto mb-8">
                <div className="bg-cherish-gray-100 rounded-2xl p-6 relative">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cherish-yellow-mono rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-cherish-dark rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-cherish-purple rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-cherish-gray-300 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-cherish-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-2 bg-cherish-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-cherish-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-cherish-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-cherish-dark mb-3">No active announcements</h3>
            <p className="text-cherish-gray-600 mb-2 text-lg">
              There are no announcements right now.
            </p>
            <p className="text-cherish-gray-500">
              Come back later
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
