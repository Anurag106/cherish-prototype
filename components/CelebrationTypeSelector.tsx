'use client'

import { XMarkIcon, GiftIcon, StarIcon, TrophyIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

interface CelebrationTypeSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: 'welcome' | 'birthday' | 'work-anniversary' | 'custom') => void
}

export default function CelebrationTypeSelector({ isOpen, onClose, onSelectType }: CelebrationTypeSelectorProps) {
  if (!isOpen) return null

  const celebrationTypes = [
    {
      type: 'welcome' as const,
      name: 'Welcome',
      description: 'Automatically welcome new employees when they join',
      icon: GiftIcon,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      type: 'birthday' as const,
      name: 'Birthday',
      description: 'Celebrate employee birthdays automatically',
      icon: StarIcon,
      color: 'bg-pink-100 text-pink-600',
      bgColor: 'hover:bg-pink-50'
    },
    {
      type: 'work-anniversary' as const,
      name: 'Work Anniversary',
      description: 'Recognize work anniversaries and milestones',
      icon: TrophyIcon,
      color: 'bg-green-100 text-green-600',
      bgColor: 'hover:bg-green-50'
    },
    {
      type: 'custom' as const,
      name: 'Custom',
      description: 'Create a custom celebration for special events',
      icon: Cog6ToothIcon,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'hover:bg-purple-50'
    }
  ]

  const handleSelectType = (type: 'welcome' | 'birthday' | 'work-anniversary' | 'custom') => {
    onSelectType(type)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
          <h2 className="text-xl font-bold text-cherish-dark">Create New Celebration</h2>
          <button
            onClick={onClose}
            className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-cherish-gray-600 mb-6">
            Choose the type of celebration you&apos;d like to create:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {celebrationTypes.map((celebrationType) => {
              const IconComponent = celebrationType.icon
              return (
                <button
                  key={celebrationType.type}
                  onClick={() => handleSelectType(celebrationType.type)}
                  className={`p-6 rounded-2xl border-2 border-primary-200 transition-all duration-200 text-left ${celebrationType.bgColor} hover:border-brand-500 hover:shadow-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${celebrationType.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-900 mb-2">
                        {celebrationType.name}
                      </h3>
                      <p className="text-sm text-primary-600">
                        {celebrationType.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-primary-200 bg-primary-50">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
