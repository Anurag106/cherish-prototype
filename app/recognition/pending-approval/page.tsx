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
  EyeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  PhotoIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function PendingApprovalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Mock data for pending approvals with more detailed information
  const pendingItems = [
    {
      id: '1',
      date: '03/19/2021',
      award: 'Barketing: Conference Attendance',
      recipients: ['Pep E'],
      amount: 30,
      status: 'pending',
      requestedBy: 'Aunt R',
      claimReason: 'Attended the annual marketing conference and presented our new strategy to industry leaders.',
      approvalProcess: [
        { name: 'Maverick D', status: 'approved', date: '03/19/2021' },
        { name: 'Current User', status: 'pending', date: null }
      ],
      reviewLog: [
        { action: 'Approved by Maverick D', date: '03/19/2021' },
        { action: 'Pending review', date: '03/19/2021' }
      ],
      attachments: [
        { type: 'image', name: 'conference_certificate.jpg' }
      ]
    },
    {
      id: '2', 
      date: '03/19/2021',
      award: 'Weekly Sales Challenge Winner',
      recipients: ['Elwood E'],
      amount: 10,
      status: 'pending',
      requestedBy: 'Aunt R',
      claimReason: 'Exceeded weekly sales target by 150% and helped onboard 3 new clients.',
      approvalProcess: [
        { name: 'Maverick D', status: 'pending', date: null }
      ],
      reviewLog: [
        { action: 'Pending review', date: '03/19/2021' }
      ],
      attachments: []
    },
    {
      id: '3',
      date: '03/19/2021', 
      award: 'Customer Feedback Champion',
      recipients: ['Fig D'],
      amount: 10,
      status: 'pending',
      requestedBy: 'Aunt R',
      claimReason: 'Received outstanding customer feedback scores for Q1 and implemented 5 process improvements.',
      approvalProcess: [
        { name: 'Amanda Godin', status: 'pending', date: null }
      ],
      reviewLog: [
        { action: 'Pending review', date: '03/19/2021' }
      ],
      attachments: [
        { type: 'document', name: 'feedback_report.pdf' }
      ]
    }
  ]

  const awardTypes = ['All', 'Barketing: Conference Attendance', 'Weekly Sales Challenge Winner', 'Customer Feedback Champion']

  const filteredItems = selectedFilter === 'All' 
    ? pendingItems 
    : pendingItems.filter(item => item.award === selectedFilter)

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
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

                {/* Filter Dropdown */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-primary-700">Awards:</label>
                    <select 
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="form-select w-48"
                    >
                      {awardTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pending Awards Table */}
                <div className="bg-white rounded-2xl border border-primary-200 shadow-soft overflow-hidden">
                  <div className="p-6 border-b border-primary-200">
                    <h2 className="text-xl font-bold text-primary-900">Pending Awards</h2>
                  </div>
                  
                  {/* Table Header */}
                  <div className="bg-primary-50 px-6 py-3 border-b border-primary-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-primary-700">
                      <div className="col-span-1"></div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-3">Award</div>
                      <div className="col-span-2">Recipient(s)</div>
                      <div className="col-span-1">Amount</div>
                      <div className="col-span-3">Approve or Deny</div>
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-primary-200">
                    {filteredItems.map((item) => (
                      <div key={item.id}>
                        {/* Main Row */}
                        <div className="px-6 py-4 hover:bg-primary-50 transition-colors">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Expand Button */}
                            <div className="col-span-1">
                              <button
                                onClick={() => toggleExpanded(item.id)}
                                className="p-1 hover:bg-primary-100 rounded transition-colors"
                              >
                                {expandedItems.includes(item.id) ? (
                                  <ChevronDownIcon className="w-4 h-4 text-primary-600" />
                                ) : (
                                  <ChevronRightIcon className="w-4 h-4 text-primary-600" />
                                )}
                              </button>
                            </div>
                            
                            {/* Date */}
                            <div className="col-span-2">
                              <span className="text-sm text-primary-900">{item.date}</span>
                            </div>
                            
                            {/* Award */}
                            <div className="col-span-3">
                              <span className="text-sm text-primary-900 font-medium">{item.award}</span>
                            </div>
                            
                            {/* Recipients */}
                            <div className="col-span-2">
                              <div className="flex items-center space-x-2">
                                {item.recipients.map((recipient, index) => (
                                  <span key={index} className="text-sm text-brand-600 hover:text-brand-700 cursor-pointer">
                                    {recipient}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Amount */}
                            <div className="col-span-1">
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-medium text-primary-900">{item.amount}</span>
                                <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-white">●</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="col-span-3">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 bg-green-500 hover:bg-green-600 rounded transition-colors">
                                  <CheckCircleIcon className="w-4 h-4 text-white" />
                                </button>
                                <button className="p-2 bg-red-500 hover:bg-red-600 rounded transition-colors">
                                  <XCircleIcon className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded Details */}
                        {expandedItems.includes(item.id) && (
                          <div className="px-6 py-4 bg-primary-25 border-t border-primary-200">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Claim Reason */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary-900 mb-2">CLAIM REASON</h4>
                                <p className="text-sm text-primary-700">{item.claimReason}</p>
                                <div className="mt-2 text-xs text-primary-600">
                                  <strong>AWARD REQUESTED BY:</strong> {item.requestedBy}
                                </div>
                              </div>
                              
                              {/* Attachments */}
                              {item.attachments.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-primary-900 mb-2">ATTACHMENT</h4>
                                  {item.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded border">
                                      {attachment.type === 'image' ? (
                                        <PhotoIcon className="w-4 h-4 text-blue-500" />
                                      ) : (
                                        <DocumentIcon className="w-4 h-4 text-red-500" />
                                      )}
                                      <span className="text-sm text-primary-700">{attachment.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Approval Process & Review Log */}
                              <div>
                                <h4 className="text-sm font-semibold text-primary-900 mb-2">APPROVAL PROCESS</h4>
                                <div className="space-y-1 mb-4">
                                  {item.approvalProcess.map((approver, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-sm">
                                      <UserIcon className="w-3 h-3 text-primary-500" />
                                      <span className="text-primary-700">{approver.name}</span>
                                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                                        approver.status === 'approved' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-amber-100 text-amber-800'
                                      }`}>
                                        {approver.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                
                                <h4 className="text-sm font-semibold text-primary-900 mb-2">REVIEW LOG</h4>
                                <div className="space-y-1">
                                  {item.reviewLog.map((log, index) => (
                                    <div key={index} className="text-xs text-primary-600">
                                      ({index + 1}) {log.action} on {log.date}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {filteredItems.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-8 h-8 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">
                        All Caught Up!
                      </h3>
                      <p className="text-primary-600">
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
