'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon,
  GiftIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import ColorfulAvatar from '@/components/ColorfulAvatar'

interface IncentiveItem {
  id: string
  title: string
  description: string
  points: number
  icon: string
  category: string
  participantCount: number
  participants: Array<{
    name: string
    avatar?: string
  }>
  additionalCount?: number
  timeframe: string
  status: 'active' | 'completed' | 'pending'
  claimLimit?: string
  expiresIn?: string
  requirements?: string[]
}

interface ExploreIncentivesModalProps {
  isOpen: boolean
  onClose: () => void
  onClaimIncentive: (incentiveId: string) => void
}

export default function ExploreIncentivesModal({ isOpen, onClose, onClaimIncentive }: ExploreIncentivesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [incentives] = useState<IncentiveItem[]>([
    {
      id: 'social-media-superstar',
      title: 'Social Media Superstar',
      description: 'Share meaningful content about our company on social media platforms. Help us build our brand presence and engage with our community.',
      points: 100,
      icon: '📱',
      category: 'Marketing',
      participantCount: 29,
      participants: [
        { name: 'Alex Chen' },
        { name: 'Sarah Johnson' },
        { name: 'Mike Wilson' },
        { name: 'Emma Davis' }
      ],
      additionalCount: 25,
      timeframe: 'Today',
      status: 'active',
      claimLimit: '1 per month',
      expiresIn: '15 days',
      requirements: ['Post on LinkedIn, Twitter, or Instagram', 'Tag company account', 'Use relevant hashtags']
    },
    {
      id: 'annual-security-training',
      title: 'Annual Security Training',
      description: 'Complete your mandatory annual security training to help keep our organization safe and secure.',
      points: 50,
      icon: '🔒',
      category: 'Training',
      participantCount: 11,
      participants: [
        { name: 'Jessica Kim' },
        { name: 'David Rodriguez' },
        { name: 'Lisa Thompson' }
      ],
      additionalCount: 7,
      timeframe: 'Today',
      status: 'active',
      claimLimit: '1 per year',
      expiresIn: '30 days',
      requirements: ['Complete all training modules', 'Pass final assessment', 'Submit completion certificate']
    },
    {
      id: 'renewal-rockstar',
      title: 'Renewal Rockstar',
      description: 'Successfully renew client contracts and maintain strong customer relationships.',
      points: 200,
      icon: '⭐',
      category: 'Sales',
      participantCount: 2,
      participants: [
        { name: 'Amanda Foster' },
        { name: 'Ryan Martinez' }
      ],
      timeframe: 'This week',
      status: 'active',
      claimLimit: 'Unlimited',
      requirements: ['Renew contract worth $10K+', 'Maintain 95% customer satisfaction', 'Document renewal process']
    },
    {
      id: 'wellness-wednesday',
      title: 'Wellness Wednesday',
      description: 'Participate in our weekly wellness activities and promote a healthy work-life balance.',
      points: 25,
      icon: '🧘',
      category: 'Wellness',
      participantCount: 18,
      participants: [
        { name: 'Maria Garcia' },
        { name: 'Tom Anderson' },
        { name: 'Kelly Brown' }
      ],
      additionalCount: 15,
      timeframe: 'This week',
      status: 'active',
      claimLimit: '1 per week',
      expiresIn: '3 days',
      requirements: ['Attend wellness session', 'Share wellness tip', 'Complete activity log']
    },
    {
      id: 'innovation-challenge',
      title: 'Innovation Challenge',
      description: 'Submit innovative ideas that could improve our products, processes, or customer experience.',
      points: 150,
      icon: '💡',
      category: 'Innovation',
      participantCount: 7,
      participants: [
        { name: 'Chris Lee' },
        { name: 'Nina Patel' }
      ],
      additionalCount: 5,
      timeframe: 'This month',
      status: 'active',
      claimLimit: '3 per quarter',
      expiresIn: '12 days',
      requirements: ['Submit detailed proposal', 'Include implementation plan', 'Present to innovation committee']
    },
    {
      id: 'volunteer-hours',
      title: 'Community Volunteer',
      description: 'Volunteer in community service activities and make a positive impact in our local area.',
      points: 75,
      icon: '🤝',
      category: 'Community',
      participantCount: 12,
      participants: [
        { name: 'Jennifer Wu' },
        { name: 'Mark Johnson' },
        { name: 'Sophie Turner' }
      ],
      additionalCount: 9,
      timeframe: 'This month',
      status: 'active',
      claimLimit: '2 per month',
      requirements: ['Volunteer for 4+ hours', 'Provide verification', 'Share experience story']
    }
  ])

  const categories = ['all', 'Marketing', 'Training', 'Sales', 'Wellness', 'Innovation', 'Community']

  const filteredIncentives = incentives.filter(incentive => {
    const matchesCategory = selectedCategory === 'all' || incentive.category === selectedCategory
    const matchesSearch = incentive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incentive.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <StarIcon className="w-4 h-4" />
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4" />
      case 'pending':
        return <ClockIcon className="w-4 h-4" />
      default:
        return <InformationCircleIcon className="w-4 h-4" />
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <GiftIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-bold text-primary-900">
                        Available Incentives
                      </Dialog.Title>
                      <p className="text-sm text-primary-600">
                        Explore and claim incentives to earn points
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Filters */}
                <div className="p-6 border-b border-primary-200 bg-primary-50">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search incentives..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? 'bg-brand-500 text-white'
                              : 'bg-white text-primary-600 hover:bg-primary-100 border border-primary-200'
                          }`}
                        >
                          {category === 'all' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredIncentives.map((incentive) => (
                      <div key={incentive.id} className="bg-white border border-primary-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200 hover:scale-105">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                              {incentive.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary-900 text-lg">{incentive.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incentive.status)}`}>
                                  {getStatusIcon(incentive.status)}
                                  <span className="ml-1 capitalize">{incentive.status}</span>
                                </span>
                                <span className="text-xs text-primary-500">{incentive.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                              +{incentive.points} pts
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-primary-700 text-sm mb-4 leading-relaxed">
                          {incentive.description}
                        </p>

                        {/* Requirements */}
                        {incentive.requirements && (
                          <div className="mb-4">
                            <h5 className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">Requirements</h5>
                            <ul className="space-y-1">
                              {incentive.requirements.map((req, idx) => (
                                <li key={idx} className="text-xs text-primary-600 flex items-start space-x-2">
                                  <span className="text-brand-500 mt-1">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex items-center justify-between text-xs text-primary-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <UserGroupIcon className="w-4 h-4" />
                              <span>{incentive.participantCount} claimed</span>
                            </span>
                            {incentive.expiresIn && (
                              <span className="flex items-center space-x-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>Expires in {incentive.expiresIn}</span>
                              </span>
                            )}
                          </div>
                          <span className="text-primary-400">{incentive.claimLimit}</span>
                        </div>

                        {/* Participants */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              {incentive.participants.slice(0, 3).map((participant, idx) => (
                                <ColorfulAvatar
                                  key={idx}
                                  name={participant.name}
                                  size="sm"
                                  className="border-2 border-white hover:scale-110 transition-transform cursor-pointer"
                                />
                              ))}
                              {incentive.additionalCount && incentive.additionalCount > 0 && (
                                <div className="w-8 h-8 bg-primary-200 rounded-full border-2 border-white flex items-center justify-center">
                                  <span className="text-xs font-medium text-primary-600">
                                    +{incentive.additionalCount}
                                  </span>
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-primary-500">
                              {incentive.timeframe}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => onClaimIncentive(incentive.id)}
                            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                          >
                            Claim
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredIncentives.length === 0 && (
                    <div className="text-center py-12">
                      <GiftIcon className="w-12 h-12 text-primary-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-primary-900 mb-2">No incentives found</h3>
                      <p className="text-primary-500">
                        {searchQuery || selectedCategory !== 'all' 
                          ? 'Try adjusting your search or filters'
                          : 'Check back later for new incentives'
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-primary-200 bg-primary-50">
                  <p className="text-sm text-primary-600">
                    Showing {filteredIncentives.length} of {incentives.length} incentives
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-white hover:bg-primary-50 text-primary-900 font-medium px-6 py-2 rounded-xl transition-all duration-200 border border-primary-200 hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
