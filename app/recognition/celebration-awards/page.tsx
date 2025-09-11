'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { NotificationProvider } from '@/components/NotificationSystem'
import { GiftIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline'

export default function CelebrationAwardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-cherish-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isCollapsed={sidebarCollapsed}
          onCollapsedToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <MobileHeader 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            title="Celebration, Awards, Incentives"
          />
          
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="mb-8 hidden lg:block">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-cherish-yellow to-primary-500 rounded-3xl flex items-center justify-center shadow-medium">
                        <GiftIcon className="w-8 h-8 text-cherish-dark" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cherish-yellow rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-cherish-dark mb-2">
                        Celebration, Awards, Incentives
                      </h1>
                      <p className="text-xl text-cherish-gray-600">
                        Manage special recognition programs and milestone celebrations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="mb-6 lg:hidden">
                  <h1 className="text-2xl font-bold text-cherish-dark mb-2">
                    Celebration, Awards, Incentives
                  </h1>
                  <p className="text-cherish-gray-600">
                    Special recognition programs
                  </p>
                </div>

                {/* Coming Soon Card */}
                <div className="bg-white rounded-3xl border border-cherish-gray-200 shadow-soft p-8 text-center">
                  <div className="w-20 h-20 bg-cherish-yellow-light rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <SparklesIcon className="w-10 h-10 text-cherish-yellow-mono" />
                  </div>
                  <h2 className="text-2xl font-bold text-cherish-dark mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-cherish-gray-600 mb-8 max-w-md mx-auto">
                    This section will allow you to configure special awards, milestone celebrations, 
                    and incentive programs for your team.
                  </p>
                  
                  {/* Feature Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-cherish-gray-50 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <TrophyIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-cherish-dark mb-2">Awards Program</h3>
                      <p className="text-sm text-cherish-gray-600">
                        Set up monthly, quarterly, and annual awards with custom criteria
                      </p>
                    </div>
                    
                    <div className="bg-cherish-gray-50 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <SparklesIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-cherish-dark mb-2">Milestone Celebrations</h3>
                      <p className="text-sm text-cherish-gray-600">
                        Automatically celebrate work anniversaries, birthdays, and achievements
                      </p>
                    </div>
                    
                    <div className="bg-cherish-gray-50 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <GiftIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-cherish-dark mb-2">Incentive Programs</h3>
                      <p className="text-sm text-cherish-gray-600">
                        Create targeted incentive campaigns to drive specific behaviors
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}
