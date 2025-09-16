'use client'

import { useState } from 'react'
import { 
  ChevronLeftIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface ViewProfilePageProps {
  onBack: () => void;
}

export default function ViewProfilePage({ onBack }: ViewProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('30 days')

  const topHashtags = [
    { tag: '#work-hard-live-well', count: 36 },
    { tag: '#its-us-vs-the-problem', count: 27 },
    { tag: '#be-so-good-they-can-not-ignore-you', count: 24 },
    { tag: '#consciously-evolve', count: 23 },
    { tag: '#ownership', count: 20 },
    { tag: '#debate-decide-commit', count: 18 },
    { tag: '#bias-for-action', count: 17 },
    { tag: '#impact-over-effort', count: 16 },
    { tag: '#no-pain-no-gain', count: 13 },
    { tag: '#1-percent-better-every-day', count: 11 }
  ]

  const interactions = [
    { name: 'Alex Klein', initials: 'AK', color: 'bg-cherish-red', given: 31, received: 3 },
    { name: 'Chinmay Wani', initials: 'CW', color: 'bg-cherish-yellow', given: 7, received: 5 },
    { name: 'Ganesh Ambre', initials: 'GA', color: 'bg-cherish-yellow', given: 6, received: 5 },
    { name: 'Gromico Ferrao', initials: 'GF', color: 'bg-cherish-green', given: 14, received: 6 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-yellow-light"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 mb-8 border border-cherish-gray-100">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cherish-purple to-cherish-purple-light rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              BC
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-cherish-dark mb-2">Biplob Chakraborty</h1>
              <p className="text-cherish-gray-600 mb-4">@biplob.chakraborty</p>
              <div className="flex items-center space-x-6 text-sm text-cherish-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>Pune</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BuildingOfficeIcon className="w-4 h-4" />
                  <span>Member of Alex Klein&apos;s team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Mb Product Dept</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg mb-8 border border-cherish-gray-100">
          <div className="flex border-b border-cherish-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-4 font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'text-cherish-dark border-b-2 border-cherish-yellow-mono bg-cherish-yellow-light/30'
                  : 'text-cherish-gray-600 hover:text-cherish-dark'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-8 py-4 font-semibold transition-all ${
                activeTab === 'activity'
                  ? 'text-cherish-dark border-b-2 border-cherish-yellow-mono bg-cherish-yellow-light/30'
                  : 'text-cherish-gray-600 hover:text-cherish-dark'
              }`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                {/* Period Selector */}
                <div className="flex justify-end mb-8">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-white border border-cherish-gray-300 rounded-xl px-4 py-2 text-sm font-medium text-cherish-dark focus:outline-none focus:ring-2 focus:ring-cherish-yellow"
                  >
                    <option value="30 days">30 days</option>
                    <option value="90 days">90 days</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-cherish-green to-cherish-green-light rounded-3xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Recognition Received</h3>
                    <div className="text-4xl font-bold mb-2">4</div>
                    <p className="text-sm opacity-90">This is roughly average 👍</p>
                  </div>

                  <div className="bg-gradient-to-br from-cherish-purple to-cherish-purple-light rounded-3xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Recognition Given</h3>
                    <div className="text-4xl font-bold mb-2">0</div>
                    <p className="text-sm opacity-90">This is roughly average 👍</p>
                    <p className="text-xs opacity-75 mt-1">Relative to all Playlist users</p>
                  </div>

                  <div className="bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-3xl p-6 text-cherish-dark">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                    <div className="text-4xl font-bold mb-2">0</div>
                    <p className="text-sm opacity-90">This is roughly average 👍</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                {/* Activity Tabs */}
                <div className="flex space-x-1 mb-8 bg-cherish-gray-100 rounded-2xl p-1">
                  <button className="px-6 py-2 bg-cherish-dark text-white rounded-xl font-medium text-sm">
                    Received
                  </button>
                  <button className="px-6 py-2 text-cherish-gray-600 hover:text-cherish-dark rounded-xl font-medium text-sm">
                    Given
                  </button>
                  <button className="px-6 py-2 text-cherish-gray-600 hover:text-cherish-dark rounded-xl font-medium text-sm">
                    Achievements
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-cherish-yellow-light rounded-2xl p-6 mb-8 border border-cherish-yellow/30">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cherish-dark rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      BC
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-cherish-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                          +15
                        </div>
                        <span className="text-cherish-gray-500 text-sm">4d ago</span>
                      </div>
                      <p className="text-cherish-dark font-medium mb-2">
                        <strong>Alex Klein:</strong> (+15) @biplob.chakraborty love to see the stakeholder management with the Zeezor widget - thank you for being on top of those customers! #consciously-evolve
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-cherish-gray-600">
                        <button className="flex items-center space-x-1 hover:text-cherish-red transition-colors">
                          <span>♥</span>
                          <span>Add On</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-cherish-blue transition-colors">
                          <span>💬</span>
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-cherish-green transition-colors">
                          <span>👍</span>
                          <span>React</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="bg-cherish-gray-50 rounded-2xl p-4 mb-8">
                  <p className="text-cherish-gray-600 text-center">Comment to Biplob</p>
                </div>

                {/* Team Recognition */}
                <div className="bg-cherish-yellow-light rounded-2xl p-6 border border-cherish-yellow/30">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-cherish-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                      +9
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Team member avatars */}
                      <div className="w-8 h-8 bg-cherish-red rounded-xl flex items-center justify-center text-white font-bold text-xs">
                        AS
                      </div>
                      <div className="w-8 h-8 bg-cherish-green rounded-xl flex items-center justify-center text-white font-bold text-xs">
                        GS
                      </div>
                      <div className="w-8 h-8 bg-cherish-yellow rounded-xl flex items-center justify-center text-cherish-dark font-bold text-xs">
                        GA
                      </div>
                      <div className="w-8 h-8 bg-cherish-green rounded-xl flex items-center justify-center text-white font-bold text-xs">
                        GF
                      </div>
                      <div className="w-8 h-8 bg-cherish-orange rounded-xl flex items-center justify-center text-white font-bold text-xs">
                        PP
                      </div>
                      <div className="w-8 h-8 bg-cherish-yellow rounded-xl flex items-center justify-center text-cherish-dark font-bold text-xs">
                        SJ
                      </div>
                      <div className="w-8 h-8 bg-cherish-purple rounded-xl flex items-center justify-center text-white font-bold text-xs">
                        YG
                      </div>
                      <div className="w-8 h-8 bg-cherish-purple rounded-xl flex items-center justify-center text-white font-bold text-xs">
                        SJ
                      </div>
                    </div>
                    <span className="text-cherish-gray-500 text-sm">15d ago</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-cherish-purple rounded-xl flex items-center justify-center text-white font-bold text-xs">
                      BC
                    </div>
                    <div className="w-8 h-8 bg-cherish-red rounded-xl flex items-center justify-center text-white font-bold text-xs">
                      RY
                    </div>
                    <div className="w-8 h-8 bg-cherish-yellow rounded-xl flex items-center justify-center text-cherish-dark font-bold text-xs">
                      AK
                    </div>
                  </div>
                </div>

                {/* Top Hashtags Received */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-cherish-dark mb-6">Top Hashtags Received</h3>
                  <div className="space-y-3">
                    {topHashtags.map((hashtag, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-cherish-gray-200 hover:border-cherish-yellow/50 transition-colors">
                        <span className="text-cherish-yellow-mono font-medium">{hashtag.tag}</span>
                        <span className="text-cherish-gray-600 font-semibold">{hashtag.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactions Section - Only show in overview */}
        {activeTab === 'overview' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-cherish-gray-100">
            <h3 className="text-xl font-bold text-cherish-dark mb-6">Biplob&apos;s interactions</h3>
            
            {/* Network Visualization */}
            <div className="flex items-center justify-center mb-8 relative h-64">
              <div className="absolute">
                <div className="w-16 h-16 bg-gradient-to-br from-cherish-purple to-cherish-purple-light rounded-3xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  BC
                </div>
              </div>
              
              {/* Connection lines and nodes */}
              <div className="absolute top-4 left-12">
                <div className="w-12 h-12 bg-cherish-red rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  AK
                </div>
              </div>
              <div className="absolute top-4 right-12">
                <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center text-cherish-dark font-bold text-sm shadow-lg">
                  GA
                </div>
              </div>
              <div className="absolute bottom-4 left-20">
                <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center text-cherish-dark font-bold text-sm shadow-lg">
                  SJ
                </div>
              </div>
              <div className="absolute bottom-4 right-20">
                <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center text-cherish-dark font-bold text-sm shadow-lg">
                  CW
                </div>
              </div>
              <div className="absolute bottom-8 right-8">
                <div className="w-12 h-12 bg-cherish-green rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  GF
                </div>
              </div>
            </div>

            {/* Interactions Table */}
            <div className="overflow-hidden rounded-2xl border border-cherish-gray-200">
              <table className="w-full">
                <thead className="bg-cherish-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-cherish-gray-700">Name</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-cherish-gray-700">Given to Biplob</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-cherish-gray-700">Received from Biplob</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cherish-gray-200">
                  {interactions.map((interaction, index) => (
                    <tr key={index} className="hover:bg-cherish-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${interaction.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                            {interaction.initials}
                          </div>
                          <span className="font-medium text-cherish-dark">{interaction.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-cherish-dark">{interaction.given}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-cherish-dark">{interaction.received}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
