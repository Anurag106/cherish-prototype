'use client'

import { XMarkIcon, HeartIcon, ChatBubbleLeftIcon, PlusIcon } from '@heroicons/react/24/outline'

interface CelebrationPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  celebration: {
    type: 'welcome' | 'birthday' | 'work-anniversary' | 'custom'
    headline: string
    message: string
    points: number
    icon?: string
    image?: string
  }
}

export default function CelebrationPreviewModal({ isOpen, onClose, celebration }: CelebrationPreviewModalProps) {
  if (!isOpen) return null

  const getDefaultImage = (type: string) => {
    switch (type) {
      case 'birthday':
        return (
          <div className="w-full h-full bg-pink-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Cupcake illustration */}
            <div className="relative">
              <div className="w-20 h-16 bg-green-400 rounded-t-full"></div>
              <div className="w-16 h-12 bg-yellow-200 rounded-t-lg absolute -top-2 left-2"></div>
              <div className="w-2 h-6 bg-yellow-600 absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
              {/* Confetti dots */}
              <div className="absolute inset-0">
                <div className="w-2 h-2 bg-red-400 rounded-full absolute top-2 left-4"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1 right-2"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full absolute top-4 right-6"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full absolute bottom-2 left-1"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full absolute bottom-1 right-4"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full absolute top-6 left-6"></div>
              </div>
            </div>
          </div>
        )
      case 'work-anniversary':
        return (
          <div className="w-full h-full bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Trophy and confetti */}
            <div className="relative">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div className="w-12 h-6 bg-yellow-400 rounded-t-lg absolute -bottom-2 left-2"></div>
              {/* Confetti shapes */}
              <div className="absolute inset-0 -m-8">
                <div className="w-3 h-3 bg-red-500 absolute top-2 left-4 transform rotate-45"></div>
                <div className="w-3 h-3 bg-blue-500 absolute top-4 right-2 transform rotate-45"></div>
                <div className="w-3 h-3 bg-green-500 absolute top-6 right-8 transform rotate-45"></div>
                <div className="w-3 h-3 bg-purple-500 absolute bottom-4 left-2 transform rotate-45"></div>
                <div className="w-3 h-3 bg-yellow-500 absolute bottom-2 right-4 transform rotate-45"></div>
                <div className="w-2 h-6 bg-orange-400 absolute top-8 left-6 transform rotate-12"></div>
                <div className="w-2 h-6 bg-pink-400 absolute top-3 right-6 transform -rotate-12"></div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-2 shadow-soft">
                <HeartIcon className="w-8 h-8 text-cherish-yellow-mono" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )
    }
  }

  const formatMessage = (message: string, type: string) => {
    let formatted = message
      .replace('@recipient', '@aiden.neibieski')
      .replace('birth_date', 'March 28')
      .replace('nth', '1st')
    
    return formatted
  }

  const getProfileImage = (type: string) => {
    // Return a mock profile image based on celebration type
    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
          <h2 className="text-xl font-bold text-cherish-dark">Post preview</h2>
          <button
            onClick={onClose}
            className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6">
          {/* Post Card */}
          <div className="bg-white border border-cherish-gray-200 rounded-2xl shadow-soft overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center">
                  {celebration.icon ? (
                    <img src={celebration.icon} alt="Icon" className="w-8 h-8 rounded-lg" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-cherish-yellow-mono" />
                  )}
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  +{celebration.points}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-cherish-gray-500">3d ago</span>
                <button className="p-1 text-cherish-gray-400 hover:text-cherish-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                <button className="p-1 text-cherish-gray-400 hover:text-cherish-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="p-1 text-cherish-gray-400 hover:text-cherish-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <div className="flex items-start gap-3">
                <img
                  src={getProfileImage(celebration.type)}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-cherish-dark text-lg mb-2">
                    {celebration.headline}
                  </h3>
                  <p className="text-cherish-gray-700 mb-4">
                    {formatMessage(celebration.message, celebration.type)}
                  </p>
                </div>
                <div className="w-32 h-32 flex-shrink-0">
                  {celebration.image ? (
                    <img
                      src={celebration.image}
                      alt="Celebration"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    getDefaultImage(celebration.type)
                  )}
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 pb-4 flex items-center gap-6">
              <button className="flex items-center gap-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Comment</span>
              </button>
              <button className="flex items-center gap-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors">
                <PlusIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Add-on</span>
              </button>
              <button className="flex items-center gap-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors ml-auto">
                <HeartIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Like</span>
              </button>
            </div>
          </div>

          {/* Additional Info */}
          {celebration.type === 'work-anniversary' && (
            <div className="mt-4 text-sm text-cherish-gray-600 text-center">
              Posts will look like this for all celebrated anniversary years. Point amounts may differ.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
