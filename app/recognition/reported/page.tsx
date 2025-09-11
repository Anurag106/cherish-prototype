'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { NotificationProvider } from '@/components/NotificationSystem'
import { 
  FlagIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function ReportedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('pending')

  // Mock data for reported items
  const reportedItems = [
    {
      id: '1',
      type: 'Inappropriate Content',
      reportedBy: 'Anonymous',
      targetUser: 'John Smith',
      content: 'Recognition post with inappropriate language',
      date: '2 hours ago',
      status: 'pending',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'Spam',
      reportedBy: 'Sarah Wilson',
      targetUser: 'Mike Johnson',
      content: 'Multiple duplicate recognition posts',
      date: '1 day ago',
      status: 'resolved',
      severity: 'low'
    }
  ]

  const filteredItems = reportedItems.filter(item => 
    activeTab === 'all' || item.status === activeTab
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-amber-100 text-amber-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'dismissed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
            title="Reported Content"
          />
          
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="mb-8 hidden lg:block">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-cherish-yellow to-primary-500 rounded-3xl flex items-center justify-center shadow-medium">
                        <FlagIcon className="w-8 h-8 text-cherish-dark" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cherish-yellow rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-cherish-dark mb-2">
                        Reported Content
                      </h1>
                      <p className="text-xl text-cherish-gray-600">
                        Review and moderate reported recognition posts and user behavior
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="mb-6 lg:hidden">
                  <h1 className="text-2xl font-bold text-cherish-dark mb-2">
                    Reported Content
                  </h1>
                  <p className="text-cherish-gray-600">
                    Review reported items
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <ClockIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">1</div>
                        <div className="text-sm text-cherish-gray-600">Pending Review</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">1</div>
                        <div className="text-sm text-cherish-gray-600">Resolved</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">0</div>
                        <div className="text-sm text-cherish-gray-600">High Priority</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-cherish-yellow-light rounded-2xl flex items-center justify-center">
                        <FlagIcon className="w-6 h-6 text-cherish-yellow-mono" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">2</div>
                        <div className="text-sm text-cherish-gray-600">Total Reports</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6">
                  <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl max-w-fit">
                    {[
                      { id: 'pending', name: 'Pending', count: 1 },
                      { id: 'resolved', name: 'Resolved', count: 1 },
                      { id: 'all', name: 'All Reports', count: 2 }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'bg-white text-cherish-dark shadow-soft'
                            : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
                        }`}
                      >
                        <span>{tab.name}</span>
                        <span className="bg-cherish-gray-300 text-cherish-gray-700 px-2 py-0.5 rounded-full text-xs">
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reported Items */}
                <div className="bg-white rounded-3xl border border-cherish-gray-200 shadow-soft">
                  <div className="p-6 border-b border-cherish-gray-200">
                    <h2 className="text-xl font-bold text-cherish-dark">Reported Items</h2>
                    <p className="text-cherish-gray-600 mt-1">Review and moderate reported content</p>
                  </div>
                  
                  <div className="divide-y divide-cherish-gray-200">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <FlagIcon className="w-5 h-5 text-red-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-cherish-dark">
                                  {item.type}
                                </div>
                                <div className="text-sm text-cherish-gray-600">
                                  Reported by {item.reportedBy} • {item.date}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                                  {item.severity} priority
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-cherish-gray-50 rounded-2xl p-4 mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-cherish-dark">Target User:</span>
                                <span className="text-cherish-gray-700">{item.targetUser}</span>
                              </div>
                              <div className="text-sm text-cherish-gray-700">
                                <strong>Content:</strong> {item.content}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-6">
                            <button className="p-2 text-cherish-gray-500 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-gray-50">
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            {item.status === 'pending' && (
                              <>
                                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors font-medium text-sm">
                                  Resolve
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                                  Dismiss
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredItems.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-cherish-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-8 h-8 text-cherish-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-cherish-dark mb-2">
                        No Reports Found
                      </h3>
                      <p className="text-cherish-gray-600">
                        There are no reported items in this category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}
