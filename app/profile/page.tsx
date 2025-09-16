'use client'

import React, { useState } from 'react'
import { 
  MapPinIcon, 
  UsersIcon, 
  BuildingOfficeIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeFilter, setTimeFilter] = useState('30 days')

  const profileData = {
    name: 'Biplob Chakraborty',
    username: '@biplob.chakraborty',
    location: 'Pune',
    team: "Member of Alex Klein's team",
    department: 'Mb Product Dept',
    avatar: 'BC'
  }

  const stats = {
    recognitionReceived: { value: 141, comparison: '84 more than average', trend: 'up' },
    recognitionGiven: { value: 45, comparison: '8 more than average', trend: 'up' },
    achievements: { value: 2, comparison: 'This is roughly average', trend: 'neutral' }
  }

  const interactions = [
    { name: 'Alex Klein', initials: 'AK', givenTo: 31, receivedFrom: 3, color: 'bg-cherish-red' },
    { name: 'Chinmay Wani', initials: 'CW', givenTo: 7, receivedFrom: 5, color: 'bg-cherish-yellow' },
    { name: 'Ganesh Ambre', initials: 'GA', givenTo: 6, receivedFrom: 5, color: 'bg-cherish-yellow' },
    { name: 'Gromico Ferrao', initials: 'GF', givenTo: 14, receivedFrom: 6, color: 'bg-cherish-green' }
  ]

  const topHashtags = [
    { tag: '#work-hard-live-well', count: 36 },
    { tag: '#its-us-vs-the-problem', count: 27 },
    { tag: '#be-so-good-they-can-n...', count: 24 },
    { tag: '#consciously-evolve', count: 23 },
    { tag: '#ownership', count: 20 },
    { tag: '#debate-decide-commit', count: 18 },
    { tag: '#bias-for-action', count: 17 },
    { tag: '#impact-over-effort', count: 16 },
    { tag: '#no-pain-no-gain', count: 13 },
    { tag: '#1-percent-better-every-...', count: 11 }
  ]

  const activityStats = {
    overview: {
      recognitionReceived: 4,
      recognitionGiven: 0,
      achievements: 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 ml-64">
          {/* Profile Header */}
          <div className="bg-white border-b border-cherish-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-3xl flex items-center justify-center text-cherish-dark font-bold text-2xl shadow-lg">
                  {profileData.avatar}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-cherish-dark">{profileData.name}</h1>
                  <p className="text-cherish-gray-600 text-lg">{profileData.username}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-cherish-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="w-4 h-4" />
                      <span>{profileData.team}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BuildingOfficeIcon className="w-4 h-4" />
                      <span>{profileData.department}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="form-input text-sm"
                >
                  <option value="7 days">Last 7 days</option>
                  <option value="30 days">Last 30 days</option>
                  <option value="90 days">Last 90 days</option>
                  <option value="1 year">Last year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-b border-cherish-gray-200 px-8">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-semibold text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-cherish-dark text-cherish-dark'
                      : 'border-transparent text-cherish-gray-500 hover:text-cherish-gray-700 hover:border-cherish-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-3xl p-6 shadow-soft border border-cherish-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Recognition received</h3>
                      <div className="w-8 h-8 bg-cherish-green-light rounded-2xl flex items-center justify-center">
                        <span className="text-cherish-green text-sm">↗</span>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-cherish-dark mb-2">{stats.recognitionReceived.value}</div>
                    <p className="text-sm text-cherish-gray-600">{stats.recognitionReceived.comparison}</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-soft border border-cherish-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Recognition given</h3>
                      <div className="w-8 h-8 bg-cherish-green-light rounded-2xl flex items-center justify-center">
                        <span className="text-cherish-green text-sm">↗</span>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-cherish-dark mb-2">{stats.recognitionGiven.value}</div>
                    <p className="text-sm text-cherish-gray-600">{stats.recognitionGiven.comparison}</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-soft border border-cherish-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Achievements</h3>
                      <div className="w-8 h-8 bg-cherish-gray-200 rounded-2xl flex items-center justify-center">
                        <span className="text-cherish-gray-500 text-sm">→</span>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-cherish-dark mb-2">{stats.achievements.value}</div>
                    <p className="text-sm text-cherish-gray-600">{stats.achievements.comparison}</p>
                  </div>
                </div>

                {/* Interactions and Hashtags */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Interactions */}
                  <div className="bg-white rounded-3xl p-6 shadow-soft border border-cherish-gray-100">
                    <h3 className="text-lg font-semibold text-cherish-dark mb-6">Top interactions</h3>
                    <div className="space-y-4">
                      {interactions.map((person, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${person.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm`}>
                              {person.initials}
                            </div>
                            <span className="font-medium text-cherish-dark">{person.name}</span>
                          </div>
                          <div className="text-sm text-cherish-gray-600">
                            <span className="font-semibold">{person.givenTo}</span> given, <span className="font-semibold">{person.receivedFrom}</span> received
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Hashtags */}
                  <div className="bg-white rounded-3xl p-6 shadow-soft border border-cherish-gray-100">
                    <h3 className="text-lg font-semibold text-cherish-dark mb-6">Top hashtags</h3>
                    <div className="space-y-3">
                      {topHashtags.map((hashtag, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-cherish-purple font-medium">{hashtag.tag}</span>
                          <span className="text-sm font-semibold text-cherish-gray-600">{hashtag.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-8">
                {/* Activity Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-cherish-green to-cherish-green-light rounded-3xl p-6 text-white">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Recognition Received</h3>
                    <div className="text-4xl font-bold mb-2">{activityStats.overview.recognitionReceived}</div>
                    <p className="text-sm opacity-90">This is roughly average 👍</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Recognition Given</h3>
                    <div className="text-4xl font-bold mb-2">{activityStats.overview.recognitionGiven}</div>
                    <p className="text-sm opacity-90">Time to spread some love! 💝</p>
                  </div>

                  <div className="bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-3xl p-6 text-cherish-dark">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-4">
                      <span className="text-2xl">🌟</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                    <div className="text-4xl font-bold mb-2">{activityStats.overview.achievements}</div>
                    <p className="text-sm opacity-90">Keep up the great work! 🚀</p>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-3xl shadow-soft border border-cherish-gray-100">
                  <div className="border-b border-cherish-gray-200 px-6 py-4">
                    <nav className="flex space-x-6">
                      <button className="text-cherish-dark font-semibold border-b-2 border-cherish-dark pb-2">
                        All activity
                      </button>
                      <button className="text-cherish-gray-500 hover:text-cherish-gray-700 pb-2">
                        Recognition received
                      </button>
                      <button className="text-cherish-gray-500 hover:text-cherish-gray-700 pb-2">
                        Recognition given
                      </button>
                    </nav>
                  </div>

                  {/* Sample Activity Item */}
                  <div className="space-y-6 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-cherish-dark rounded-full flex items-center justify-center text-white font-bold text-xs">
                          +15
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center text-cherish-dark font-bold text-sm">
                          BC
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="font-semibold text-cherish-dark">Alex Klein: </span>
                          <span className="text-cherish-gray-700">(+15) </span>
                          <span className="font-semibold text-cherish-dark">@biplob.chakraborty </span>
                          <span className="text-cherish-gray-700">love to see the stakeholder management with the Zeezor widget - thank you for being on top of those customers! </span>
                          <span className="text-cherish-purple">#consciously-evolve</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-cherish-gray-500">
                          <button className="flex items-center space-x-1 hover:text-cherish-gray-700">
                            <span>❤️</span>
                            <span>Add On</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-cherish-gray-700">
                            <span>💬</span>
                            <span>Comment</span>
                          </button>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-cherish-yellow rounded-full flex items-center justify-center text-cherish-dark font-bold text-xs">
                              AK
                            </div>
                          </div>
                          <span className="text-xs text-cherish-gray-500 ml-2">15d ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
