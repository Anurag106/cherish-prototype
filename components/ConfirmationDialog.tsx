'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'

export interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
  icon?: 'trash' | 'warning' | 'question'
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  icon = 'warning'
}: ConfirmationDialogProps) {
  
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getIconComponent = () => {
    switch (icon) {
      case 'trash':
        return <TrashIcon className="h-6 w-6" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6" />
      case 'question':
        return <ExclamationTriangleIcon className="h-6 w-6" />
      default:
        return <ExclamationTriangleIcon className="h-6 w-6" />
    }
  }

  const getIconColors = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-100 text-red-600'
      case 'warning':
        return 'bg-amber-100 text-amber-600'
      case 'info':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-red-100 text-red-600'
    }
  }

  const getConfirmButtonColors = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      default:
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-xl transition-all border border-cherish-gray-200">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${getIconColors()}`}>
                    {getIconComponent()}
                  </div>
                  
                  <div className="flex-1">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-cherish-dark mb-2"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="text-sm text-cherish-gray-600 leading-relaxed">
                      {message}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-3 justify-end">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                  <button
                    type="button"
                    className={`inline-flex justify-center rounded-2xl border border-transparent px-6 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-0.5 ${getConfirmButtonColors()}`}
                    onClick={handleConfirm}
                  >
                    {confirmText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
