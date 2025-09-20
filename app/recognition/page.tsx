'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import { NotificationProvider } from '@/components/NotificationSystem'
import { 
  TrophyIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function RecognitionPage() {
  const router = useRouter()

  const recognitionOptions = [
    {
      id: 'peer-to-peer',
      title: 'Peer-to-Peer Recognition',
      description: 'Configure peer-to-peer recognition settings, points allowances, and give amounts.',
      icon: StarIcon,
      color: 'bg-blue-500',
      href: '/recognition/peer-to-peer'
    },
    {
      id: 'celebration-awards',
      title: 'Celebration Awards',
      description: 'Manage celebration awards and special recognition programs.',
      icon: TrophyIcon,
      color: 'bg-yellow-500',
      href: '/recognition/celebration-awards'
    },
    {
      id: 'pending-approval',
      title: 'Pending Approval',
      description: 'Review and approve pending recognition requests and awards.',
      icon: ClipboardDocumentListIcon,
      color: 'bg-orange-500',
      href: '/recognition/pending-approval'
    },
    {
      id: 'reported',
      title: 'Reported Content',
      description: 'Review and manage reported recognition posts and content.',
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      href: '/recognition/reported'
    }
  ]

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-primary-50">
        <Sidebar 
          isOpen={true} 
          onToggle={() => {}} 
          isCollapsed={false}
          onCollapsedToggle={() => {}}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileHeader onMenuToggle={() => {}} title="Recognition Management" />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-50">
            <div className="container mx-auto px-6 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-900 mb-2">Recognition Management</h1>
                <p className="text-primary-600">
                  Manage all aspects of your employee recognition program from peer-to-peer recognition to celebration awards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recognitionOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => router.push(option.href)}
                    className="bg-white rounded-3xl shadow-sm border border-primary-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${option.color} rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                        <option.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-sm text-primary-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 bg-white rounded-3xl shadow-sm border border-primary-200 p-6 hover:shadow-md transition-all duration-200">
                <h2 className="text-xl font-semibold text-primary-900 mb-6">Recognition Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-600 mb-1">1,247</div>
                    <div className="text-sm text-primary-600">Total Recognitions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-500 mb-1">89</div>
                    <div className="text-sm text-primary-600">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-700 mb-1">12</div>
                    <div className="text-sm text-primary-600">Pending Approval</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-800 mb-1">3</div>
                    <div className="text-sm text-primary-600">Reported Items</div>
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
