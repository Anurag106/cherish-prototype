'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { NotificationProvider } from '@/components/NotificationSystem'
import { 
  ClipboardDocumentListIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function PendingApprovalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock data for pending approvals
  const pendingItems = [
    {
      id: '1',
      type: 'Recognition',
      from: 'John Doe',
      to: 'Sarah Wilson',
      amount: 25,
      message: 'Excellent work on the quarterly presentation!',
      date: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'Reward Redemption',
      from: 'Mike Johnson',
      to: 'System',
      amount: 500,
      message: 'Amazon Gift Card - $50',
      date: '1 day ago',
      status: 'pending'
    }
  ]

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
            title="Pending Approval"
          />
          
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-8">
              <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="mb-8 hidden lg:block">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-cherish-yellow to-primary-500 rounded-3xl flex items-center justify-center shadow-medium">
                        <ClipboardDocumentListIcon className="w-8 h-8 text-cherish-dark" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cherish-yellow rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-cherish-dark mb-2">
                        Pending Approval
                      </h1>
                      <p className="text-xl text-cherish-gray-600">
                        Review and approve recognition posts and reward redemptions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="mb-6 lg:hidden">
                  <h1 className="text-2xl font-bold text-cherish-dark mb-2">
                    Pending Approval
                  </h1>
                  <p className="text-cherish-gray-600">
                    Review pending items
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <ClockIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">2</div>
                        <div className="text-sm text-cherish-gray-600">Pending Items</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">15</div>
                        <div className="text-sm text-cherish-gray-600">Approved Today</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-soft border border-cherish-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cherish-dark">1</div>
                        <div className="text-sm text-cherish-gray-600">Rejected Today</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pending Items */}
                <div className="bg-white rounded-3xl border border-cherish-gray-200 shadow-soft">
                  <div className="p-6 border-b border-cherish-gray-200">
                    <h2 className="text-xl font-bold text-cherish-dark">Items Awaiting Approval</h2>
                    <p className="text-cherish-gray-600 mt-1">Review and take action on pending items</p>
                  </div>
                  
                  <div className="divide-y divide-cherish-gray-200">
                    {pendingItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-cherish-yellow rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-cherish-dark">
                                  {item.from.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-cherish-dark">
                                  {item.type}
                                </div>
                                <div className="text-sm text-cherish-gray-600">
                                  {item.from} → {item.to} • {item.date}
                                </div>
                              </div>
                              <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                                Pending
                              </div>
                            </div>
                            
                            <div className="bg-cherish-gray-50 rounded-2xl p-4 mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-cherish-dark">Amount:</span>
                                <span className="font-bold text-cherish-yellow-mono">
                                  {item.amount} points
                                </span>
                              </div>
                              <div className="text-sm text-cherish-gray-700">
                                <strong>Message:</strong> {item.message}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-6">
                            <button className="p-2 text-cherish-gray-500 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-gray-50">
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors font-medium text-sm">
                              Approve
                            </button>
                            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium text-sm">
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {pendingItems.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-cherish-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-8 h-8 text-cherish-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-cherish-dark mb-2">
                        All Caught Up!
                      </h3>
                      <p className="text-cherish-gray-600">
                        There are no items pending approval at this time.
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
