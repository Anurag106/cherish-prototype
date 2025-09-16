'use client'

import React, { useState, useEffect, useRef, Fragment, useMemo } from 'react'
import * as d3 from 'd3'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeftIcon,
  InformationCircleIcon,
  TrophyIcon,
  ChartPieIcon,
  UserIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  HashtagIcon
} from '@heroicons/react/24/outline'

interface TeamMember {
  id: string
  name: string
  initials: string
  color: string
  given: number
  received: number
  total: number
  x?: number
  y?: number
}

export default function OrganizationGraphPage() {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

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
      // Already on this page, do nothing
      return
    } else if (analyticsType === 'top-words') {
      router.push('/top-words')
    } else if (analyticsType === 'recognition') {
      router.push('/recognition-analytics')
    }
    // For other analytics types, navigate to the analytics page
    router.push('/recognition-analytics')
  }

  // Data from the screenshots
  const teamMembersWithinTeam: TeamMember[] = useMemo(() => [
    { id: '1', name: 'Robert Schmitt', initials: 'RS', color: '#3B82F6', given: 1, received: 3, total: 4 },
    { id: '2', name: 'Gary Lombardo', initials: 'GL', color: '#10B981', given: 0, received: 3, total: 3 },
    { id: '3', name: 'Alex Klein', initials: 'AK', color: '#DC2626', given: 8, received: 0, total: 8 },
    { id: '4', name: 'Curtis Hsu', initials: 'CH', color: '#10B981', given: 1, received: 1, total: 2 },
    { id: '5', name: 'Andie Kleeman', initials: 'AK', color: '#6B7280', given: 0, received: 1, total: 1 },
    { id: '6', name: 'Biplob Chakraborty', initials: 'BC', color: '#3B82F6', given: 0, received: 2, total: 2 }
  ], [])

  const teamMembersOutsideTeam = [
    { name: 'Robert Schmitt', given: 7, received: 6, total: 13 },
    { name: 'Gary Lombardo', given: 5, received: 4, total: 9 },
    { name: 'Alex Klein', given: 5, received: 1, total: 6 },
    { name: 'Curtis Hsu', given: 4, received: 5, total: 9 },
    { name: 'Andie Kleeman', given: 4, received: 2, total: 6 },
    { name: 'Biplob Chakraborty', given: 0, received: 2, total: 2 }
  ]

  // Create network graph visualization
  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 600
    const height = 400
    const centerX = width / 2
    const centerY = height / 2

    // Position nodes in a network layout similar to the screenshot
    const positions = [
      { x: centerX, y: centerY - 80 }, // BC - top center
      { x: centerX + 120, y: centerY - 40 }, // RS - top right
      { x: centerX - 80, y: centerY + 20 }, // AK - left
      { x: centerX - 20, y: centerY + 80 }, // GL - bottom left
      { x: centerX + 80, y: centerY + 100 }, // AK (Andie) - bottom
      { x: centerX + 140, y: centerY + 40 } // CH - right
    ]

    // Add connections (lines) between nodes based on recognition data
    const connections = [
      { source: 0, target: 1, strength: 3 }, // BC to RS
      { source: 1, target: 2, strength: 1 }, // RS to AK (Alex)
      { source: 2, target: 3, strength: 8 }, // AK (Alex) to GL
      { source: 3, target: 4, strength: 3 }, // GL to AK (Andie)
      { source: 4, target: 5, strength: 1 }, // AK (Andie) to CH
      { source: 5, target: 1, strength: 2 }, // CH to RS
    ]

    // Draw connections
    svg.selectAll('.connection')
      .data(connections)
      .enter()
      .append('line')
      .attr('class', 'connection')
      .attr('x1', d => positions[d.source].x)
      .attr('y1', d => positions[d.source].y)
      .attr('x2', d => positions[d.target].x)
      .attr('y2', d => positions[d.target].y)
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', d => Math.max(1, d.strength / 2))
      .attr('opacity', 0.6)

    // Draw nodes
    const nodes = svg.selectAll('.node')
      .data(teamMembersWithinTeam)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d, i) => `translate(${positions[i].x}, ${positions[i].y})`)

    // Add circles for nodes
    nodes.append('circle')
      .attr('r', 25)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')

    // Add initials text
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'Inter, sans-serif')
      .text(d => d.initials)
      .style('pointer-events', 'none')

  }, [teamMembersWithinTeam])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Main Header */}
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
                                item.id === 'organization-graph' 
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/recognition-analytics')}
                className="p-2 rounded-xl hover:bg-cherish-gray-100 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 text-cherish-gray-600" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-cherish-dark mb-2">Organization Graph</h2>
                <p className="text-cherish-gray-600">
                  Visualize recognition networks and team interaction patterns within your organization.
                </p>
                <p className="text-xs text-cherish-gray-500 mt-1">Cherish › San Luis Obispo › Alex&apos;s Team</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowTooltip(!showTooltip)}
                className="p-2 rounded-xl hover:bg-cherish-gray-100 transition-colors duration-200 group relative"
              >
                <InformationCircleIcon className="h-4 w-4 text-cherish-gray-600" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-cherish-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Toggle tooltip information
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tooltip Info */}
        {showTooltip && (
          <div className="mb-6 bg-cherish-yellow-light border border-cherish-yellow-mono/20 rounded-2xl p-4 shadow-soft">
            <p className="text-sm text-cherish-dark">
              This visualization displays organizational interactions and recognition flows between departments and team members 
              over the past 30 days. Line thickness indicates the volume of recognition exchanged between 
              different groups and individuals.
            </p>
          </div>
        )}

        {/* Network Graph */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200 p-8 mb-8">
          <div className="flex justify-center">
            <svg
              ref={svgRef}
              width="600"
              height="400"
              className="border border-cherish-gray-100 rounded-2xl"
            />
          </div>
        </div>

        {/* Recognition Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Within Team Recognition */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200">
            <div className="px-6 py-5 border-b border-cherish-gray-200">
              <h3 className="text-lg font-semibold text-cherish-dark">Recognition Within Alex&apos;s Team</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cherish-gray-200 bg-cherish-yellow-light/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-cherish-dark">Name</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-cherish-dark">Given</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-cherish-dark">Received</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-cherish-dark">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembersWithinTeam.map((member) => (
                    <tr key={member.id} className="border-b border-cherish-gray-100 hover:bg-cherish-yellow-light/30 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-2xl flex items-center justify-center text-white text-sm font-medium shadow-soft"
                            style={{ backgroundColor: member.color }}
                          >
                            {member.initials}
                          </div>
                          <span className="text-sm font-medium text-cherish-dark">{member.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 text-sm text-cherish-gray-600">{member.given}</td>
                      <td className="text-center py-4 px-4 text-sm text-cherish-gray-600">{member.received}</td>
                      <td className="text-center py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-semibold bg-cherish-yellow text-cherish-dark">
                          {member.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* External Recognition */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cherish-gray-200">
            <div className="px-6 py-5 border-b border-cherish-gray-200">
              <h3 className="text-lg font-semibold text-cherish-dark">Recognition Outside of Alex&apos;s Team</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cherish-gray-200 bg-cherish-yellow-light/50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-cherish-dark">Name</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-cherish-dark">Given</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-cherish-dark">Received</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-cherish-dark">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembersOutsideTeam.map((member, index) => (
                    <tr key={index} className="border-b border-cherish-gray-100 hover:bg-cherish-yellow-light/30 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-cherish-dark">{member.name}</span>
                      </td>
                      <td className="text-center py-4 px-4 text-sm text-cherish-gray-600">{member.given}</td>
                      <td className="text-center py-4 px-4 text-sm text-cherish-gray-600">{member.received}</td>
                      <td className="text-center py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-semibold bg-cherish-green text-white">
                          {member.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}