'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'

interface MobileHeaderProps {
  onMenuToggle: () => void
  title: string
}

export default function MobileHeader({ onMenuToggle, title }: MobileHeaderProps) {
  return (
    <div className="lg:hidden bg-white shadow-soft border-b border-cherish-gray-200 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
      <button
        onClick={onMenuToggle}
        className="text-cherish-gray-600 hover:text-cherish-dark transition-colors duration-200 p-2 -ml-2 rounded-xl hover:bg-cherish-gray-100"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <h1 className="text-lg font-bold text-cherish-dark">{title}</h1>
      <div className="w-10 h-10 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>
  )
}
