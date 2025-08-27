'use client'

import { useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

interface TooltipProps {
  content: string
  children?: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function Tooltip({ content, children, position = 'top', size = 'xs', maxWidth = 'xs' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Position classes - improved for better horizontal placement
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-3',
  }

  // Arrow classes - improved styling
  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-cherish-dark',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-cherish-dark',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-cherish-dark',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-cherish-dark',
  }

  // Size classes - improved with xs option and better spacing
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] leading-tight',
    sm: 'px-2 py-1 text-xs leading-relaxed',
    md: 'px-3 py-2 text-sm leading-relaxed',
    lg: 'px-4 py-3 text-base leading-relaxed',
  }

  // Max width classes for better control
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help transition-colors duration-200"
      >
        {children || (
          <InformationCircleIcon className="info-icon" />
        )}
      </div>
      
      {isVisible && (
        <div 
          className={`
            absolute z-50 text-white bg-cherish-dark rounded-xl shadow-medium
            ${positionClasses[position]}
            ${sizeClasses[size]}
            ${maxWidthClasses[maxWidth]}
            transition-all duration-200 ease-out
            backdrop-blur-sm bg-opacity-95
          `}
          style={{ 
            animation: 'fadeInScale 0.15s ease-out',
          }}
        >
          <div className="font-normal leading-tight">
            {content}
          </div>
          
          {/* Arrow - smaller for better UX */}
          <div
            className={`
              absolute w-0 h-0 ${size === 'xs' ? 'border-2' : 'border-3'}
              ${arrowClasses[position]}
            `}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.92) translate(var(--tw-translate-x), var(--tw-translate-y));
          }
          to {
            opacity: 1;
            transform: scale(1) translate(var(--tw-translate-x), var(--tw-translate-y));
          }
        }
      `}</style>
    </div>
  )
}
