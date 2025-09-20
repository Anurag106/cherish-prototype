'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { Transition } from '@headlessui/react'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }
    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration (default 5 seconds)
    const duration = notification.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const showSuccess = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message, duration: 7000 })
  }

  const showWarning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message, duration: 6000 })
  }

  const showInfo = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message })
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

interface NotificationItemProps {
  notification: Notification
  onRemove: (id: string) => void
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleRemove = () => {
    setShow(false)
    setTimeout(() => onRemove(notification.id), 300)
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-brand-500" />
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-primary-900" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-primary-600" />
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-brand-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-brand-50 border-brand-200'
      case 'error':
        return 'bg-primary-50 border-primary-200'
      case 'warning':
        return 'bg-primary-100 border-primary-300'
      case 'info':
        return 'bg-brand-50 border-brand-200'
    }
  }

  const getTitleColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-brand-700'
      case 'error':
        return 'text-primary-900'
      case 'warning':
        return 'text-primary-800'
      case 'info':
        return 'text-brand-700'
    }
  }

  const getMessageColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-brand-600'
      case 'error':
        return 'text-primary-700'
      case 'warning':
        return 'text-primary-700'
      case 'info':
        return 'text-brand-600'
    }
  }

  return (
    <Transition
      show={show}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`${getBackgroundColor()} border rounded-2xl shadow-lg p-4 max-w-sm w-full`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-semibold ${getTitleColor()}`}>
              {notification.title}
            </p>
            {notification.message && (
              <p className={`mt-1 text-sm ${getMessageColor()}`}>
                {notification.message}
              </p>
            )}
            {notification.action && (
              <div className="mt-3">
                <button
                  onClick={notification.action.onClick}
                  className={`text-sm font-medium underline hover:no-underline ${getTitleColor()}`}
                >
                  {notification.action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleRemove}
              className={`rounded-md inline-flex text-primary-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 hover:scale-110 transition-all duration-200`}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}
