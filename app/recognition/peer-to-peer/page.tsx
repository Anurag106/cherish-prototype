'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { NotificationProvider } from '@/components/NotificationSystem'
import MonthlyPointsAllowanceTab from '@/components/tabs/recognition/MonthlyPointsAllowanceTab'
import GiveAmountsTab from '@/components/tabs/recognition/GiveAmountsTab'
import PostCustomizationTab from '@/components/tabs/recognition/PostCustomizationTab'
import { 
  TrophyIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function PeerToPeerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('monthly-allowance')

  const tabs = [
    {
      id: 'monthly-allowance',
      name: 'Monthly Points Allowance',
      icon: CurrencyDollarIcon,
      component: MonthlyPointsAllowanceTab
    },
    {
      id: 'give-amounts',
      name: 'Give Amounts',
      icon: TrophyIcon,
      component: GiveAmountsTab
    },
    {
      id: 'post-customization',
      name: 'Post Customization',
      icon: ChatBubbleLeftRightIcon,
      component: PostCustomizationTab
    }
  ]

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component || MonthlyPointsAllowanceTab

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
            title="Peer-to-Peer Recognition"
          />
          
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="mb-8 hidden lg:block">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200">
                        <TrophyIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-primary-900 mb-2">
                        Peer-to-Peer Recognition
                      </h1>
                      <p className="text-xl text-primary-600">
                        Set your monthly points allowance and give amounts for your peer-to-peer program
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="mb-6 lg:hidden">
                  <h1 className="text-2xl font-bold text-primary-900 mb-2">
                    Peer-to-Peer Recognition
                  </h1>
                  <p className="text-primary-600">
                    Configure your peer-to-peer recognition settings
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                  <div className="flex space-x-1 bg-primary-100 p-1 rounded-2xl max-w-fit overflow-x-auto">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-4 lg:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 whitespace-nowrap hover:scale-105 ${
                            activeTab === tab.id
                              ? 'bg-white text-primary-900 shadow-sm'
                              : 'text-primary-600 hover:text-primary-900 hover:bg-white/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="hidden sm:inline">{tab.name}</span>
                          <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl border border-primary-200 shadow-sm min-h-[600px] hover:shadow-md transition-all duration-200">
                  <div className="p-6 lg:p-8">
                    <ActiveTabComponent />
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
