'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon, 
  UserIcon, 
  PlusIcon, 
  HashtagIcon,
  GlobeAltIcon,
  FaceSmileIcon,
  GifIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface RecognitionModalProps {
  isOpen: boolean
  onClose: () => void
  availablePoints: number
}

export default function RecognitionModal({ isOpen, onClose, availablePoints }: RecognitionModalProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [message, setMessage] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'team' | 'private'>('public')

  const handleSubmit = () => {
    // Handle form submission
    console.log({ recipient, amount, hashtag, message, visibility })
    onClose()
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center shadow-lg">
                      <CurrencyDollarIcon className="w-6 h-6 text-cherish-dark" />
                    </div>
                    <h3 className="text-2xl font-bold text-cherish-dark">Give recognition</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-cherish-yellow-light px-4 py-2 rounded-xl">
                      <div className="w-6 h-6 bg-cherish-yellow-mono rounded-full flex items-center justify-center">
                        <CurrencyDollarIcon className="w-4 h-4 text-cherish-dark" />
                      </div>
                      <span className="font-bold text-cherish-dark">{availablePoints}</span>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-cherish-gray-100 rounded-xl transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6 text-cherish-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                  {/* Input Fields Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Recipient */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-cherish-gray-700">
                        <UserIcon className="w-4 h-4" />
                        <span>Recipient</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          placeholder="@username"
                          className="w-full px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow transition-all"
                        />
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-cherish-gray-700">
                        <PlusIcon className="w-4 h-4" />
                        <span>Amount</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="+10"
                          className="w-full px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow transition-all"
                        />
                      </div>
                    </div>

                    {/* Hashtag */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-cherish-gray-700">
                        <HashtagIcon className="w-4 h-4" />
                        <span>Hashtag</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={hashtag}
                          onChange={(e) => setHashtag(e.target.value)}
                          placeholder="#teamwork"
                          className="w-full px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visibility Options */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-cherish-gray-700">Visibility</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setVisibility('public')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          visibility === 'public'
                            ? 'border-cherish-yellow bg-cherish-yellow-light text-cherish-dark'
                            : 'border-cherish-gray-200 bg-white text-cherish-gray-600 hover:border-cherish-yellow-light'
                        }`}
                      >
                        <GlobeAltIcon className="w-5 h-5 mx-auto mb-2" />
                        <span className="text-sm font-medium">Public</span>
                      </button>
                      
                      <button
                        onClick={() => setVisibility('team')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          visibility === 'team'
                            ? 'border-cherish-yellow bg-cherish-yellow-light text-cherish-dark'
                            : 'border-cherish-gray-200 bg-white text-cherish-gray-600 hover:border-cherish-yellow-light'
                        }`}
                      >
                        <UserIcon className="w-5 h-5 mx-auto mb-2" />
                        <span className="text-sm font-medium">Only Team</span>
                      </button>
                      
                      <button
                        onClick={() => setVisibility('private')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          visibility === 'private'
                            ? 'border-cherish-yellow bg-cherish-yellow-light text-cherish-dark'
                            : 'border-cherish-gray-200 bg-white text-cherish-gray-600 hover:border-cherish-yellow-light'
                        }`}
                      >
                        <XMarkIcon className="w-5 h-5 mx-auto mb-2" />
                        <span className="text-sm font-medium">Private</span>
                      </button>
                    </div>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="@kumar.samaksha +10 for helping me launch a marketing campaign so that we can generate new business #debate-decide-commit"
                      rows={4}
                      className="w-full px-4 py-4 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow resize-none text-lg transition-all"
                    />
                    

                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-4">
                      <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
                        <FaceSmileIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-yellow" />
                      </button>
                      <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
                        <GifIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-purple" />
                      </button>
                      <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
                        <PhotoIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-green" />
                      </button>
                      <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
                        <EllipsisHorizontalIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-orange" />
                      </button>
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono hover:from-cherish-yellow-mono hover:to-cherish-yellow text-cherish-dark font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Give recognition
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
