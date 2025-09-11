'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CherishLogo from './CherishLogo'
import {
  HomeIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  UsersIcon,
  TrophyIcon,
  DocumentChartBarIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CogIcon,
  CreditCardIcon,
  ClockIcon,
  GiftIcon,
  WrenchScrewdriverIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  FlagIcon,
} from '@heroicons/react/24/outline'

interface MenuItem {
  id: string
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/admin',
    icon: ChartBarIcon,
  },
  {
    id: 'company',
    name: 'Company',
    icon: BuildingOfficeIcon,
    children: [
      {
        id: 'account-settings',
        name: 'Account settings',
        href: '/company/account-settings',
        icon: CogIcon,
      },
      {
        id: 'integrations',
        name: 'Integrations',
        href: '/company/integrations',
        icon: WrenchScrewdriverIcon,
      },
      {
        id: 'plans-billing',
        name: 'Plans & billing',
        href: '/company/plans-billing',
        icon: CreditCardIcon,
      },
      {
        id: 'billing-history',
        name: 'Billing history',
        href: '/company/billing-history',
        icon: ClockIcon,
      },
      {
        id: 'rewards-catalog',
        name: 'Rewards catalog',
        href: '/company/rewards-catalog',
        icon: GiftIcon,
      },
      {
        id: 'program-settings',
        name: 'Program settings',
        href: '/company/program-settings',
        icon: CogIcon,
      },
    ],
  },
  {
    id: 'users',
    name: 'Users',
    href: '/users',
    icon: UsersIcon,
  },
  {
    id: 'recognition',
    name: 'Recognition',
    icon: TrophyIcon,
    children: [
      {
        id: 'peer-to-peer',
        name: 'Peer to Peer',
        href: '/recognition/peer-to-peer',
        icon: HeartIcon,
      },
      {
        id: 'celebration-awards',
        name: 'Celebration, Awards, Incentives',
        href: '/recognition/celebration-awards',
        icon: GiftIcon,
      },
      {
        id: 'pending-approval',
        name: 'Pending Approval',
        href: '/recognition/pending-approval',
        icon: ClipboardDocumentListIcon,
      },
      {
        id: 'reported',
        name: 'Reported',
        href: '/recognition/reported',
        icon: FlagIcon,
      },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    href: '/reports',
    icon: DocumentChartBarIcon,
  },
  {
    id: 'whats-new',
    name: "What's new",
    href: '/whats-new',
    icon: SparklesIcon,
  },
  {
    id: 'help-support',
    name: 'Help and support',
    href: '/help-support',
    icon: QuestionMarkCircleIcon,
  },
]

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
  isCollapsed?: boolean
  onCollapsedToggle?: () => void
}

export default function Sidebar({ isOpen = true, onToggle, isCollapsed = false, onCollapsedToggle }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['company', 'recognition'])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const itemIsActive = item.href ? isActive(item.href) : false

    if (hasChildren) {
      return (
        <div key={item.id} className="mb-1">
          <div className="relative group">
            <button
              onClick={() => !isCollapsed && toggleExpanded(item.id)}
              className={`sidebar-item group w-full text-left ${depth > 0 && !isCollapsed ? 'pl-10' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <item.icon className={`sidebar-icon ${isCollapsed ? 'mx-auto' : 'mr-3'} group-hover:text-white`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4 text-cherish-yellow-mono group-hover:text-white transition-transform duration-200" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-cherish-yellow-mono group-hover:text-white transition-transform duration-200" />
                  )}
                </>
              )}
            </button>
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50 px-2 py-1 bg-cherish-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {item.name}
              </div>
            )}
          </div>
          
          {!isCollapsed && isExpanded && item.children && (
            <div className="mt-1 space-y-1 ml-2">
              {item.children.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <div key={item.id} className="relative group mb-1">
        <Link
          href={item.href || '#'}
          className={`sidebar-item group block ${
            itemIsActive ? 'active' : ''
          } ${depth > 0 && !isCollapsed ? 'pl-10' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <item.icon className={`sidebar-icon ${isCollapsed ? 'mx-auto' : 'mr-3'} group-hover:text-white group-active:text-cherish-dark`} />
          {!isCollapsed && <span>{item.name}</span>}
        </Link>
        
        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50 px-2 py-1 bg-cherish-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {item.name}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        ${isCollapsed ? 'w-16' : 'w-60'} bg-sidebar-bg backdrop-blur-xl flex flex-col
        transform transition-all duration-500 ease-in-out
        lg:translate-x-0 border-r border-cherish-gray-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onToggle}
            className="text-sidebar-text hover:text-white transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Logo Section with Collapse Toggle */}
        <div className={`${isCollapsed ? 'p-3' : 'p-6'} border-b border-cherish-gray-700 transition-all duration-300`}>
          <div className="flex items-center justify-between mb-6">
            <CherishLogo variant={isCollapsed ? 'compact' : 'sidebar'} className={isCollapsed ? 'mx-auto' : ''} />
            {!isCollapsed && onCollapsedToggle && (
              <button
                onClick={onCollapsedToggle}
                className="hidden lg:block p-2 text-sidebar-text hover:text-white transition-colors duration-200 rounded-xl hover:bg-sidebar-active"
                aria-label="Collapse sidebar"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Collapse/Expand Toggle when collapsed */}
          {isCollapsed && onCollapsedToggle && (
            <div className="hidden lg:block mb-6">
              <button
                onClick={onCollapsedToggle}
                className="w-full p-2 text-sidebar-text hover:text-white transition-colors duration-200 rounded-xl hover:bg-sidebar-active flex items-center justify-center"
                aria-label="Expand sidebar"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {!isCollapsed && (
            <Link
              href="/"
              className="btn-primary w-full text-center block text-sm"
            >
              Go to Home
            </Link>
          )}
        </div>

        {/* Admin Badge */}
        <div className={`${isCollapsed ? 'px-3' : 'px-6'} py-3 bg-cherish-gray-800/20 transition-all duration-300`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
            <div className="w-2 h-2 bg-cherish-yellow rounded-full"></div>
            {!isCollapsed && (
              <span className="text-sidebar-text text-xs font-medium uppercase tracking-wide">Admin Panel</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`sidebar-nav flex-1 ${isCollapsed ? 'px-2' : 'px-3'} py-4 overflow-y-auto transition-all duration-300`}>
          <div className="space-y-1">
            {menuItems.map(item => renderMenuItem(item))}
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-cherish-gray-700">
            <div className="text-xs text-cherish-gray-400 text-center">
              <div className="font-medium">Cherish v1.0</div>
              <div className="mt-1">Employee Recognition Platform</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
