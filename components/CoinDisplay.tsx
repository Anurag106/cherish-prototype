'use client'

import { CurrencyDollarIcon, ShoppingCartIcon, BanknotesIcon } from '@heroicons/react/24/outline'

interface CoinDisplayProps {
  amount: number
  type?: 'coin' | 'cart' | 'money'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export default function CoinDisplay({ amount, type = 'coin', size = 'md', animated = false }: CoinDisplayProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }

  const getIcon = () => {
    switch (type) {
      case 'cart':
        return <ShoppingCartIcon className={iconSizeClasses[size]} />
      case 'money':
        return <BanknotesIcon className={iconSizeClasses[size]} />
      default:
        return <CurrencyDollarIcon className={iconSizeClasses[size]} />
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br from-cherish-yellow via-cherish-yellow-mono to-cherish-yellow-dark 
        rounded-full flex items-center justify-center text-cherish-dark font-bold 
        shadow-lg border-2 border-cherish-yellow-light
        ${animated ? 'animate-pulse hover:animate-bounce' : ''}
        transition-all duration-300 hover:scale-110 hover:shadow-xl
      `}>
        {getIcon()}
      </div>
      <span className={`
        font-bold text-cherish-dark 
        ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'}
        ${animated ? 'animate-pulse' : ''}
      `}>
        {amount.toLocaleString()}
      </span>
    </div>
  )
}
