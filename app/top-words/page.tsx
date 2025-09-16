'use client'

import React, { useState, Fragment, useEffect, useRef } from 'react'
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
  HashtagIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface FilterOption {
  id: string
  name: string
  category: string
}

interface WordCloudData {
  word: string
  count: number
  size: number
  color: string
  x: number
  y: number
}

export default function TopWordsPage() {
  const router = useRouter()
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    overall: ['overall'],
    location: [],
    currency_code: [],
    group: [],
    role: [],
    managers_team: [],
    tier: [],
    title: []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveFilterCategory(null)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
      router.push('/recognition-analytics/organization-graph')
    } else if (analyticsType === 'recognition') {
      router.push('/recognition-analytics')
    } else if (analyticsType === 'top-words') {
      // Already on this page, do nothing
      return
    }
    // For other analytics types, navigate to the analytics page
    router.push('/recognition-analytics')
  }

  // Filter options data
  const filterOptions: {[key: string]: FilterOption[]} = {
    overall: [
      { id: 'overall', name: 'Overall', category: 'overall' }
    ],
    location: [
      { id: 'san-luis-obispo', name: 'San Luis Obispo', category: 'location' },
      { id: 'london', name: 'London', category: 'location' },
      { id: 'missoula', name: 'Missoula', category: 'location' },
      { id: 'sydney', name: 'Sydney', category: 'location' },
      { id: 'new-york', name: 'New York', category: 'location' },
      { id: 'singapore', name: 'Singapore', category: 'location' },
      { id: 'lansdale', name: 'Lansdale', category: 'location' },
      { id: 'amsterdam', name: 'Amsterdam', category: 'location' },
      { id: 'pune', name: 'Pune', category: 'location' },
      { id: 'atlanta', name: 'Atlanta', category: 'location' },
      { id: 'scottsdale', name: 'Scottsdale', category: 'location' }
    ],
    currency_code: [
      { id: 'usd', name: 'USD', category: 'currency_code' },
      { id: 'eur', name: 'EUR', category: 'currency_code' },
      { id: 'gbp', name: 'GBP', category: 'currency_code' },
      { id: 'aud', name: 'AUD', category: 'currency_code' },
      { id: 'sgd', name: 'SGD', category: 'currency_code' },
      { id: 'inr', name: 'INR', category: 'currency_code' }
    ],
    group: [
      { id: 'engineering', name: 'Engineering', category: 'group' },
      { id: 'sales', name: 'Sales', category: 'group' },
      { id: 'marketing', name: 'Marketing', category: 'group' },
      { id: 'customer-success', name: 'Customer Success', category: 'group' },
      { id: 'hr', name: 'Human Resources', category: 'group' },
      { id: 'finance', name: 'Finance', category: 'group' }
    ],
    role: [
      { id: 'manager', name: 'Manager', category: 'role' },
      { id: 'senior-engineer', name: 'Senior Engineer', category: 'role' },
      { id: 'engineer', name: 'Engineer', category: 'role' },
      { id: 'director', name: 'Director', category: 'role' },
      { id: 'vp', name: 'Vice President', category: 'role' },
      { id: 'analyst', name: 'Analyst', category: 'role' }
    ],
    managers_team: [
      { id: 'adam-harrington', name: "Adam Harrington's Team", category: 'managers_team' },
      { id: 'sarah-johnson', name: "Sarah Johnson's Team", category: 'managers_team' },
      { id: 'mike-chen', name: "Mike Chen's Team", category: 'managers_team' },
      { id: 'lisa-rodriguez', name: "Lisa Rodriguez's Team", category: 'managers_team' }
    ],
    tier: [
      { id: 'b4-lead', name: 'b4 lead', category: 'tier' },
      { id: 'm5-senior-director', name: 'm5 senior director', category: 'tier' },
      { id: 'm4-director', name: 'm4 director', category: 'tier' },
      { id: 'b5-architectprinc', name: 'b5 architectprinc', category: 'tier' },
      { id: 'm2-manager', name: 'm2 manager', category: 'tier' },
      { id: 'b2-staff', name: 'b2 staff', category: 'tier' },
      { id: 'vp', name: 'vp', category: 'tier' },
      { id: 'c-suite', name: 'c-suite', category: 'tier' },
      { id: 'm3-senior-manager', name: 'm3 senior manager', category: 'tier' },
      { id: 'b3-senior', name: 'b3 senior', category: 'tier' },
      { id: 'svp', name: 'svp', category: 'tier' }
    ],
    title: [
      { id: 'software-engineer', name: 'Software Engineer', category: 'title' },
      { id: 'product-manager', name: 'Product Manager', category: 'title' },
      { id: 'sales-rep', name: 'Sales Representative', category: 'title' },
      { id: 'designer', name: 'Designer', category: 'title' },
      { id: 'data-analyst', name: 'Data Analyst', category: 'title' }
    ]
  }

  // Sample word cloud data based on the screenshot
  const wordCloudData: WordCloudData[] = [
    { word: 'congratulations', count: 1250, size: 48, color: '#e84393', x: 35, y: 40 },
    { word: 'year', count: 1100, size: 42, color: '#f39c12', x: 65, y: 25 },
    { word: 'support', count: 950, size: 38, color: '#00b894', x: 15, y: 65 },
    { word: 'lucky', count: 900, size: 36, color: '#6c5ce7', x: 45, y: 70 },
    { word: 'congrats', count: 850, size: 34, color: '#a29bfe', x: 75, y: 50 },
    { word: 'amazing', count: 800, size: 32, color: '#fd79a8', x: 25, y: 30 },
    { word: 'work', count: 750, size: 30, color: '#fdcb6e', x: 55, y: 15 },
    { word: 'team', count: 700, size: 28, color: '#00cec9', x: 85, y: 35 },
    { word: 'great', count: 650, size: 26, color: '#74b9ff', x: 10, y: 45 },
    { word: 'thanks', count: 600, size: 24, color: '#55a3ff', x: 70, y: 75 },
    { word: 'awesome', count: 550, size: 22, color: '#ff7675', x: 40, y: 55 },
    { word: 'fantastic', count: 500, size: 20, color: '#fd79a8', x: 20, y: 80 },
    { word: 'excellent', count: 450, size: 18, color: '#fdcb6e', x: 80, y: 20 },
    { word: 'outstanding', count: 400, size: 16, color: '#00b894', x: 60, y: 85 },
    { word: 'incredible', count: 350, size: 14, color: '#6c5ce7', x: 30, y: 10 },
    { word: 'wonderful', count: 300, size: 12, color: '#e17055', x: 90, y: 60 },
    { word: 'brilliant', count: 250, size: 10, color: '#00cec9', x: 5, y: 25 },
    { word: 'superb', count: 200, size: 8, color: '#74b9ff', x: 95, y: 45 }
  ]

  const filterCategories = [
    { key: 'overall', label: 'Overall' },
    { key: 'location', label: 'Location' },
    { key: 'currency_code', label: 'Currency Code' },
    { key: 'group', label: 'Group' },
    { key: 'role', label: 'Role' },
    { key: 'managers_team', label: "Manager's Team" },
    { key: 'tier', label: 'Tier' },
    { key: 'title', label: 'Title' }
  ]

  const handleFilterSelect = (category: string, optionId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev }
      if (category === 'overall') {
        // Overall is exclusive
        newFilters[category] = [optionId]
      } else {
        // Other categories can have multiple selections
        if (newFilters[category].includes(optionId)) {
          newFilters[category] = newFilters[category].filter(id => id !== optionId)
        } else {
          newFilters[category] = [...newFilters[category], optionId]
        }
      }
      return newFilters
    })
  }

  const removeFilter = (category: string, optionId: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(id => id !== optionId)
    }))
  }

  const getSelectedFilterName = (category: string, optionId: string) => {
    const option = filterOptions[category]?.find(opt => opt.id === optionId)
    return option?.name || optionId
  }

  const filteredOptions = (category: string) => {
    if (!searchTerm) return filterOptions[category] || []
    return (filterOptions[category] || []).filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-[9999] shadow-sm">
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
                  <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-cherish-gray-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-cherish-gray-200 z-[9999]">
                    <div className="py-2">
                      {analyticsMenuItems.map((item) => (
                        <Menu.Item key={item.id}>
                          {({ active }) => (
                            <button
                              onClick={() => handleAnalyticsNavigation(item.id)}
                              className={`${
                                item.id === 'top-words' 
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
          <h1 className="text-3xl font-bold text-cherish-dark mb-2">Top Words Analytics</h1>
          <p className="text-cherish-gray-600">Discover the most frequently used words in recognition messages across your organization</p>
        </div>

        {/* Filter Controls */}
        <div ref={filterRef} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 mb-8 relative z-40">
          <div className="flex flex-wrap gap-4 mb-6">
            {filterCategories.map((category) => (
              <Menu as="div" key={category.key} className="relative z-50">
                <Menu.Button 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-medium border transition-all duration-300 ${
                    selectedFilters[category.key].length > 0
                      ? 'bg-cherish-yellow text-cherish-dark border-cherish-yellow-mono shadow-soft'
                      : 'bg-white text-cherish-gray-700 border-cherish-gray-200 hover:bg-cherish-yellow-light hover:border-cherish-yellow-mono'
                  }`}
                  onClick={() => setActiveFilterCategory(activeFilterCategory === category.key ? null : category.key)}
                >
                  <span>{category.label}</span>
                  {selectedFilters[category.key].length > 0 && (
                    <span className="bg-cherish-dark text-white text-xs px-2 py-0.5 rounded-full">
                      {selectedFilters[category.key].length}
                    </span>
                  )}
                  <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>

                <Transition
                  show={activeFilterCategory === category.key}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-[100] max-h-80 overflow-hidden" style={{ minWidth: '288px' }}>
                    {/* Search within dropdown */}
                    <div className="p-3 border-b border-cherish-gray-200">
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cherish-gray-400" />
                        <input
                          type="text"
                          placeholder={`Search ${category.label.toLowerCase()}...`}
                          className="w-full pl-10 pr-4 py-2 border border-cherish-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cherish-yellow focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Options */}
                    <div className="max-h-60 overflow-y-auto py-2">
                      {filteredOptions(category.key).map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleFilterSelect(category.key, option.id)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center justify-between ${
                            selectedFilters[category.key].includes(option.id)
                              ? 'bg-cherish-yellow-light text-cherish-dark'
                              : 'text-cherish-gray-700 hover:bg-cherish-yellow-light'
                          }`}
                        >
                          <span>{option.name}</span>
                          {selectedFilters[category.key].includes(option.id) && (
                            <div className="w-2 h-2 bg-cherish-yellow-mono rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </Transition>
              </Menu>
            ))}
          </div>

          {/* Selected Filters Display */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, options]) =>
              options.map((optionId) => (
                <div
                  key={`${category}-${optionId}`}
                  className="flex items-center space-x-2 bg-cherish-yellow/20 border border-cherish-yellow-mono/30 rounded-xl px-3 py-1.5 text-sm"
                >
                  <span className="text-cherish-dark font-medium">
                    {getSelectedFilterName(category, optionId)}
                  </span>
                  <button
                    onClick={() => removeFilter(category, optionId)}
                    className="text-cherish-gray-500 hover:text-cherish-dark transition-colors"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Word Cloud Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-cherish-dark mb-2">Word Cloud</h2>
              <p className="text-cherish-gray-600">Most frequently used words in recognition messages</p>
            </div>
            <button className="flex items-center space-x-2 text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium bg-cherish-yellow-light/50 hover:bg-cherish-yellow-light px-4 py-2 rounded-2xl border border-cherish-yellow-mono/20 transition-all duration-300">
              <span>Export</span>
              <ArrowDownIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Word Cloud Display */}
          <div className="relative w-full h-96 bg-gradient-to-br from-cherish-yellow-light/30 to-white rounded-2xl overflow-hidden border border-cherish-gray-100">
            {wordCloudData.map((word, index) => (
              <div
                key={index}
                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10"
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                  fontSize: `${word.size}px`,
                  color: word.color,
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  transform: 'translate(-50%, -50%)'
                }}
                title={`"${word.word}" - Used ${word.count} times`}
              >
                {word.word}
              </div>
            ))}
          </div>

          {/* Word Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cherish-yellow-light to-white rounded-2xl p-6 border border-cherish-yellow-mono/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-cherish-gray-600">Most Used Word</h3>
                <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400" />
              </div>
              <div className="text-2xl font-bold text-cherish-dark mb-1">congratulations</div>
              <div className="text-sm text-cherish-gray-500">Used 1,250 times</div>
            </div>

            <div className="bg-gradient-to-br from-cherish-green/10 to-white rounded-2xl p-6 border border-cherish-green/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-cherish-gray-600">Total Unique Words</h3>
                <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400" />
              </div>
              <div className="text-2xl font-bold text-cherish-dark mb-1">2,847</div>
              <div className="text-sm text-cherish-gray-500">Across all messages</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-cherish-gray-600">Average Words per Message</h3>
                <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400" />
              </div>
              <div className="text-2xl font-bold text-cherish-dark mb-1">12.4</div>
              <div className="text-sm text-cherish-gray-500">Words per recognition</div>
            </div>
          </div>
        </div>

        {/* Top Words List */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-cherish-dark mb-2">Top Words List</h2>
              <p className="text-cherish-gray-600">Detailed breakdown of the most frequently used words</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wordCloudData.slice(0, 12).map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-cherish-yellow-light/20 rounded-2xl border border-cherish-gray-100 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-cherish-yellow rounded-xl text-cherish-dark font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-cherish-dark">{word.word}</div>
                    <div className="text-xs text-cherish-gray-500">Used {word.count} times</div>
                  </div>
                </div>
                <div className="w-12 h-2 bg-cherish-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cherish-yellow-mono to-cherish-yellow rounded-full"
                    style={{ width: `${(word.count / 1250) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
