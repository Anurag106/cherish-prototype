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
  ArrowUpIcon,
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
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSubTab, setActiveSubTab] = useState('recognition-received')
  const [activeMainTab, setActiveMainTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('12 Months')
  const [selectedFilters, setSelectedFilters] = useState({
    department: ['No Department', 'Mb Cx Admin Dept'],
    givingBy: 'Department'
  })

  // Analytics menu items
  const analyticsMenuItems = [
    { id: 'team-dashboard', name: 'Team dashboard', icon: ChartBarIcon },
    { id: 'leaderboard', name: 'Leaderboard', icon: TrophyIcon },
    { id: 'participation', name: 'Participation', icon: UserGroupIcon },
    { id: 'recognition', name: 'Recognition', icon: StarIcon },
    { id: 'organization-graph', name: 'Organization graph', icon: ChartPieIcon },
    { id: 'top-words', name: 'Top words', icon: HashtagIcon }
  ]

  // Sample data for charts
  const recognitionGivingData = [
    { month: 'Sep \'24', value: 20, company: 7 },
    { month: 'Oct \'24', value: 12, company: 7 },
    { month: 'Nov \'24', value: 35, company: 7 },
    { month: 'Dec \'24', value: 15, company: 7 },
    { month: 'Jan \'25', value: 12, company: 7 },
    { month: 'Feb \'25', value: 45, company: 7 },
    { month: 'Mar \'25', value: 15, company: 7 },
    { month: 'Apr \'25', value: 28, company: 7 },
    { month: 'May \'25', value: 30, company: 7 },
    { month: 'Jun \'25', value: 14, company: 7 },
    { month: 'Jul \'25', value: 13, company: 7 },
    { month: 'Aug \'25', value: 10, company: 7 }
  ]

  const recognitionReceivingData = [
    { month: 'Sep \'24', value: 5.2, benchmark: 5.0 },
    { month: 'Oct \'24', value: 5.5, benchmark: 5.0 },
    { month: 'Nov \'24', value: 5.8, benchmark: 5.0 },
    { month: 'Dec \'24', value: 7.2, benchmark: 5.0 },
    { month: 'Jan \'25', value: 6.2, benchmark: 5.0 },
    { month: 'Feb \'25', value: 6.0, benchmark: 5.0 },
    { month: 'Mar \'25', value: 5.5, benchmark: 5.0 },
    { month: 'Apr \'25', value: 5.3, benchmark: 5.0 },
    { month: 'May \'25', value: 5.4, benchmark: 5.0 },
    { month: 'Jun \'25', value: 5.3, benchmark: 5.0 },
    { month: 'Jul \'25', value: 5.2, benchmark: 5.0 },
    { month: 'Aug \'25', value: 5.3, benchmark: 5.0 }
  ]

  const userCountData = [
    { month: 'Sep \'24', users: 1650 },
    { month: 'Oct \'24', users: 1680 },
    { month: 'Nov \'24', users: 1720 },
    { month: 'Dec \'24', users: 1750 },
    { month: 'Jan \'25', users: 1770 },
    { month: 'Feb \'25', users: 1807 },
    { month: 'Mar \'25', users: 1820 },
    { month: 'Apr \'25', users: 1835 },
    { month: 'May \'25', users: 1840 },
    { month: 'Jun \'25', users: 1845 },
    { month: 'Jul \'25', users: 1850 },
    { month: 'Aug \'25', users: 1852 }
  ]

  const recognitionByTypeData = [
    { month: 'Sep \'24', p2p: 8500, awards: 1200 },
    { month: 'Oct \'24', p2p: 8800, awards: 1300 },
    { month: 'Nov \'24', p2p: 9200, awards: 1100 },
    { month: 'Dec \'24', p2p: 11500, awards: 1800 },
    { month: 'Jan \'25', p2p: 10500, awards: 1500 },
    { month: 'Feb \'25', p2p: 9521, awards: 349 },
    { month: 'Mar \'25', p2p: 9521, awards: 349 },
    { month: 'Apr \'25', p2p: 10200, awards: 400 },
    { month: 'May \'25', p2p: 10100, awards: 380 },
    { month: 'Jun \'25', p2p: 9900, awards: 360 },
    { month: 'Jul \'25', p2p: 9800, awards: 340 },
    { month: 'Aug \'25', p2p: 9750, awards: 330 }
  ]

  const pointsData = [
    { month: 'Sep \'24', p2p: 180000, awards: 45000 },
    { month: 'Oct \'24', p2p: 220000, awards: 60000 },
    { month: 'Nov \'24', p2p: 320000, awards: 70000 },
    { month: 'Dec \'24', p2p: 380000, awards: 90000 },
    { month: 'Jan \'25', p2p: 200000, awards: 80000 },
    { month: 'Feb \'25', p2p: 247912, awards: 50050 },
    { month: 'Mar \'25', p2p: 260000, awards: 52000 },
    { month: 'Apr \'25', p2p: 275000, awards: 55000 },
    { month: 'May \'25', p2p: 280000, awards: 45000 },
    { month: 'Jun \'25', p2p: 270000, awards: 42000 },
    { month: 'Jul \'25', p2p: 265000, awards: 40000 },
    { month: 'Aug \'25', p2p: 260000, awards: 38000 }
  ]

  const addOnRateData = [
    { month: 'Sep \'24', rate: 21.5 },
    { month: 'Oct \'24', rate: 22.2 },
    { month: 'Nov \'24', rate: 23.8 },
    { month: 'Dec \'24', rate: 24.2 },
    { month: 'Jan \'25', rate: 25.8 },
    { month: 'Feb \'25', rate: 24.5 },
    { month: 'Mar \'25', rate: 23.2 },
    { month: 'Apr \'25', rate: 25.2 },
    { month: 'May \'25', rate: 25.8 },
    { month: 'Jun \'25', rate: 24.1 },
    { month: 'Jul \'25', rate: 25.2 },
    { month: 'Aug \'25', rate: 24.6 }
  ]

  const companyValuesData = [
    { month: 'Sep \'24', workHard: 1800, beSoGood: 1600, itsUs: 1400, bias: 1200, onePercent: 800, noPain: 600, impact: 500, debate: 400 },
    { month: 'Oct \'24', workHard: 1750, beSoGood: 1550, itsUs: 1350, bias: 1150, onePercent: 750, noPain: 580, impact: 480, debate: 380 },
    { month: 'Nov \'24', workHard: 1900, beSoGood: 1700, itsUs: 1500, bias: 1300, onePercent: 850, noPain: 650, impact: 550, debate: 450 },
    { month: 'Dec \'24', workHard: 2200, beSoGood: 2000, itsUs: 1800, bias: 1600, onePercent: 1200, noPain: 900, impact: 800, debate: 700 },
    { month: 'Jan \'25', workHard: 1950, beSoGood: 1750, itsUs: 1550, bias: 1350, onePercent: 950, noPain: 720, impact: 620, debate: 520 },
    { month: 'Feb \'25', workHard: 1900, beSoGood: 1700, itsUs: 1500, bias: 1300, onePercent: 900, noPain: 680, impact: 580, debate: 480 },
    { month: 'Mar \'25', workHard: 1950, beSoGood: 1750, itsUs: 1550, bias: 1350, onePercent: 950, noPain: 720, impact: 620, debate: 520 },
    { month: 'Apr \'25', workHard: 1980, beSoGood: 1780, itsUs: 1580, bias: 1380, onePercent: 980, noPain: 740, impact: 640, debate: 540 },
    { month: 'May \'25', workHard: 1920, beSoGood: 1720, itsUs: 1520, bias: 1320, onePercent: 920, noPain: 700, impact: 600, debate: 500 },
    { month: 'Jun \'25', workHard: 1900, beSoGood: 1700, itsUs: 1500, bias: 1300, onePercent: 900, noPain: 680, impact: 580, debate: 480 },
    { month: 'Jul \'25', workHard: 1880, beSoGood: 1680, itsUs: 1480, bias: 1280, onePercent: 880, noPain: 660, impact: 560, debate: 460 },
    { month: 'Aug \'25', workHard: 1850, beSoGood: 1650, itsUs: 1450, bias: 1250, onePercent: 850, noPain: 640, impact: 540, debate: 440 }
  ]

  const departmentData = [
    { name: 'Mb Cx Admin Dept', giving: 19.0, change: 0, type: 'highest' },
    { name: 'No Department', giving: 0.0, change: 0, type: 'lowest' },
    { name: 'Rd Executive Dept', giving: 0, change: 15.5, type: 'growth' },
    { name: 'Employee Experience Dept', giving: 0, change: 3.2, type: 'growth' },
    { name: 'Talent Management Dept', giving: 0, change: 3.0, type: 'growth' },
    { name: 'Talent Development Dept', giving: 0, change: 3.0, type: 'growth' },
    { name: 'Mb Billing Provisioning Dept', giving: 0, change: 3.0, type: 'growth' },
    { name: 'Indigo Tech-Payments Dept', giving: 0, change: -4.5, type: 'decline' },
    { name: 'Mb Payments Sales Dept', giving: 0, change: -4.0, type: 'decline' },
    { name: 'Corp It Dept', giving: 0, change: -3.6, type: 'decline' },
    { name: 'Cp Cx Dept', giving: 0, change: -3.5, type: 'decline' },
    { name: 'Cp Domestic Am Sales Dept', giving: 0, change: -3.1, type: 'decline' }
  ]

  const hashtagsData = {
    popular: [
      { tag: '#work-hard-live-well', count: 19273 },
      { tag: '#be-so-good-they-can-not-ignore-you', count: 18389 },
      { tag: '#its-us-vs-the-problem', count: 13083 },
      { tag: '#bias-for-action', count: 10302 },
      { tag: '#1-percent-better-every-week', count: 6934 }
    ],
    growing: [
      { tag: '#work-hard-live-well', change: 128 },
      { tag: '#its-us-vs-the-problem', change: 70 },
      { tag: '#bias-for-action', change: 68 },
      { tag: '#consciously-evolve', change: 30 },
      { tag: '#ownership', change: 24 }
    ],
    declining: [
      { tag: '#impact-over-effort', change: -89 },
      { tag: '#be-so-good-they-can-not-ignore-you', change: -88 },
      { tag: '#1-percent-better-every-week', change: -82 },
      { tag: '#no-pain-no-gain', change: -21 },
      { tag: '#problem-solving', change: -2 }
    ]
  }

  const timeRangeOptions = ['6 Months', '12 Months', '2 Years', 'Year To Date']

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'compare-rates', label: 'Compare Rates' }
  ]

  const subTabs = [
    { id: 'recognition-received', label: 'Recognition Received' },
    { id: 'recognition-rates', label: 'Recognition Rates' },
    { id: 'hashtags', label: 'Hashtags' },
    { id: 'add-ons', label: 'Add-ons' }
  ]

  const MetricCard = ({ title, value, change, subtitle, tooltip, children }: any) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-cherish-gray-600">{title}</h3>
        {tooltip && (
          <div className="group relative">
            <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-cherish-dark mb-1">{value}</div>
      {subtitle && <div className="text-sm text-cherish-gray-500 mb-2">{subtitle}</div>}
      {change && (
        <div className={`text-sm flex items-center font-medium ${
          change.includes('+') ? 'text-cherish-green' : 'text-cherish-red'
        }`}>
          {change.includes('+') ? (
            <ArrowUpIcon className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 mr-1" />
          )}
          {change}
        </div>
      )}
      {children}
    </div>
  )

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-cherish-gray-200">
          <p className="font-semibold text-cherish-dark mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm font-medium`} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey.includes('rate') ? '%' : ''}`}
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
                              onClick={() => {
                                if (item.id === 'team-dashboard') {
                                  window.location.href = '/recognition-analytics/team-dashboard'
                                } else if (item.id === 'top-words') {
                                  window.location.href = '/top-words'
                                } else if (item.id === 'organization-graph') {
                                  window.location.href = '/recognition-analytics/organization-graph'
                                } else if (item.id === 'leaderboard') {
                                  window.location.href = '/recognition-analytics/leaderboards'
                                }
                              }}
                              className={`${
                                item.id === 'recognition' 
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
          <h1 className="text-3xl font-bold text-cherish-dark mb-2">Recognition Analytics</h1>
          <p className="text-cherish-gray-600">
            Analyze and track recognition patterns, engagement metrics, and performance insights across your organization.
          </p>
          
          {/* Main Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl max-w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeMainTab === tab.id
                      ? 'bg-white text-cherish-dark shadow-soft'
                      : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeMainTab === 'overview' && (
          <>
            {/* Sub Navigation and Time Range */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl">
                {subTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSubTab === tab.id
                        ? 'bg-white text-cherish-dark shadow-soft'
                        : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Time Range Selector - Moved to Right */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-cherish-gray-600 font-medium">Time Range</span>
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
                    <span>{timeRange}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-10 py-2">
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

            {/* Recognition Received Overview */}
            {activeSubTab === 'recognition-received' && (
              <div className="space-y-6">
                {/* Overview Description */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl p-4 shadow-soft">
                  <p className="text-sm text-cherish-dark">
                    Discover the volume of recognition activity across your organization. Use the time period selector in the top right to analyze recognition trends and patterns over different timeframes.
                  </p>
                </div>

                {/* Tip */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl p-4 shadow-soft">
                  <div className="flex items-start space-x-3">
                    <div className="bg-cherish-yellow-mono text-cherish-dark rounded-full p-1 mt-0.5">
                      <InformationCircleIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-cherish-dark">
                        <strong>Tip:</strong> Sustained recognition growth is excellent to observe. To maintain momentum and avoid stagnation, consider implementing{' '}
                        <a href="#" className="text-cherish-yellow-mono underline hover:text-cherish-dark transition-colors">distinctive organizational awards</a>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard
                    title="Recognition Received"
                    subtitle="Total recognition received during period"
                    value="121,968"
                    change="↑ 0.95% in August 🎉"
                    tooltip="Recognition includes peer to peer recognition, awards, and add-ons. If multiple users were recognized in a single post, recognition of each recipient is counted separately. Check out the chart below to see how recognition has trended over time. Compare that trend to your company's growth in users as well."
                  >
                    <div className="text-xs text-gray-500">10,164 / month</div>
                  </MetricCard>

                  <MetricCard
                    title="Point Received"
                    subtitle="Total point received during period"
                    value="4,197,304"
                    change="↑ 67.20% in August 🎉"
                    tooltip="Point received include those given to users through peer to peer recognition, awards, and add-ons. Check out the chart below to see how points received has trended over time. Compare that trend to your company's growth in users as well."
                  >
                    <div className="text-xs text-gray-500">349,775 / month</div>
                  </MetricCard>

                  <MetricCard
                    title="P2P v Awards"
                    subtitle="User given recognition versus awards"
                    tooltip="Peer to peer (P2P) counts recognition given from one user to another user. Awards include Celebrations given by Cherish as well as any manual or Incentives configured for this account."
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-cherish-gray-600">P2P</span>
                        <span className="text-sm font-medium">Awards</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">117,193</span>
                        <span className="text-lg font-bold">4,775</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>2,820,029 point</span>
                        <span>1,377,275 point</span>
                      </div>
                    </div>
                  </MetricCard>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recognition Received Chart */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Recognition Received</h3>
                      <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={recognitionByTypeData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="awards"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.8}
                          />
                          <Area
                            type="monotone"
                            dataKey="p2p"
                            stackId="1"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.8}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">P2P</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">Awards</span>
                      </div>
                    </div>
                  </div>

                  {/* Point Received Chart */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Point Received</h3>
                      <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={pointsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="awards"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.8}
                          />
                          <Area
                            type="monotone"
                            dataKey="p2p"
                            stackId="1"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.8}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">P2P</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">Awards</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Number of Users Chart */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-cherish-dark">Number Of Users</h3>
                      <div className="group relative inline-block">
                        <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
                          Monthly user counts include any user that was active at any time during the month. For example, if a new employee joins in the last week of the month, they will be counted in that month.
                        </div>
                      </div>
                    </div>
                    <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userCountData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                    <span className="text-sm text-cherish-gray-600">Users</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recognition Rates Tab */}
            {activeSubTab === 'recognition-rates' && (
              <div className="space-y-6">
                {/* Overview Description */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4">
                  <p className="text-sm text-cherish-dark">
                    Explore the typical employee experience within your organization. Recognition giving and receiving rates reveal the frequency of peer acknowledgment and appreciation each team member experiences monthly.
                  </p>
                </div>

                {/* Tip */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-cherish-yellow-mono text-cherish-dark rounded-full p-1 mt-0.5">
                      <InformationCircleIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-cherish-dark">
                        <strong>Tip:</strong> If rates fall below benchmarks, share best practices for meaningful recognition with team leaders. Leaders serve as influential examples and key catalysts for fostering recognition culture within their teams.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rate Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MetricCard
                    title="Average Receiving Rate"
                    subtitle="Average recognitions received by each user per month during period"
                    value="5.6 per user"
                    change="↑ 0.74% in August 🎉"
                    tooltip="Average receiving rate represents how many times an average user at your company receives recognition each month. Recognition includes peer to peer recognition, awards, and add-ons."
                  />

                  <MetricCard
                    title="Average Giving Rate"
                    subtitle="Average recognitions given by each user per month during period"
                    value="5.4 per user"
                    change="↑ 0.38% in August 🎉"
                    tooltip="Average giving rate represents how many times an average user at your company gives recognition to another user each month."
                  />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recognition Receiving Rate */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Recognition Receiving Rate</h3>
                      <div className="flex items-center space-x-2">
                        <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Compare Employee Segments</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={recognitionReceivingData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                          />
                          <Line
                            type="monotone"
                            dataKey="benchmark"
                            stroke="#6b7280"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">Average Receiving Rate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border border-gray-400 bg-transparent rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">Cherish Average</span>
                      </div>
                    </div>
                  </div>

                  {/* Recognition Giving Rate */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Recognition Giving Rate</h3>
                      <div className="flex items-center space-x-2">
                        <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Compare Employee Segments</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={recognitionReceivingData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                          />
                          <Line
                            type="monotone"
                            dataKey="benchmark"
                            stroke="#6b7280"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">Average Giving Rate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border border-gray-400 bg-transparent rounded-full"></div>
                        <span className="text-sm text-cherish-gray-600">Cherish Average</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hashtags Tab */}
            {activeSubTab === 'hashtags' && (
              <div className="space-y-6">
                {/* Overview Description */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4">
                  <p className="text-sm text-cherish-dark">
                    You are #incredible 😍. Analyze how your organization&apos;s core values evolve and trend across different periods.
                  </p>
                </div>

                {/* Tip */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-cherish-yellow-mono text-cherish-dark rounded-full p-1 mt-0.5">
                      <InformationCircleIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-cherish-dark">
                        <strong>Tip:</strong> The #analysis of organizational values helps motivate team members to adopt specific principles. Introducing a new company value?{' '}
                        <a href="#" className="text-cherish-yellow-mono hover:text-cherish-dark underline">Foster adoption through organization-wide recognition campaigns</a>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-cherish-gray-600">View</span>
                  <div className="bg-gray-100 rounded-xl p-1 inline-flex">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Company Values
                    </button>
                    <button className="text-cherish-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                      All Hashtags
                    </button>
                  </div>
                </div>

                {/* Hashtag Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Most Popular */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Most Popular During Period</h3>
                      <div className="group relative">
                        <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200 ml-2" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-2xl">
                          Information about this metric
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {hashtagsData.popular.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-700">{item.tag}</span>
                          </div>
                          <span className="text-sm font-medium text-cherish-dark">{item.count.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grew in August */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Grew In August</h3>
                      <div className="group relative">
                        <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200 ml-2" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-2xl">
                          Information about this metric
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {hashtagsData.growing.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-700">{item.tag}</span>
                          </div>
                          <span className="text-sm font-medium text-cherish-green flex items-center">
                            <ArrowUpIcon className="h-3 w-3 mr-1" />
                            +{item.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Declined in August */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-semibold text-cherish-dark">Declined In August</h3>
                      <div className="group relative">
                        <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200 ml-2" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-2xl">
                          Information about this metric
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {hashtagsData.declining.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-700">{item.tag}</span>
                          </div>
                          <span className="text-sm font-medium text-cherish-red flex items-center">
                            <ArrowDownIcon className="h-3 w-3 mr-1" />
                            {item.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Company Values Chart */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cherish-dark">Recognition Received by Company Values</h3>
                    <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={companyValuesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="workHard"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="beSoGood"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="itsUs"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="bias"
                          stackId="1"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="onePercent"
                          stackId="1"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="noPain"
                          stackId="1"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="impact"
                          stackId="1"
                          stroke="#84cc16"
                          fill="#84cc16"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="debate"
                          stackId="1"
                          stroke="#f97316"
                          fill="#f97316"
                          fillOpacity={0.8}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#work-hard-live-well</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#inclusion</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#no-pain-no-gain</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-700 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#impact-over-effort</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#debate-decide-commit</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#consciously-evolve</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#bias-for-action</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
                      <span className="text-xs text-cherish-gray-600">#work-hard-live-well</span>
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add-ons Tab */}
            {activeSubTab === 'add-ons' && (
              <div className="space-y-6">
                {/* Overview Description */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4">
                  <p className="text-sm text-cherish-dark">
                    Add-ons enable team members who contributed to a project to amplify recognition for colleagues. Peer respect and admiration serve as powerful motivators, and add-ons provide a platform to express this appreciation.
                  </p>
                </div>

                {/* Tip */}
                <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-cherish-yellow-mono text-cherish-dark rounded-full p-1 mt-0.5">
                      <InformationCircleIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-cherish-dark">
                        <strong>Tip:</strong> Motivate leaders to enhance recognition for their team members, demonstrating positive behavior and strengthening a culture of appreciation and acknowledgment. 💚
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add-on Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MetricCard
                    title="Recognition Posts with Add-ons"
                    subtitle="Number of posts with add-ons during period"
                    value="11,131"
                    change="↑ 0.89% in August 🎉"
                    tooltip="The average add-on rate represents how often a recognition post is echoed by another user's add-on recognition."
                  >
                    <div className="text-xs text-gray-500">928 / month</div>
                  </MetricCard>

                  <MetricCard
                    title="Average Add-on Rate"
                    subtitle="Average percentage of posts with add-ons per month during period"
                    value="23.6%"
                    change="↓ -1.0 percentage points in August"
                    tooltip="This represents the total number of recognition posts with at least one add-on during the period."
                  />
                </div>

                {/* Add-on Rate Chart */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cherish-dark">Posts with Add-ons</h3>
                    <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">Export ↓</button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={addOnRateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="rate"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                    <span className="text-sm text-cherish-gray-600">Add-on Rate</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Compare Rates Tab */}
        {activeMainTab === 'compare-rates' && (
          <div className="space-y-6">
            {/* Overview Description */}
            <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl p-4 shadow-soft">
              <p className="text-sm text-cherish-dark">
                Analyze recognition patterns across various organizational segments to discover trends and identify areas for enhancement and growth.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 relative z-20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 bg-cherish-gray-100 p-1 rounded-2xl">
                    <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-cherish-dark shadow-soft">
                      Giving Rate
                    </button>
                    <button className="px-4 py-2 rounded-xl text-sm font-medium text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50">
                      Receiving Rate
                    </button>
                  </div>
                  <span className="text-sm text-cherish-gray-500">by</span>
                  <Menu as="div" className="relative z-30">
                    <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
                      <span>Department</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2">
                      {['Department', 'Currency_Code', 'Group', 'Location', 'Role', 'Manager\'s Team', 'Tier', 'Title'].map((option) => (
                        <Menu.Item key={option}>
                          {({ active }) => (
                            <button
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
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-cherish-gray-600 font-medium">Time Range</span>
                  <Menu as="div" className="relative z-30">
                    <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
                      <span>12 Months</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2">
                      {timeRangeOptions.map((option) => (
                        <Menu.Item key={option}>
                          {({ active }) => (
                            <button
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

            {/* Department Comparison */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-cherish-dark mb-2">Recognition Giving Rate by Department</h2>
                  <p className="text-sm text-cherish-gray-600">
                    Examine recognition frequency across various departments and teams. Analyze the data visualization to identify areas of growth and segments requiring focused attention.
                  </p>
                </div>
                <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium flex items-center">
                  Export <ArrowDownIcon className="h-4 w-4 ml-1" />
                </button>
              </div>

              {/* Tip */}
              <div className="bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl shadow-soft p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-cherish-yellow-mono text-cherish-dark rounded-full p-1 mt-0.5 flex-shrink-0">
                    <InformationCircleIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-cherish-dark">
                      <strong>💡 Tip:</strong> Departments with lower recognition frequency can benefit from leadership encouragement to increase peer acknowledgment. Leaders serve as influential examples and catalysts for recognition culture. Enhanced recognition fosters stronger team connections. Create a positive recognition cascade!
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Highest & Lowest Monthly Giving Rate */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-cherish-gray-600">Monthly Giving Rate</h3>
                    <div className="group relative">
                      <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
                        Departments with highest and lowest giving rates
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Highest */}
                    <div>
                      <div className="text-xs text-cherish-gray-500 mb-1">Highest</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cherish-gray-700 font-medium">Mb Cx Admin Dept</span>
                        <span className="text-lg font-bold text-cherish-dark">19.0</span>
                      </div>
                      <div className="text-xs text-cherish-gray-500">per user</div>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-cherish-gray-200"></div>
                    
                    {/* Lowest */}
                    <div>
                      <div className="text-xs text-cherish-gray-500 mb-1">Lowest</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-cherish-gray-700 font-medium">No Department</span>
                        <span className="text-lg font-bold text-cherish-dark">0.0</span>
                      </div>
                      <div className="text-xs text-cherish-gray-500">per user</div>
                    </div>
                  </div>
                </div>

                {/* Grew in August */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-cherish-gray-600">Grew In August</h3>
                    <div className="group relative">
                      <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
                        Departments that showed growth in recognition giving
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {departmentData.filter(d => d.type === 'growth').slice(0, 5).map((dept, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-cherish-gray-700 truncate mr-2">{dept.name}</span>
                        <span className="text-sm font-medium text-cherish-green flex items-center flex-shrink-0">
                          <ArrowUpIcon className="h-3 w-3 mr-1" />
                          +{dept.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Declined in August */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-cherish-gray-600">Declined In August</h3>
                    <div className="group relative">
                      <InformationCircleIcon className="h-4 w-4 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
                        Departments that showed decline in recognition giving
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {departmentData.filter(d => d.type === 'decline').map((dept, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-cherish-gray-700 truncate mr-2">{dept.name}</span>
                        <span className="text-sm font-medium text-cherish-red flex items-center flex-shrink-0">
                          <ArrowDownIcon className="h-3 w-3 mr-1" />
                          {dept.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Department Filter Pills */}
              <div className="flex items-center flex-wrap gap-3 mb-6">
                <div className="flex items-center space-x-2 bg-cherish-green/10 border border-cherish-green/20 rounded-2xl px-3 py-2">
                  <div className="w-3 h-3 bg-cherish-green rounded-full"></div>
                  <span className="text-sm text-cherish-gray-700 font-medium">No Department</span>
                  <button className="text-cherish-gray-400 hover:text-cherish-gray-600 ml-1">×</button>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-2xl px-3 py-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-cherish-gray-700 font-medium">Mb Cx Admin Dept</span>
                  <button className="text-cherish-gray-400 hover:text-cherish-gray-600 ml-1">×</button>
                </div>
                <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium bg-cherish-yellow-light/50 hover:bg-cherish-yellow-light px-4 py-2 rounded-2xl border border-cherish-yellow-mono/20 transition-all duration-300">
                  + Add Department
                </button>
                <button className="text-cherish-yellow-mono hover:text-cherish-dark text-sm font-medium">
                  Remove All
                </button>
              </div>

              {/* Recognition Giving Chart */}
              <div className="bg-gradient-to-br from-white to-cherish-yellow-light/20 rounded-2xl p-4 mb-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recognitionGivingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        fontSize={12} 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        fontSize={12} 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }}
                        activeDot={{ r: 7, fill: '#3b82f6' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="company"
                        stroke="#6b7280"
                        strokeWidth={2}
                        strokeDasharray="8 4"
                        dot={{ r: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 bg-cherish-green rounded-full"></div>
                    <span className="text-sm text-cherish-gray-600 font-medium">0.0 No Department</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-cherish-gray-600 font-medium">22.0 Mb Cx Admin Dept</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 border-b-2 border-dashed border-gray-400"></div>
                    <span className="text-sm text-cherish-gray-600">5.2 Company Average</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 border-b-2 border-dashed border-gray-400"></div>
                    <span className="text-sm text-cherish-gray-600">0.0 No Department</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-0.5 border-b-2 border-dashed border-gray-400"></div>
                    <span className="text-sm text-cherish-gray-600">22.0 Mb Cx Admin Dept</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

