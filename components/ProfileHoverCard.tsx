'use client'

import { useState } from 'react'
import { MapPinIcon, BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import ColorfulAvatar from './ColorfulAvatar'

interface ProfileHoverCardProps {
  name: string
  username: string
  location?: string
  department?: string
  avatar: string
  stats: {
    given: number
    received: number
  }
  children: React.ReactNode
}

export default function ProfileHoverCard({ 
  name, 
  username, 
  location, 
  department, 
  avatar, 
  stats, 
  children 
}: ProfileHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {isHovered && (
        <div className="absolute z-50 w-80 p-6 bg-white rounded-2xl shadow-2xl border border-primary-200 top-full left-0 mt-2 transform animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="relative">
              <ColorfulAvatar name={name} size="xl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-points-green rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-900">{name}</h3>
              <p className="text-primary-600 font-medium">{username}</p>
              <button className="mt-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 text-sm hover:scale-105">
                Follow
              </button>
            </div>
          </div>

          {/* Location & Department */}
          <div className="space-y-2 mb-4">
            {location && (
              <div className="flex items-center space-x-2 text-primary-600">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm">{location}</span>
              </div>
            )}
            {department && (
              <div className="flex items-center space-x-2 text-primary-600">
                <BuildingOfficeIcon className="w-4 h-4" />
                <span className="text-sm">{department}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="border-t border-primary-200 pt-4">
            <p className="text-sm font-semibold text-primary-700 mb-3">Last 60 days</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-primary-600">You gave</p>
                <p className="text-2xl font-bold text-primary-900">{stats.given}</p>
              </div>
              <div>
                <p className="text-sm text-primary-600">You received</p>
                <p className="text-2xl font-bold text-primary-900">{stats.received}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-4 bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
            <CurrencyDollarIcon className="w-5 h-5" />
            <span>Give Recognition</span>
          </button>
        </div>
      )}
    </div>
  )
}
