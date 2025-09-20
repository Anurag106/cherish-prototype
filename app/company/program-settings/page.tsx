'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import PointsSettings from '@/components/tabs/PointsSettings'
import CompanyValueHashtags from '@/components/tabs/CompanyValueHashtags'
import BannedHashtags from '@/components/tabs/BannedHashtags'
import { NotificationProvider } from '@/components/NotificationSystem'

const tabs = [
  { id: 'points', name: 'Points', component: PointsSettings },
  { id: 'company-hashtags', name: 'Company Value Hashtags', component: CompanyValueHashtags },
  { id: 'banned-hashtags', name: 'Banned Hashtags', component: BannedHashtags },
]

export default function ProgramSettings() {
  const [activeTab, setActiveTab] = useState('points')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component || PointsSettings
  const activeTabName = tabs.find(tab => tab.id === activeTab)?.name || 'Program Settings'

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
            title={activeTabName}
          />
          
          <main className="flex-1 overflow-auto">
            <div className="container-responsive py-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-cherish-dark mb-2">Program Settings</h1>
                <p className="text-cherish-gray-600 text-lg">
                  Configure your recognition program settings, points system, and company values
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-3xl shadow-soft border border-cherish-gray-200 mb-8">
                <div className="border-b border-cherish-gray-200">
                  <nav className="flex space-x-0" aria-label="Tabs">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          tab-button flex-1 text-center
                          ${activeTab === tab.id ? 'active' : 'inactive'}
                          ${index === 0 ? 'rounded-tl-3xl' : ''}
                          ${index === tabs.length - 1 ? 'rounded-tr-3xl' : ''}
                        `}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Tab Content */}
                <div className="p-8">
                  <ActiveTabComponent />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}
