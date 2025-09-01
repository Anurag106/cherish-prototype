'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import Link from 'next/link'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
          title="Dashboard"
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="mb-12 hidden lg:block">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-cherish-yellow to-primary-500 rounded-3xl flex items-center justify-center shadow-medium">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-cherish-dark" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-cherish-yellow rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-cherish-dark mb-2">
                      Dashboard
                    </h1>
                    <p className="text-xl text-cherish-gray-600">
                      Your employee recognition platform overview
                    </p>
                  </div>
                </div>
              </div>

              {/* Getting Started Card */}
              <div className="settings-card mb-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="settings-subheader mb-1">
                      Getting Started
                    </h2>
                    <p className="text-sm text-cherish-gray-600">Set up your platform for success</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cherish-yellow-light to-white p-8 rounded-3xl border border-cherish-yellow mb-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-cherish-dark" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-cherish-dark mb-4">
                        Configure Your Account
                      </h3>
                      <p className="text-cherish-gray-700 mb-6 leading-relaxed text-lg">
                        Welcome to your employee recognition platform! Get started by configuring your account settings, customizing your interface, and setting up email templates to create an engaging experience for your team.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href="/company/account-settings"
                          className="btn-primary inline-flex items-center justify-center"
                        >
                          <span className="flex items-center space-x-2">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                              <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                            </svg>
                            <span>Configure Account Settings</span>
                          </span>
                        </Link>
                        <Link
                          href="/"
                          className="bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono hover:from-cherish-yellow-mono hover:to-cherish-yellow text-cherish-dark font-semibold px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                        >
                          <span className="flex items-center space-x-2">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                            </svg>
                            <span>Go to Home Feed</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-cherish-gray-200 shadow-soft hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
                          <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-cherish-dark">Analytics</h3>
                    </div>
                    <p className="text-sm text-cherish-gray-600">Track recognition trends and employee engagement metrics</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-cherish-gray-200 shadow-soft hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600" fill="currentColor">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6Z"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-cherish-dark">Team</h3>
                    </div>
                    <p className="text-sm text-cherish-gray-600">Manage users, departments, and recognition permissions</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-cherish-gray-200 shadow-soft hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-yellow-mono" fill="currentColor">
                          <path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C21.83,8 22.54,8.5 22.84,9.22C23.03,9.64 23.03,10.14 22.84,10.56L19.84,17.47C19.54,18.19 18.83,18.69 18,18.69H9.69C9.31,18.69 8.95,18.56 8.65,18.26L7,16.61V21A2,2 0 0,1 9,21Z"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-cherish-dark">Recognition</h3>
                    </div>
                    <p className="text-sm text-cherish-gray-600">View and manage employee recognition posts and rewards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
