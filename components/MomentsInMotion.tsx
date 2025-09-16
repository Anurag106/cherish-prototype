'use client'

import { useState } from 'react'
import { 
  SparklesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  PlusIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'

interface MomentsInMotionProps {
  className?: string
}

const videoPrompts = [
  {
    id: 'try-video',
    title: 'Try video recognition!',
    description: "Your camera's been waiting for this moment.",
    icon: <VideoCameraIcon className="w-6 h-6 text-white" />,
    bgColor: 'from-cherish-yellow to-cherish-yellow-mono',
    isSpecial: true
  },
  {
    id: 'tough-issue',
    title: 'Who helped resolve a tough issue this week?',
    description: '',
    icon: <PlusIcon className="w-5 h-5 text-cherish-yellow-mono" />,
    bgColor: 'from-cherish-yellow-light/20 to-cherish-yellow/20',
    isSpecial: false
  },
  {
    id: 'brought-clarity',
    title: 'Who brought clarity when it was needed most?',
    description: '',
    icon: <PlusIcon className="w-5 h-5 text-cherish-yellow-mono" />,
    bgColor: 'from-cherish-yellow-light/20 to-cherish-yellow/20',
    isSpecial: false
  },
  {
    id: 'bigger-impact',
    title: 'What gesture made a bigger impact than expected?',
    description: '',
    icon: <PlusIcon className="w-5 h-5 text-cherish-yellow-mono" />,
    bgColor: 'from-cherish-yellow-light/20 to-cherish-yellow/20',
    isSpecial: false
  }
]

export default function MomentsInMotion({ className = '' }: MomentsInMotionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handlePromptClick = (promptId: string) => {
    if (promptId === 'try-video') {
      // Handle video recognition
      console.log('Starting video recognition...')
    } else {
      // Handle other prompts - could open recognition modal with pre-filled text
      console.log('Opening recognition for prompt:', promptId)
    }
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-cherish-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cherish-orange to-cherish-orange-light rounded-2xl flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-cherish-dark">Moments in motion</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-cherish-gray-400 hover:text-cherish-orange transition-colors rounded-xl hover:bg-cherish-orange-light/20"
        >
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handlePromptClick(prompt.id)}
                className={`
                  relative p-4 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-left group min-h-[120px] flex flex-col
                  ${prompt.isSpecial 
                    ? `bg-gradient-to-br ${prompt.bgColor} text-white shadow-lg` 
                    : `bg-gradient-to-br ${prompt.bgColor} border border-cherish-gray-200 hover:border-cherish-gray-300`
                  }
                `}
              >
                {prompt.isSpecial && (
                  <div className="absolute top-4 right-4">
                    <PlayIcon className="w-6 h-6 text-white/80" />
                  </div>
                )}
                
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`
                    w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${prompt.isSpecial 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white border border-cherish-gray-200 group-hover:border-cherish-gray-300'
                    }
                  `}>
                    {prompt.icon}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className={`
                    font-bold text-sm leading-tight mb-1
                    ${prompt.isSpecial ? 'text-white' : 'text-cherish-dark'}
                  `}>
                    {prompt.title}
                  </h4>
                  {prompt.description && (
                    <p className={`
                      text-sm leading-relaxed
                      ${prompt.isSpecial ? 'text-white/90' : 'text-cherish-gray-600'}
                    `}>
                      {prompt.description}
                    </p>
                  )}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {/* Additional content when expanded */}
          <div className="border-t border-cherish-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-cherish-gray-600">
                Capture meaningful moments as they happen
              </p>
              <button className="text-sm text-cherish-orange hover:text-cherish-orange-light transition-colors font-semibold">
                View all prompts →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed state preview */}
      {!isExpanded && (
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className="flex -space-x-2">
            {videoPrompts.slice(0, 3).map((prompt, index) => (
              <div
                key={prompt.id}
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-white shadow-md transition-all duration-300 hover:scale-110
                  ${prompt.isSpecial 
                    ? `bg-gradient-to-br ${prompt.bgColor}` 
                    : `bg-gradient-to-br ${prompt.bgColor} border-cherish-gray-200`
                  }
                `}
                style={{ zIndex: 10 - index }}
              >
                {prompt.icon}
              </div>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-cherish-gray-600 truncate">
              Ready to capture your next moment? Click to explore prompts.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
