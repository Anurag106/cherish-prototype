'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { NotificationProvider } from '@/components/NotificationSystem'
import { GiftIcon } from '@heroicons/react/24/outline'
import CelebrationsTab from '@/components/tabs/CelebrationsTab'

export default function CelebrationAwardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <NotificationProvider>
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
                        Awards, Celebrations, & Incentives
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
                    Awards, Celebrations, & Incentives
                  </h1>
                  <p className="text-cherish-gray-600">
                    Special recognition programs
                  </p>
                </div>

                {/* Celebrations Tab Content */}
                <CelebrationsTab />
              </div>
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}
