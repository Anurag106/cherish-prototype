'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import DisplaySettings from '@/components/tabs/DisplaySettings'
import InterfaceCustomization from '@/components/tabs/InterfaceCustomization'
import EmailCustomization from '@/components/tabs/EmailCustomization'
import SecurityLogin from '@/components/tabs/SecurityLogin'

const tabs = [
  { id: 'display-settings', name: 'Display Settings', component: DisplaySettings },
  { id: 'interface-customization', name: 'Interface customization', component: InterfaceCustomization },
  { id: 'email-customization', name: 'Email Customization', component: EmailCustomization },
  { id: 'security-login', name: 'Security & Login methods', component: SecurityLogin },
]

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState('display-settings')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component || DisplaySettings
  const activeTabName = tabs.find(tab => tab.id === activeTab)?.name || 'Account Settings'

  return (
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
          title={activeTabName}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8 hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cherish-yellow to-primary-500 rounded-2xl flex items-center justify-center shadow-soft">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-cherish-dark mb-1">
                      Account Settings
                    </h1>
                    <p className="text-cherish-gray-600">
                      Manage your company settings, preferences, and configurations
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Modern Tab Navigation */}
              <div className="mb-8">
                <div className="border-b border-cherish-gray-200 bg-white rounded-t-3xl p-1">
                  <nav className="flex space-x-1 overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-button ${
                          activeTab === tab.id ? 'active' : 'inactive'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="settings-card">
                <ActiveTabComponent />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
