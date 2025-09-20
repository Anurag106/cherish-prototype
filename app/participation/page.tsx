'use client'

import React, { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  InformationCircleIcon,
  TrophyIcon,
  ChartPieIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ArrowDownIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  HashtagIcon
} from '@heroicons/react/24/outline'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'

export default function ParticipationPage() {
  const [measuredBy, setMeasuredBy] = useState('Giving Or Receiving')
  const [segmentedBy, setSegmentedBy] = useState('Overall')
  const [timeRange, setTimeRange] = useState('12 Months')

  // Analytics menu items
  const analyticsMenuItems = [
    { id: 'team-dashboard', name: 'Team dashboard', icon: ChartBarIcon },
    { id: 'leaderboard', name: 'Leaderboard', icon: TrophyIcon },
    { id: 'participation', name: 'Participation', icon: UserGroupIcon },
    { id: 'recognition', name: 'Recognition', icon: StarIcon },
    { id: 'organization-graph', name: 'Organization graph', icon: ChartPieIcon },
    { id: 'top-words', name: 'Top words', icon: HashtagIcon }
  ]

  const handleAnalyticsNavigation = (analyticsType: string) => {
    console.log('Navigating to analytics:', analyticsType)
    if (analyticsType === 'organization-graph') {
      window.location.href = '/recognition-analytics/organization-graph'
    } else if (analyticsType === 'recognition') {
      window.location.href = '/recognition-analytics'
    } else if (analyticsType === 'top-words') {
      window.location.href = '/top-words'
    } else if (analyticsType === 'participation') {
      // Already on this page, do nothing
      return
    }
    // For other analytics types, navigate to the analytics page
    window.location.href = '/recognition-analytics'
  }

  // Sample data for the participation chart based on the screenshot
  const participationData = [
    { date: '2 Sep \'24', value: 58 },
    { date: '13 Oct \'24', value: 50 },
    { date: '03 Nov \'24', value: 78 },
    { date: '24 Nov \'24', value: 85 },
    { date: '15 Dec \'24', value: 62 },
    { date: '05 Jan \'25', value: 30 },
    { date: '26 Jan \'25', value: 55 },
    { date: '16 Feb \'25', value: 82 },
    { date: '09 Mar \'25', value: 45 },
    { date: '30 Mar \'25', value: 75 },
    { date: '20 Apr \'25', value: 48 },
    { date: '11 May \'25', value: 82 },
    { date: '01 Jun \'25', value: 45 },
    { date: '22 Jun \'25', value: 72 },
    { date: '13 Jul \'25', value: 52 },
    { date: '03 Aug \'25', value: 80 },
    { date: '24 Aug \'25', value: 45 }
  ]

  const measuredByOptions = ['Giving Or Receiving', 'Giving', 'Receiving']
  const segmentedByOptions = [
    'Overall',
    'Currency_Code', 
    'Department',
    'Group',
    'Location',
    'Manager\'s Team',
    'Role',
    'Tier',
    'Title'
  ]
  const timeRangeOptions = ['6 Months', '12 Months', '2 Years', 'Year To Date']

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-cherish-gray-200">
          <p className="font-semibold text-cherish-dark mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.value}%`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center shadow-lg">
                  <TrophyIcon className="w-6 h-6 text-cherish-dark" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-cherish-dark">Cherish</h1>
                  <p className="text-xs text-cherish-gray-600">Recognition Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-cherish-gray-600 hover:text-cherish-dark font-medium transition-colors duration-200"
              >
                Home
              </button>
              <span className="text-cherish-gray-600 font-medium">Rewards</span>
              <span className="text-cherish-gray-600 font-medium">Incentives</span>
              
              {/* Analytics Dropdown */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center space-x-1 text-cherish-dark hover:text-cherish-yellow-mono transition-colors cursor-pointer font-medium">
                    <span>Analytics</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-cherish-gray-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-cherish-gray-200 z-50">
                    <div className="py-2">
                      {analyticsMenuItems.map((item) => (
                        <Menu.Item key={item.id}>
                          {({ active }) => (
                            <button
                              onClick={() => handleAnalyticsNavigation(item.id)}
                              className={`${
                                item.id === 'participation' 
                                  ? 'bg-cherish-yellow text-cherish-dark' 
                                  : active 
                                    ? 'bg-cherish-yellow-light text-cherish-dark' 
                                    : 'text-cherish-gray-700'
                              } group flex w-full items-center px-4 py-3 text-sm font-medium transition-colors`}
                            >
                              <item.icon className="mr-3 h-5 w-5" />
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl hover:bg-cherish-gray-100 transition-colors duration-200">
                <MagnifyingGlassIcon className="h-5 w-5 text-cherish-gray-600" />
              </button>
              
              <button className="p-2 rounded-xl hover:bg-cherish-gray-100 transition-colors duration-200 relative">
                <BellIcon className="h-5 w-5 text-cherish-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cherish-red rounded-full"></div>
              </button>
              
              <div className="w-8 h-8 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
                <span className="text-sm font-bold text-cherish-dark">BC</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cherish-dark mb-2">Participation Analytics</h1>
        </div>

        {/* Filter Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 mb-8 relative z-30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              {/* Measured by */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-cherish-gray-600 font-medium">Measured by</span>
                <Menu as="div" className="relative z-40">
                  <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
                    <span>{measuredBy}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Menu.Button>
                  <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2">
                    {measuredByOptions.map((option) => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <button
                            onClick={() => setMeasuredBy(option)}
                            className={`${
                              active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                            } block px-4 py-2 text-sm w-full text-left transition-colors duration-200 hover:bg-cherish-yellow-light`}
                          >
                            {option}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>

              {/* Segmented by */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-cherish-gray-600 font-medium">Segmented by</span>
                <Menu as="div" className="relative z-40">
                  <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
                    <span>{segmentedBy}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Menu.Button>
                  <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2 max-h-60 overflow-y-auto">
                    {segmentedByOptions.map((option) => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <button
                            onClick={() => setSegmentedBy(option)}
                            className={`${
                              active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                            } block px-4 py-2 text-sm w-full text-left transition-colors duration-200 hover:bg-cherish-yellow-light`}
                          >
                            {option}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            
            {/* Time Range */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-cherish-gray-600 font-medium">Time Range</span>
              <Menu as="div" className="relative z-40">
                <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
                  <span>{timeRange}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2">
                  {timeRangeOptions.map((option) => (
                    <Menu.Item key={option}>
                      {({ active }) => (
                        <button
                          onClick={() => setTimeRange(option)}
                          className={`${
                            active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                          } block px-4 py-2 text-sm w-full text-left transition-colors duration-200 hover:bg-cherish-yellow-light`}
                        >
                          {option}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-cherish-dark">% of Users Giving Or Receiving Recognition</h2>
              <div className="group relative">
                <InformationCircleIcon className="h-5 w-5 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
                  Percentage of users who gave or received recognition during the selected time period
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-cherish-gray-100 p-1 rounded-2xl">
                <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-cherish-dark shadow-soft">
                  by Week
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-medium text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50">
                  by Month
                </button>
              </div>
              <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium flex items-center">
                Export <ArrowDownIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Company Overall Legend */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-cherish-gray-600 font-medium">Company Overall</span>
          </div>

          {/* Chart */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12} 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  fontSize={12} 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6b7280"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#6b7280', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 6, fill: '#6b7280' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
