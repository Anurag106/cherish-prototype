'use client'

import { useState } from 'react'
import { GiftIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import ColorfulAvatar from '@/components/ColorfulAvatar'

interface IncentiveData {
  id: string
  title: string
  description: string
  timeframe: string
  participantCount: number
  participants: Array<{
    name: string
    avatar?: string
  }>
  additionalCount?: number
  icon?: string
}

interface IncentivesCardProps {
  onExploreAll: () => void
  onClaimIncentive: (incentiveId: string) => void
}

export default function IncentivesCard({ onExploreAll, onClaimIncentive }: IncentivesCardProps) {
  const [incentives] = useState<IncentiveData[]>([
    {
      id: 'social-media-superstar',
      title: 'Social Media Superstar',
      description: 'Share meaningful content about our company on social media',
      timeframe: 'Today',
      participantCount: 29,
      participants: [
        { name: 'Alex Chen' },
        { name: 'Sarah Johnson' },
        { name: 'Mike Wilson' },
        { name: 'Emma Davis' }
      ],
      additionalCount: 25,
      icon: '📱'
    },
    {
      id: 'annual-security-training',
      title: 'Annual Security Training',
      description: 'Complete your mandatory annual security training',
      timeframe: 'Today',
      participantCount: 11,
      participants: [
        { name: 'Jessica Kim' },
        { name: 'David Rodriguez' },
        { name: 'Lisa Thompson' }
      ],
      additionalCount: 7,
      icon: '🔒'
    },
    {
      id: 'renewal-rockstar',
      title: 'Renewal Rockstar',
      description: 'Successfully renew client contracts and maintain relationships',
      timeframe: 'This week',
      participantCount: 2,
      participants: [
        { name: 'Amanda Foster' },
        { name: 'Ryan Martinez' }
      ],
      icon: '⭐'
    }
  ])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <GiftIcon className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-primary-900">Recently claimed</h3>
        </div>
        <button 
          onClick={onExploreAll}
          className="text-brand-600 hover:text-brand-700 text-sm font-semibold transition-colors"
        >
          Explore all
        </button>
      </div>

      <div className="space-y-4">
        {incentives.map((incentive) => (
          <div key={incentive.id} className="group bg-primary-50 hover:bg-primary-100 rounded-xl p-4 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {/* Icon and Title */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {incentive.icon && (
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-sm">{incentive.icon}</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-brand-600 truncate">
                      {incentive.title}
                    </h4>
                    <p className="text-xs text-primary-500">
                      {incentive.timeframe}
                    </p>
                  </div>
                </div>

                {/* Participants and Count */}
                <div className="flex items-center space-x-3 flex-1 justify-center">
                  <div className="flex -space-x-1.5">
                    {incentive.participants.slice(0, 3).map((participant, idx) => (
                      <ColorfulAvatar
                        key={idx}
                        name={participant.name}
                        size="sm"
                        className="border-2 border-white hover:scale-110 transition-transform cursor-pointer"
                      />
                    ))}
                    {incentive.additionalCount && incentive.additionalCount > 0 && (
                      <div className="w-8 h-8 bg-primary-300 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-700">
                          +{incentive.additionalCount}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-primary-900">
                      {incentive.participantCount}
                    </p>
                    <p className="text-xs text-primary-500">earned</p>
                  </div>
                </div>

                {/* Claim Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => onClaimIncentive(incentive.id)}
                    className="opacity-0 group-hover:opacity-100 bg-brand-500 hover:bg-brand-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
