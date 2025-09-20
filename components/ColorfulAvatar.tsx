'use client'

interface ColorfulAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const avatarColors = [
  'bg-red-500',
  'bg-orange-500', 
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500'
]

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl'
}

function getColorFromName(name: string): string {
  // Create a simple hash from the name
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // Use the hash to pick a color
  const colorIndex = Math.abs(hash) % avatarColors.length
  return avatarColors[colorIndex]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function ColorfulAvatar({ name, size = 'md', className = '' }: ColorfulAvatarProps) {
  const colorClass = getColorFromName(name)
  const initials = getInitials(name)
  const sizeClass = sizeClasses[size]

  return (
    <div 
      className={`${colorClass} ${sizeClass} rounded-2xl flex items-center justify-center text-white font-bold shadow-sm hover:scale-105 transition-all duration-200 ${className}`}
    >
      {initials}
    </div>
  )
}
