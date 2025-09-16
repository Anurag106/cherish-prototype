'use client'

import React, { useState, useEffect } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
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

// Add custom styles for animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .animate-pulse-gentle {
    animation: pulse 2s ease-in-out infinite;
  }
`

export default function TeamDashboardPage() {
  const router = useRouter()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 Days')
  const [hoveredLeaderboard, setHoveredLeaderboard] = useState<string | null>(null)
  const [animateParticipation, setAnimateParticipation] = useState(false)

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
    if (analyticsType === 'team-dashboard') {
      // Already on this page, do nothing
      return
    } else if (analyticsType === 'top-words') {
      router.push('/top-words')
    } else if (analyticsType === 'organization-graph') {
      router.push('/recognition-analytics/organization-graph')
    } else if (analyticsType === 'recognition') {
      router.push('/recognition-analytics')
    } else if (analyticsType === 'leaderboard') {
      router.push('/recognition-analytics/leaderboards')
    } else if (analyticsType === 'participation') {
      router.push('/participation')
    }
  }

  useEffect(() => {
    // Trigger participation animation on mount
    const timer = setTimeout(() => setAnimateParticipation(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Sample data for Alex Klein's Team
  const participationData = [
    { date: 'Aug 1', participation: 45 },
    { date: 'Aug 5', participation: 60 },
    { date: 'Aug 10', participation: 75 },
    { date: 'Aug 15', participation: 85 },
    { date: 'Aug 20', participation: 90 },
    { date: 'Aug 25', participation: 95 },
    { date: 'Aug 31', participation: 100 }
  ]

  const leaderboardData = [
    { name: 'Robert', initials: 'RS', score: 10, color: '#10b981' },
    { name: 'Gary', initials: 'GL', score: 8, color: '#e91e63' },
    { name: 'Curtis', initials: 'CH', score: 7, color: '#9c27b0' },
    { name: 'Andie', initials: 'A', score: 6, color: '#3f51b5', avatar: '/api/placeholder/32/32' },
    { name: 'Biplob', initials: 'BC', score: 4, color: '#00bcd4' }
  ]

  const recognitionStats = {
    given: 36,
    received: 38,
    pointsGiven: 735
  }

  const hashtagData = [
    { name: '#consciously-evolve', value: 30, color: '#00bcd4' },
    { name: '#ownership', value: 25, color: '#3f51b5' },
    { name: '#its-us-vs-the-problem', value: 20, color: '#9c27b0' },
    { name: '#bias-for-action', value: 15, color: '#e91e63' },
    { name: 'other', value: 10, color: '#10b981' }
  ]

  const topWords = [
    { word: 'churn', size: 24, color: '#3b82f6' },
    { word: 'monitor', size: 20, color: '#00bcd4' },
    { word: 'test', size: 16, color: '#10b981' },
    { word: 'congrats', size: 32, color: '#10b981' },
    { word: 'e2e', size: 18, color: '#6b7280' },
    { word: 'moving', size: 14, color: '#6b7280' },
    { word: 'cx', size: 16, color: '#6b7280' },
    { word: 'keeping', size: 20, color: '#e91e63' },
    { word: 'dashboard', size: 28, color: '#dc2626' },
    { word: 'attentive', size: 22, color: '#3f51b5' },
    { word: 'future', size: 18, color: '#e91e63' },
    { word: 'quick', size: 16, color: '#fbbf24' },
    { word: 'mb', size: 14, color: '#6b7280' },
    { word: 'launch', size: 24, color: '#9c27b0' },
    { word: 'super', size: 20, color: '#3b82f6' },
    { word: 'cases', size: 18, color: '#dc2626' },
    { word: 'analytics', size: 26, color: '#f59e0b' },
    { word: 'data', size: 22, color: '#f97316' },
    { word: 'update', size: 20, color: '#f97316' }
  ]

  const organizationNodes = [
    { id: 'AK', name: 'Alex Klein', x: 200, y: 90, color: '#dc2626', isManager: true, size: 35 },
    { id: 'BC', name: 'Biplob', x: 120, y: 200, color: '#3f51b5', size: 30 },
    { id: 'RS', name: 'Robert', x: 280, y: 180, color: '#10b981', size: 30 },
    { id: 'GL', name: 'Gary', x: 80, y: 320, color: '#10b981', size: 28 },
    { id: 'CH', name: 'Curtis', x: 320, y: 320, color: '#10b981', size: 28 },
    { id: 'A', name: 'Andie', x: 200, y: 380, color: '#6b7280', size: 26, hasAvatar: true }
  ]

  const connections = [
    { from: 'AK', to: 'BC', strength: 'strong' },
    { from: 'AK', to: 'RS', strength: 'strong' },
    { from: 'BC', to: 'GL', strength: 'medium' },
    { from: 'RS', to: 'CH', strength: 'medium' },
    { from: 'GL', to: 'A', strength: 'weak' },
    { from: 'CH', to: 'A', strength: 'weak' },
    { from: 'BC', to: 'RS', strength: 'medium' }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-cherish-gray-200">
          <p className="font-semibold text-cherish-dark mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'participation' ? '%' : ''}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const ParticipationTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cherish-dark text-white px-3 py-2 rounded-xl text-sm font-medium shadow-2xl">
          August 31 2025: 83%
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
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
                onClick={() => router.push('/')}
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
                                item.id === 'team-dashboard' 
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cherish-dark mb-2">Team Analytics Dashboard</h1>
            <p className="text-cherish-gray-600">
              Comprehensive insights and performance metrics for Alex Klein&apos;s Team across recognition activities.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-cherish-gray-600 font-medium">{selectedTimeRange}</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Participation Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-cherish-blue-600 mb-2">Participation</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`text-4xl font-bold text-cherish-dark transition-all duration-1000 ${
                    animateParticipation ? 'animate-pulse-gentle' : ''
                  }`}>
                    100%
                  </span>
                </div>
                <p className="text-sm text-cherish-gray-500">have received recognition</p>
              </div>
              <button className="text-cherish-blue-600 hover:text-cherish-dark text-sm font-medium">
                View more
              </button>
            </div>
            
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip content={<ParticipationTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="participation"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              {/* Tooltip positioned manually */}
              <div className="absolute top-4 right-8 bg-cherish-dark text-white px-3 py-2 rounded-xl text-sm font-medium shadow-2xl">
                August 31 2025: 83%
              </div>
            </div>
          </div>

          {/* Organization Graph */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cherish-blue-600">Organization Graph</h3>
              <button className="text-cherish-blue-600 hover:text-cherish-dark text-sm font-medium">
                View more
              </button>
            </div>
            
            <div className="h-80 relative bg-gradient-to-br from-cherish-yellow-light/10 to-transparent rounded-2xl p-6">
              <svg width="100%" height="100%" viewBox="0 0 400 450" className="overflow-visible">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: '#10b981', stopOpacity: 0.4}} />
                  </linearGradient>
                </defs>
                
                {/* Connection lines with different strengths */}
                <g>
                  {connections.map((conn, index) => {
                    const fromNode = organizationNodes.find(n => n.id === conn.from)
                    const toNode = organizationNodes.find(n => n.id === conn.to)
                    if (!fromNode || !toNode) return null
                    
                    const strokeWidth = conn.strength === 'strong' ? 4 : conn.strength === 'medium' ? 3 : 2
                    const opacity = conn.strength === 'strong' ? 0.9 : conn.strength === 'medium' ? 0.7 : 0.5
                    
                    return (
                      <line
                        key={index}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="url(#connectionGradient)"
                        strokeWidth={strokeWidth}
                        opacity={animateParticipation ? opacity : 0}
                        className="transition-all duration-1000"
                        style={{ transitionDelay: `${index * 200}ms` }}
                      />
                    )
                  })}
                </g>
                
                {/* Team member nodes */}
                {organizationNodes.map((node, index) => {
                  const nodeRadius = hoveredNode === node.id ? node.size + 4 : node.size
                  return (
                    <g key={node.id}>
                      {/* Outer glow ring for manager */}
                      {node.isManager && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={nodeRadius + 10}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="3"
                          opacity={animateParticipation ? 0.4 : 0}
                          className="transition-all duration-1000 animate-pulse-gentle"
                          style={{ transitionDelay: `${index * 150}ms` }}
                        />
                      )}
                      
                      {/* Main node circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={nodeRadius}
                        fill={node.color}
                        className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg"
                        style={{
                          opacity: animateParticipation ? 1 : 0,
                          transform: `scale(${hoveredNode === node.id ? 1.1 : 1})`,
                          transitionDelay: `${index * 150}ms`,
                          filter: hoveredNode === node.id ? 'url(#glow)' : 'none'
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      
                      {/* Avatar or initials */}
                      {node.hasAvatar ? (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={nodeRadius - 3}
                          fill="#f3f4f6"
                          className="pointer-events-none"
                          style={{
                            opacity: animateParticipation ? 1 : 0,
                            transitionDelay: `${index * 150 + 100}ms`
                          }}
                        />
                      ) : (
                        <text
                          x={node.x}
                          y={node.y + 6}
                          textAnchor="middle"
                          className="fill-white font-bold pointer-events-none transition-all duration-300"
                          style={{
                            fontSize: `${nodeRadius / 2}px`,
                            opacity: animateParticipation ? 1 : 0,
                            transitionDelay: `${index * 150 + 100}ms`
                          }}
                        >
                          {node.id}
                        </text>
                      )}
                      
                      {/* Manager crown */}
                      {node.isManager && (
                        <text
                          x={node.x}
                          y={node.y - nodeRadius - 12}
                          textAnchor="middle"
                          className="pointer-events-none transition-all duration-300"
                          style={{
                            fontSize: '20px',
                            opacity: animateParticipation ? 1 : 0,
                            transitionDelay: `${index * 150 + 200}ms`
                          }}
                        >
                          👑
                        </text>
                      )}
                      
                      {/* Enhanced tooltip */}
                      {hoveredNode === node.id && (
                        <g className="animate-fade-in">
                          <rect
                            x={node.x - 50}
                            y={node.y - nodeRadius - 65}
                            width="100"
                            height="40"
                            rx="20"
                            fill="rgba(0,0,0,0.9)"
                            stroke={node.color}
                            strokeWidth="2"
                          />
                          <text
                            x={node.x}
                            y={node.y - nodeRadius - 48}
                            textAnchor="middle"
                            className="fill-white text-sm font-bold pointer-events-none"
                          >
                            {node.name}
                          </text>
                          <text
                            x={node.x}
                            y={node.y - nodeRadius - 32}
                            textAnchor="middle"
                            className="fill-gray-300 text-sm pointer-events-none"
                          >
                            {node.isManager ? 'Team Lead' : 'Team Member'}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cherish-blue-600">Leaderboard</h3>
              <button className="text-cherish-blue-600 hover:text-cherish-dark text-sm font-medium">
                View more
              </button>
            </div>
            
            <div className="space-y-4">
              {leaderboardData.map((member, index) => (
                <div 
                  key={member.name} 
                  className="flex items-center space-x-4 p-3 rounded-2xl transition-all duration-300 hover:bg-cherish-yellow-light/30 cursor-pointer"
                  onMouseEnter={() => setHoveredLeaderboard(member.name)}
                  onMouseLeave={() => setHoveredLeaderboard(null)}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-300 ${
                      hoveredLeaderboard === member.name ? 'scale-110 shadow-lg' : ''
                    }`}
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        hoveredLeaderboard === member.name ? 'text-cherish-dark' : 'text-cherish-gray-700'
                      }`}>
                        {member.name}
                      </span>
                      <span className={`text-xs font-bold transition-all duration-300 ${
                        hoveredLeaderboard === member.name ? 'text-cherish-dark scale-110' : 'text-cherish-gray-500'
                      }`}>
                        {member.score}
                      </span>
                    </div>
                    <div className="w-full bg-cherish-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all duration-700 ease-out ${
                          hoveredLeaderboard === member.name ? 'shadow-sm' : ''
                        }`}
                        style={{ 
                          backgroundColor: member.color, 
                          width: animateParticipation ? `${(member.score / 10) * 100}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center text-sm text-cherish-gray-500 mt-4">
                Recognition received in the last 30 days
              </div>
            </div>
          </div>

          {/* Recognition Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-8 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-cherish-blue-600">Recognition</h3>
              <button className="text-cherish-blue-600 hover:text-cherish-dark text-sm font-medium">
                View more
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 rounded-2xl hover:bg-cherish-yellow-light/20 transition-all duration-300 cursor-pointer group">
                <div className={`text-4xl font-bold text-cherish-dark transition-all duration-700 group-hover:scale-110 ${
                  animateParticipation ? 'animate-fade-in' : 'opacity-0'
                }`} style={{ transitionDelay: '200ms' }}>
                  {recognitionStats.given}
                </div>
                <div className="text-base font-medium text-cherish-gray-600 mt-2">Given</div>
              </div>
              <div className="text-center p-4 rounded-2xl hover:bg-cherish-yellow-light/20 transition-all duration-300 cursor-pointer group">
                <div className={`text-4xl font-bold text-cherish-dark transition-all duration-700 group-hover:scale-110 ${
                  animateParticipation ? 'animate-fade-in' : 'opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                  {recognitionStats.received}
                </div>
                <div className="text-base font-medium text-cherish-gray-600 mt-2">Received</div>
              </div>
              <div className="text-center p-4 rounded-2xl hover:bg-cherish-yellow-light/20 transition-all duration-300 cursor-pointer group">
                <div className={`text-4xl font-bold text-cherish-dark transition-all duration-700 group-hover:scale-110 ${
                  animateParticipation ? 'animate-fade-in' : 'opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  {recognitionStats.pointsGiven}
                </div>
                <div className="text-base font-medium text-cherish-gray-600 mt-2">Points Given</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hashtagData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {hashtagData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '14px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/90 rounded-full p-4 shadow-soft">
                    <div className="text-2xl font-bold text-cherish-dark">10</div>
                    <div className="text-sm font-medium text-cherish-gray-600">Unique</div>
                    <div className="text-sm font-medium text-cherish-gray-600">Hashtags Used</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              {hashtagData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-cherish-yellow-light/10 transition-colors duration-200">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-cherish-gray-700 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Words Section */}
        <div className="mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-6 hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-cherish-blue-600">Top Words</h3>
              <button className="text-cherish-blue-600 hover:text-cherish-dark text-sm font-medium">
                View more
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 min-h-[200px] p-4">
              {topWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block font-semibold cursor-pointer transition-all duration-300 hover:scale-125 hover:drop-shadow-lg animate-fade-in"
                  style={{ 
                    fontSize: `${word.size}px`, 
                    color: word.color,
                    lineHeight: '1.2',
                    opacity: animateParticipation ? 1 : 0,
                    transform: animateParticipation ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 50}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = `0 0 10px ${word.color}40`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  {word.word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
