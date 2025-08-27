'use client'

import React from 'react'
import Link from 'next/link'

interface CherishLogoProps {
  variant?: 'default' | 'sidebar' | 'compact'
  className?: string
}

export default function CherishLogo({ variant = 'default', className = '' }: CherishLogoProps) {
  const logoContent = (
    <div className={`flex items-center ${variant === 'compact' ? 'justify-center' : 'space-x-3'} ${className}`}>
      {/* Fun Logo Icon */}
      <div className="relative">
        <div className={`${variant === 'compact' ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-cherish-yellow via-yellow-300 to-orange-400 rounded-2xl flex items-center justify-center shadow-soft transition-all duration-300 hover:rotate-12 hover:scale-110`}>
          {/* Fun smiley face with heart eyes for "cherish" */}
          <svg
            viewBox="0 0 24 24"
            className={`${variant === 'compact' ? 'w-4 h-4' : 'w-6 h-6'} text-cherish-dark`}
            fill="currentColor"
          >
            {/* Smiley face */}
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            {/* Heart eyes */}
            <path d="M8.5 8.5c-.8 0-1.5.7-1.5 1.5 0 1 1.5 2 1.5 2s1.5-1 1.5-2c0-.8-.7-1.5-1.5-1.5z" fill="currentColor"/>
            <path d="M15.5 8.5c-.8 0-1.5.7-1.5 1.5 0 1 1.5 2 1.5 2s1.5-1 1.5-2c0-.8-.7-1.5-1.5-1.5z" fill="currentColor"/>
            {/* Smile */}
            <path d="M8 15s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        {/* Multiple sparkle accents for fun */}
        {variant !== 'compact' && (
          <>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cherish-yellow rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          </>
        )}
        {/* Single sparkle for compact mode */}
        {variant === 'compact' && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        )}
      </div>
      
      {/* Logo Text */}
      {variant !== 'compact' && (
        <div className={`flex flex-col ${variant === 'sidebar' ? 'text-center' : ''}`}>
          <div className={`font-bold tracking-tight ${
            variant === 'sidebar' 
              ? 'text-xl text-white' 
              : 'text-2xl text-cherish-dark'
          }`}>
            cherish
          </div>
          {variant === 'default' && (
            <div className="text-xs font-medium text-cherish-gray-500 tracking-wider uppercase text-center">
              Employee Recognition
            </div>
          )}
        </div>
      )}

    </div>
  )

  if (variant === 'sidebar') {
    return (
      <Link href="/" className="block transition-transform duration-300 hover:scale-105">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
