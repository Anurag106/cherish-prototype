'use client'

import React, { useState, Fragment, useRef, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import * as d3 from 'd3'
import { 
  InformationCircleIcon,
  TrophyIcon,
  ChartPieIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  HashtagIcon
} from '@heroicons/react/24/outline'

export default function LeaderboardsPage() {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedScope, setSelectedScope] = useState('Entire Company')
  const [selectedHashtag, setSelectedHashtag] = useState('Any Hashtag')
  const [selectedType, setSelectedType] = useState('Received')
  const [timeRange, setTimeRange] = useState('30 days')
  const [searchTerm, setSearchTerm] = useState('')

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
    if (analyticsType === 'leaderboard') {
      // Already on this page, do nothing
      return
    } else if (analyticsType === 'top-words') {
      router.push('/top-words')
    } else if (analyticsType === 'organization-graph') {
      router.push('/recognition-analytics/organization-graph')
    } else if (analyticsType === 'recognition') {
      router.push('/recognition-analytics')
    }
    // For other analytics types, navigate to the analytics page
    router.push('/recognition-analytics')
  }

  // Sample leaderboard data matching the expected chart
  const leaderboardData = [
    { 
      name: 'Rodrigo Notare', 
      segments: [
        { category: 'problem-solving', value: 1, color: '#e84393' }
      ],
      total: 1
    },
    { 
      name: 'Abhijit Shirude', 
      segments: [
        { category: 'problem-solving', value: 1, color: '#e84393' },
        { category: 'no-pain-no-gain', value: 0.5, color: '#00b894' },
        { category: 'inclusion', value: 1, color: '#00cec9' },
        { category: 'impact-over-effort', value: 2, color: '#81ecec' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'its-us-vs-the-problem', value: 2, color: '#81ecec' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: '1-percent-better-every-week', value: 2, color: '#74b9ff' },
        { category: 'bias-for-action', value: 2, color: '#00b894' },
        { category: 'problem-solving', value: 2, color: '#e84393' }
      ],
      total: 15
    },
    { 
      name: 'Davi Vale', 
      segments: [
        { category: 'ownership', value: 1, color: '#6c5ce7' },
        { category: 'problem-solving', value: 0.5, color: '#e84393' },
        { category: 'work-hard-live-well', value: 2, color: '#a29bfe' },
        { category: 'inclusion', value: 4, color: '#00cec9' },
        { category: 'impact-over-effort', value: 1, color: '#81ecec' },
        { category: 'problem-solving', value: 1, color: '#e84393' }
      ],
      total: 15
    },
    { 
      name: 'Quan Tran', 
      segments: [
        { category: 'impact-over-effort', value: 1, color: '#81ecec' },
        { category: 'ownership', value: 1, color: '#6c5ce7' },
        { category: 'no-pain-no-gain', value: 1, color: '#00b894' },
        { category: 'other', value: 2, color: '#e84393' },
        { category: 'impact-over-effort', value: 2, color: '#81ecec' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'problem-solving', value: 1, color: '#e84393' },
        { category: 'bias-for-action', value: 2, color: '#00b894' }
      ],
      total: 15
    },
    { 
      name: 'Bay Gaillard', 
      segments: [
        { category: 'bias-for-action', value: 2, color: '#00b894' },
        { category: 'impact-over-effort', value: 2, color: '#81ecec' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'other', value: 3, color: '#e84393' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: 'no-pain-no-gain', value: 2, color: '#00b894' }
      ],
      total: 13
    },
    { 
      name: 'Crícia Lopes', 
      segments: [
        { category: 'bias-for-action', value: 1, color: '#00b894' },
        { category: 'impact-over-effort', value: 1, color: '#81ecec' },
        { category: 'work-hard-live-well', value: 2, color: '#a29bfe' },
        { category: 'other', value: 2, color: '#e84393' },
        { category: 'impact-over-effort', value: 3, color: '#81ecec' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: 'no-pain-no-gain', value: 1, color: '#00b894' }
      ],
      total: 13
    },
    { 
      name: 'João Victor Couto (JV)', 
      segments: [
        { category: 'work-hard-live-well', value: 1, color: '#a29bfe' },
        { category: 'other', value: 2, color: '#e84393' },
        { category: 'impact-over-effort', value: 2, color: '#81ecec' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: 'no-pain-no-gain', value: 2, color: '#00b894' }
      ],
      total: 12
    },
    { 
      name: 'Lucas Bernar', 
      segments: [
        { category: 'impact-over-effort', value: 1, color: '#81ecec' },
        { category: 'ownership', value: 1, color: '#6c5ce7' },
        { category: 'problem-solving', value: 1, color: '#e84393' },
        { category: 'work-hard-live-well', value: 1, color: '#a29bfe' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'problem-solving', value: 1, color: '#e84393' },
        { category: 'no-pain-no-gain', value: 1, color: '#00b894' },
        { category: 'bias-for-action', value: 4, color: '#00b894' }
      ],
      total: 13
    },
    { 
      name: 'Michelle Nguyen', 
      segments: [
        { category: 'no-pain-no-gain', value: 1, color: '#00b894' },
        { category: 'no-pain-no-gain', value: 1, color: '#00b894' },
        { category: 'impact-over-effort', value: 3, color: '#81ecec' },
        { category: 'ownership', value: 2, color: '#6c5ce7' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: 'bias-for-action', value: 3, color: '#00b894' }
      ],
      total: 13
    },
    { 
      name: 'Neal Stirk', 
      segments: [
        { category: 'impact-over-effort', value: 1, color: '#81ecec' },
        { category: 'work-hard-live-well', value: 3, color: '#a29bfe' },
        { category: 'impact-over-effort', value: 2, color: '#81ecec' },
        { category: 'problem-solving', value: 3, color: '#e84393' },
        { category: 'bias-for-action', value: 3, color: '#00b894' }
      ],
      total: 13
    },
    { 
      name: 'Camille Farmer', 
      segments: [
        { category: 'impact-over-effort', value: 1, color: '#81ecec' },
        { category: 'ownership', value: 1, color: '#6c5ce7' },
        { category: 'impact-over-effort', value: 2, color: '#81ecec' },
        { category: 'ownership', value: 3, color: '#6c5ce7' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: 'bias-for-action', value: 3, color: '#00b894' }
      ],
      total: 12
    },
    { 
      name: 'Tykira Henry', 
      segments: [
        { category: 'no-pain-no-gain', value: 1, color: '#00b894' },
        { category: 'work-hard-live-well', value: 1, color: '#a29bfe' },
        { category: 'problem-solving', value: 2, color: '#e84393' },
        { category: 'no-pain-no-gain', value: 2, color: '#00b894' },
        { category: 'bias-for-action', value: 6, color: '#00b894' }
      ],
      total: 12
    }
  ]

  // Company/Team options
  const scopeOptions = [
    'Entire Company',
    'Aaron Shafer\'s Team',
    'Abhimanyu Singh\'s Team',
    'Adam Harrington\'s Team',
    'Aditya Hastak\'s Team',
    'Agnes Jiang\'s Team',
    'Alex Hoeffner\'s Team',
    'Alex Klein\'s Team',
    'Alex Trenthem\'s Team',
    'Alexander Lalonde\'s Team',
    'Alexia Laborda\'s Team',
    'Alice Shen\'s Team',
    'Allie Mairs\'s Team'
  ]

  // Hashtag options
  const hashtagOptions = [
    'Any Hashtag',
    '#debate-decide-commit',
    '#no-pain-no-gain',
    '#consciously-evolve',
    '#inclusion',
    '#impact-over-effort',
    '#ownership',
    '#problem-solving',
    '#its-us-vs-the-problem',
    '#1-percent-better-every-week',
    '#bias-for-action'
  ]

  // Time range options
  const timeRangeOptions = ['7 days', '30 days', '90 days', '6 months', '12 months']

  // Filter data based on search term
  const filteredData = leaderboardData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // D3 Chart Creation
  useEffect(() => {
    if (!svgRef.current || filteredData.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 120 }
    const width = 800 - margin.left - margin.right
    const height = 500 - margin.bottom - margin.top

    const chartGroup = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create tooltip div
    const tooltip = d3.select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(255, 255, 255, 0.95)")
      .style("backdrop-filter", "blur(8px)")
      .style("border", "1px solid #e2e8f0")
      .style("border-radius", "12px")
      .style("padding", "12px 16px")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .style("color", "#1a1a2e")
      .style("box-shadow", "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)")
      .style("z-index", "1000")
      .style("pointer-events", "none")

    // Scales
    const yScale = d3.scaleBand()
      .domain(filteredData.map(d => d.name))
      .range([0, height])
      .padding(0.2)

    const xScale = d3.scaleLinear()
      .domain([0, 18])
      .range([0, width])

    // Create bars
    const bars = chartGroup.selectAll(".bar-group")
      .data(filteredData)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", d => `translate(0, ${yScale(d.name)})`)

    // Add segments for each bar
    bars.each(function(d) {
      const barGroup = d3.select(this)
      let xOffset = 0

      d.segments.forEach((segment, i) => {
        const rect = barGroup.append("rect")
          .attr("x", xScale(xOffset))
          .attr("y", 0)
          .attr("width", xScale(segment.value))
          .attr("height", yScale.bandwidth())
          .attr("fill", segment.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .style("cursor", "pointer")
          .style("transition", "all 0.2s ease")

        // Add hover effects
        rect
          .on("mouseover", function(event) {
            // Highlight the segment
            d3.select(this)
              .attr("stroke", "#333")
              .attr("stroke-width", 2)
              .style("filter", "brightness(1.1)")

            // Show tooltip
            const categoryName = segment.category.replace(/-/g, ' ')
            tooltip.html(`
              <div style="font-weight: 600; margin-bottom: 4px;">${d.name}</div>
              <div style="color: ${segment.color};">
                #${categoryName}: ${segment.value}
              </div>
            `)
            .style("visibility", "visible")
          })
          .on("mousemove", function(event) {
            tooltip
              .style("top", (event.pageY - 10) + "px")
              .style("left", (event.pageX + 10) + "px")
          })
          .on("mouseout", function() {
            // Remove highlight
            d3.select(this)
              .attr("stroke", "#fff")
              .attr("stroke-width", 0.5)
              .style("filter", "none")

            // Hide tooltip
            tooltip.style("visibility", "hidden")
          })

        xOffset += segment.value
      })
    })

    // Add axes
    chartGroup.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(10))

    chartGroup.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale))

    // Style axes
    svg.selectAll(".x-axis text, .y-axis text")
      .style("font-size", "12px")
      .style("fill", "#6b7280")

    svg.selectAll(".x-axis path, .y-axis path, .x-axis line, .y-axis line")
      .style("stroke", "#e5e7eb")

    // Cleanup function to remove tooltip when component unmounts
    return () => {
      d3.select(".d3-tooltip").remove()
    }

  }, [filteredData])

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
                                item.id === 'leaderboard' 
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

      {/* Page Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-cherish-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <h2 className="text-3xl font-bold text-cherish-dark mb-2">Leaderboards</h2>
              <p className="text-cherish-gray-600 ml-4">
                Discover top performers and recognition leaders across your organization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section - Above the chart card */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Company/Team Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
              <span>{selectedScope}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2 max-h-64 overflow-y-auto">
              {scopeOptions.map((option) => (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedScope(option)}
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

          {/* Hashtag Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl text-sm font-medium text-cherish-dark hover:bg-cherish-yellow-light border border-cherish-gray-200 shadow-soft transition-all duration-300">
              <span>{selectedHashtag}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-cherish-gray-200 z-50 py-2 max-h-64 overflow-y-auto">
              {hashtagOptions.map((option) => (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedHashtag(option)}
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

          {/* Received/Given Toggle */}
          <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setSelectedType('Received')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedType === 'Received'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Received
            </button>
            <button
              onClick={() => setSelectedType('Given')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedType === 'Given'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Given
            </button>
          </div>

          {/* Time Range Dropdown */}
          <Menu as="div" className="relative ml-auto">
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

        {/* Search Bar - Separate row */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cherish-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-cherish-gray-300 rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-cherish-yellow focus:border-transparent text-sm transition-all duration-300 bg-white hover:border-cherish-gray-400"
            />
          </div>
        </div>

        {/* Leaderboard Chart Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-cherish-dark">
                Most Recognition {selectedType} For {selectedScope}
              </h2>
              <div className="group relative">
                <InformationCircleIcon className="h-5 w-5 text-cherish-gray-400 cursor-help hover:text-cherish-yellow-mono transition-colors duration-200" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs shadow-2xl">
                  Displays leading contributors based on recognition {selectedType.toLowerCase()} within the chosen timeframe
                </div>
              </div>
            </div>
          </div>

          {/* D3 Stacked Horizontal Bar Chart */}
          <div className="flex justify-center">
            <svg
              ref={svgRef}
              className="bg-white rounded-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00b894' }}></div>
              <span className="text-sm text-cherish-gray-600">#debate-decide-commit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00b894' }}></div>
              <span className="text-sm text-cherish-gray-600">#no-pain-no-gain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#a29bfe' }}></div>
              <span className="text-sm text-cherish-gray-600">#work-hard-live-well</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00cec9' }}></div>
              <span className="text-sm text-cherish-gray-600">#inclusion</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#81ecec' }}></div>
              <span className="text-sm text-cherish-gray-600">#impact-over-effort</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6c5ce7' }}></div>
              <span className="text-sm text-cherish-gray-600">#ownership</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e84393' }}></div>
              <span className="text-sm text-cherish-gray-600">#problem-solving</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#81ecec' }}></div>
              <span className="text-sm text-cherish-gray-600">#its-us-vs-the-problem</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#74b9ff' }}></div>
              <span className="text-sm text-cherish-gray-600">#1-percent-better-every-week</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00b894' }}></div>
              <span className="text-sm text-cherish-gray-600">#bias-for-action</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e84393' }}></div>
              <span className="text-sm text-cherish-gray-600">other</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
