'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'

interface MobileHeaderProps {
  onMenuToggle: () => void
  title: string
}

export default function MobileHeader({ onMenuToggle, title }: MobileHeaderProps) {
  return (
    <div className="lg:hidden bg-white shadow-soft border-b border-primary-200 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
      <button
        onClick={onMenuToggle}
        className="text-primary-600 hover:text-primary-900 transition-all duration-200 p-2 -ml-2 rounded-xl hover:bg-primary-100 hover:scale-105"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <h1 className="text-lg font-bold text-primary-900">{title}</h1>
      <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center shadow-soft hover:scale-105 transition-all duration-200">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
