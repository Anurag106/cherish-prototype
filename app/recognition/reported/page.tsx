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
      date: '11/01/2024',
      name: 'Fla Silva',
      message: 'Giveaways points for getting you 3rd shortlisted',
      reportedBy: 'Amanda Godin',
      status: 'pending',
      severity: 'medium',
      postContent: 'Great work on the project! Here are some bonus points for your excellent performance.',
      reportReason: 'Inappropriate point distribution'
    },
    {
      id: '2',
      date: '11/01/2024', 
      name: 'Fla Silva',
      message: 'Giveaways points for getting you 3rd shortlisted',
      reportedBy: 'Amanda Godin',
      status: 'pending',
      severity: 'medium',
      postContent: 'Congratulations on making it to the final round! Keep up the great work.',
      reportReason: 'Spam or duplicate content'
    },
    {
      id: '3',
      date: '11/06/2024',
      name: 'Annual Security Training',
      message: 'GO Giveaways points for completing their annual security awareness training',
      reportedBy: 'Amanda Godin',
      status: 'pending',
      severity: 'low',
      postContent: 'Successfully completed the mandatory security training with 100% score.',
      reportReason: 'Automated point distribution issue'
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

                {/* Filter Dropdown */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-primary-700">Filter by:</label>
                    <select 
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="form-select w-48"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Reported Content Table */}
                <div className="bg-white rounded-2xl border border-primary-200 shadow-soft overflow-hidden">
                  <div className="p-6 border-b border-primary-200">
                    <h2 className="text-xl font-bold text-primary-900">Reported Content</h2>
                  </div>
                  
                  {/* Table Header */}
                  <div className="bg-primary-50 px-6 py-3 border-b border-primary-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-primary-700">
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Name</div>
                      <div className="col-span-4">Message</div>
                      <div className="col-span-2">Recipient(s)</div>
                      <div className="col-span-2">Approve or Deny</div>
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-primary-200">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="px-6 py-4 hover:bg-primary-50 transition-colors">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Date */}
                          <div className="col-span-2">
                            <span className="text-sm text-primary-900">{item.date}</span>
                          </div>
                          
                          {/* Name */}
                          <div className="col-span-2">
                            <span className="text-sm text-primary-900 font-medium">{item.name}</span>
                          </div>
                          
                          {/* Message */}
                          <div className="col-span-4">
                            <div className="text-sm text-primary-900">{item.message}</div>
                            <div className="text-xs text-primary-600 mt-1">
                              Reported by: <span className="text-brand-600">{item.reportedBy}</span>
                            </div>
                            <div className="text-xs text-red-600 mt-1">
                              Reason: {item.reportReason}
                            </div>
                          </div>
                          
                          {/* Recipients */}
                          <div className="col-span-2">
                            <span className="text-sm text-brand-600 hover:text-brand-700 cursor-pointer">
                              {item.reportedBy}
                            </span>
                          </div>
                          
                          {/* Actions */}
                          <div className="col-span-2">
                            <div className="flex items-center space-x-2">
                              <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors">
                                Remove Post
                              </button>
                              <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm font-medium transition-colors">
                                Discard Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredItems.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-8 h-8 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">
                        No Reports Found
                      </h3>
                      <p className="text-primary-600">
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
