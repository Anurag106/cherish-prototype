'use client'

import { Switch } from '@headlessui/react'
import { clsx } from 'clsx'

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
  description?: string
  className?: string
}

export default function Toggle({ 
  enabled, 
  onChange, 
  label, 
  description, 
  className 
}: ToggleProps) {
  return (
    <Switch.Group as="div" className={clsx("flex items-center", className)}>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={clsx(
          enabled ? 'bg-yellow-400' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
        )}
      >
        <span className="sr-only">Toggle setting</span>
        <span
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      {(label || description) && (
        <Switch.Label as="div" className="ml-3 cursor-pointer">
          {label && (
            <div className="text-sm font-medium text-gray-900">{label}</div>
          )}
          {description && (
            <div className="text-sm text-gray-500">{description}</div>
          )}
        </Switch.Label>
      )}
    </Switch.Group>
  )
}
