'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { 
  InformationCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  TrophyIcon,
  GiftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [subscriptionExpanded, setSubscriptionExpanded] = useState(false)
  const [rewardsExpanded, setRewardsExpanded] = useState(true)

  // Sample data for charts
  const rewardsData = [
    { month: 'Mar', current: 9000, previous: 5000 },
    { month: 'Apr', current: 7000, previous: 6000 },
    { month: 'May', current: 6000, previous: 5500 },
    { month: 'Jun', current: 4000, previous: 4000 },
    { month: 'Jul', current: 3500, previous: 3800 },
    { month: 'Aug', current: 3000, previous: 3200 },
    { month: 'Sep', current: 3200, previous: 3000 },
    { month: 'Oct', current: 3800, previous: 3500 },
    { month: 'Nov', current: 4200, previous: 4000 },
    { month: 'Dec', current: 5000, previous: 4500 },
    { month: 'Jan', current: 6500, previous: 5500 },
    { month: 'Feb', current: 8500, previous: 7000 }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-primary-200">
          <p className="font-semibold text-primary-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.dataKey === 'current' ? 'Current 2023-2024' : '2022-2023'}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex h-screen bg-primary-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isCollapsed={sidebarCollapsed}
        onCollapsedToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <MobileHeader 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Admin Dashboard"
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shadow-md">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-primary-900 mb-1">
                      Welcome back, Charlotte!
                    </h1>
                    <p className="text-lg text-primary-600">
                      Admin-exclusive insights about your recognition program
                    </p>
                  </div>
                </div>
              </div>

              {/* Participation and Frequency */}
              <div className="bg-white rounded-2xl shadow-sm border border-primary-200 p-8 hover:shadow-md transition-all duration-200 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary-900">Participation and frequency</h2>
                  <div className="flex items-center space-x-2 text-sm text-primary-500">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Previous month</span>
                    <InformationCircleIcon className="w-4 h-4 cursor-help" />
                  </div>
                </div>
                
                <p className="text-primary-600 mb-8 leading-relaxed">
                  98% of your employees have participated in the previous month, with employees recognizing 
                  each other on average of 3 times per month. These metrics offer a quick snapshot of your 
                  company&apos;s culture of appreciation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Participation */}
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="w-24 h-24 rounded-full border-8 border-semantic-success-500 flex items-center justify-center bg-semantic-success-50">
                        <span className="text-2xl font-bold text-semantic-success-700">98%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium text-primary-600">Participation</span>
                        <InformationCircleIcon className="w-4 h-4 text-primary-400 cursor-help" />
                      </div>
                      <div className="text-sm text-semantic-success-600 font-medium">Great</div>
                    </div>
                  </div>

                  {/* Monthly giving rate */}
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-primary-900 mb-1">2.0</div>
                      <div className="text-sm text-primary-500">per user</div>
                      <div className="text-sm text-primary-500">Average</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium text-primary-600">Monthly giving rate</span>
                        <InformationCircleIcon className="w-4 h-4 text-primary-400 cursor-help" />
                      </div>
                    </div>
                  </div>

                  {/* Monthly receiving rate */}
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-primary-900 mb-1">13.0</div>
                      <div className="text-sm text-primary-500">per user</div>
                      <div className="text-sm text-semantic-success-600 font-medium">Great</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm font-medium text-primary-600">Monthly receiving rate</span>
                        <InformationCircleIcon className="w-4 h-4 text-primary-400 cursor-help" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-8 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600 mb-4">Learn more about your company&apos;s activity:</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Recognition analytics
                    </button>
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Participation analytics
                    </button>
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Participation summary
                    </button>
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Learn about our analytics
                    </button>
                  </div>
                </div>
              </div>

              {/* Program Adoption */}
              <div className="bg-white rounded-2xl shadow-sm border border-primary-200 p-8 hover:shadow-md transition-all duration-200 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary-900">Program adoption</h2>
                  <div className="flex items-center space-x-2 text-sm text-primary-500">
                    <span>Last 30 days</span>
                    <InformationCircleIcon className="w-4 h-4 cursor-help" />
                  </div>
                </div>
                
                <p className="text-primary-600 mb-8 leading-relaxed">
                  Appreciation is personal. That&apos;s why it&apos;s important to offer a variety of ways to show it. Explore 
                  the impact of your various recognition programs in the last 30 days.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Peer-to-peer */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <UserGroupIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-primary-900">Peer-to-peer</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary-900">33.6K posts</div>
                      <div className="text-sm text-primary-600">462.2K dabs</div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-primary-600">98% reach</span>
                        <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                      </div>
                    </div>
                  </div>

                  {/* Awards */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                        <TrophyIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-primary-900">Awards</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary-900">101 posts</div>
                      <div className="text-sm text-primary-600">1K points</div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-primary-600">8% reach</span>
                        <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                      </div>
                    </div>
                  </div>

                  {/* Celebrations */}
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                        <GiftIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-primary-900">Celebrations</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary-900">333 posts</div>
                      <div className="text-sm text-primary-600">30.9K points</div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-primary-600">53% reach</span>
                        <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                      </div>
                    </div>
                  </div>

                  {/* Incentives */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <ChartBarIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-primary-900">Incentives</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary-900">24K posts</div>
                      <div className="text-sm text-primary-600">2.75K dabs</div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-primary-600">19% reach</span>
                        <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-8 pt-6 border-t border-primary-200">
                  <p className="text-sm text-primary-600 mb-4">Explore and manage your recognition programs:</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Manage peer-to-peer
                    </button>
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Manage awards
                    </button>
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Manage celebrations
                    </button>
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Manage incentives
                    </button>
                  </div>
                  <div className="mt-2">
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                      Learn about our programs
                    </button>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-2xl shadow-sm border border-primary-200 p-8 hover:shadow-md transition-all duration-200 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary-900">Cost breakdown</h2>
                  <div className="flex items-center space-x-2 text-sm text-primary-500">
                    <span>Membership YTD</span>
                    <InformationCircleIcon className="w-4 h-4 cursor-help" />
                  </div>
                </div>
                
                <p className="text-primary-600 mb-8 leading-relaxed">
                  Comparing total cost for 1 membership year (Mar 2024 – Feb 2025)
                </p>

                {/* Cost Visualization Bar */}
                <div className="mb-8">
                  <div className="flex h-12 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-semantic-success-500 flex-shrink-0" style={{ width: '10%' }}></div>
                    <div className="bg-brand-500 flex-1"></div>
                    <div className="bg-primary-200 flex-shrink-0" style={{ width: '15%' }}></div>
                  </div>
                </div>

                {/* Subscription Cost */}
                <div className="border border-primary-200 rounded-2xl mb-6">
                  <button 
                    onClick={() => setSubscriptionExpanded(!subscriptionExpanded)}
                    className="w-full p-6 flex items-center justify-between hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-semantic-success-500 rounded-full"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary-900">Subscription cost</h3>
                        <InformationCircleIcon className="w-4 h-4 text-primary-400 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-primary-900">$2,216.00</span>
                      <ChevronDownIcon className={`w-5 h-5 text-primary-400 transition-transform duration-200 ${subscriptionExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {subscriptionExpanded && (
                    <div className="px-6 pb-6 border-t border-primary-200">
                      <div className="mt-4 space-y-4">
                        <p className="text-sm text-primary-600">
                          Your subscription cost is what you pay to use the Cherish platform, and is influenced by the 
                          number of seats in your account. Over time, subscription cost usually represents a smaller 
                          fraction compared to rewards cost.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary-600">Monthly price per seat</span>
                              <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                            </div>
                            <div className="text-2xl font-bold text-primary-900">$2.00</div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary-600">Current seats</span>
                              <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                            </div>
                            <div className="text-2xl font-bold text-primary-900">1,108</div>
                            <div className="text-sm text-brand-600">→ 12 users</div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-primary-200">
                          <p className="text-sm text-primary-600">Questions around your subscription costs?</p>
                          <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline mt-1">
                            Contact us
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rewards Cost */}
                <div className="border border-primary-200 rounded-2xl">
                  <button 
                    onClick={() => setRewardsExpanded(!rewardsExpanded)}
                    className="w-full p-6 flex items-center justify-between hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-brand-500 rounded-full"></div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary-900">Rewards cost</h3>
                        <InformationCircleIcon className="w-4 h-4 text-primary-400 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-primary-900">$23,125.00</span>
                      <ChevronDownIcon className={`w-5 h-5 text-primary-400 transition-transform duration-200 ${rewardsExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {rewardsExpanded && (
                    <div className="px-6 pb-6 border-t border-primary-200">
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-primary-900 mb-4">Month-to-month rewards</h4>
                        
                        {/* Chart */}
                        <div className="h-64 mb-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rewardsData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="month" fontSize={12} />
                              <YAxis fontSize={12} />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar dataKey="current" fill="#06b6d4" name="Current 2023-2024" />
                              <Bar dataKey="previous" fill="#94a3b8" name="2022-2023" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <p className="text-sm text-primary-600 mb-6">
                          Rewards cost is flexible and under your control. You pay only for what&apos;s redeemed, not for the 
                          points distributed. Use this chart to review your average monthly rewards cost to ensure 
                          you&apos;re aligned with your budget.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary-600">Avg. rewards cost</span>
                              <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                            </div>
                            <div className="text-2xl font-bold text-primary-900">$5,781.25/mo</div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary-600">Unredeemed balance</span>
                              <InformationCircleIcon className="w-3 h-3 text-primary-400" />
                            </div>
                            <div className="text-2xl font-bold text-primary-900">$4,963.00</div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-primary-200">
                          <p className="text-sm text-primary-600 mb-4">Review and manage your subscription and reward costs:</p>
                          <div className="flex flex-wrap gap-4">
                            <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                              Plans & billing
                            </button>
                            <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                              Billing history
                            </button>
                            <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                              Points earned
                            </button>
                            <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                              Reward redemptions
                            </button>
                            <button className="text-brand-600 hover:text-brand-700 text-sm font-medium underline">
                              Maximize your ROI
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
