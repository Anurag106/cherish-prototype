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
  CurrencyDollarIcon,
  TrophyIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  UsersIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import AwardsModal from './AwardsModal'

interface RecognitionModalProps {
  isOpen: boolean
  onClose: () => void
  availablePoints: number
}

export default function RecognitionModal({ isOpen, onClose, availablePoints }: RecognitionModalProps) {
  const [activeTab, setActiveTab] = useState<'recognize' | 'awards' | 'announcements'>('recognize')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [message, setMessage] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'team' | 'private'>('public')
  const [showAwardsModal, setShowAwardsModal] = useState(false)

  const handleSubmit = () => {
    console.log({ recipient, amount, hashtag, message, visibility })
    onClose()
  }

  const handleAwardsClick = () => {
    setShowAwardsModal(true)
    onClose()
  }

  const renderRecognizeTab = () => (
    <div className="space-y-6">
      {/* Message Input */}
      <div className="space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="@recipient +10 Great work on the project! #teamwork"
          rows={4}
          className="w-full px-4 py-4 bg-primary-50 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none text-base placeholder-primary-400 transition-all"
        />
        <p className="text-sm text-primary-500">
          Type @ to mention someone, + to add points, and # for hashtags
        </p>
      </div>

      {/* Visibility */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-primary-700">Who can see this?</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setVisibility('public')}
            className={`p-4 rounded-xl border-2 transition-all ${
              visibility === 'public'
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-primary-200 bg-white text-primary-600 hover:border-brand-300 hover:bg-brand-50'
            }`}
          >
            <GlobeAltIcon className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Public</span>
          </button>
          
          <button
            onClick={() => setVisibility('team')}
            className={`p-4 rounded-xl border-2 transition-all ${
              visibility === 'team'
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-primary-200 bg-white text-primary-600 hover:border-brand-300 hover:bg-brand-50'
            }`}
          >
            <UsersIcon className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Team</span>
          </button>
          
          <button
            onClick={() => setVisibility('private')}
            className={`p-4 rounded-xl border-2 transition-all ${
              visibility === 'private'
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-primary-200 bg-white text-primary-600 hover:border-brand-300 hover:bg-brand-50'
            }`}
          >
            <LockClosedIcon className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Private</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
        <div className="flex items-center space-x-3">
          <button className="p-3 hover:bg-primary-100 rounded-xl transition-colors group">
            <FaceSmileIcon className="w-5 h-5 text-primary-500 group-hover:text-brand-500" />
          </button>
          <button className="p-3 hover:bg-primary-100 rounded-xl transition-colors group">
            <GifIcon className="w-5 h-5 text-primary-500 group-hover:text-brand-500" />
          </button>
          <button className="p-3 hover:bg-primary-100 rounded-xl transition-colors group">
            <PhotoIcon className="w-5 h-5 text-primary-500 group-hover:text-brand-500" />
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
        >
          Give Recognition
        </button>
      </div>
    </div>
  )

  const renderAnnouncementsTab = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <SpeakerWaveIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-700 mb-2">Announcements</h3>
        <p className="text-secondary-500">Share important updates with your team</p>
        <button className="mt-4 bg-brand-500 hover:bg-brand-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105">
          Create Announcement
        </button>
      </div>
    </div>
  )

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-primary-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm">
                        <HeartIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary-900">Give Recognition</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-points-green-light px-3 py-2 rounded-lg">
                        <div className="w-5 h-5 bg-points-green rounded-full flex items-center justify-center">
                          <CurrencyDollarIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-points-green">{availablePoints}</span>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5 text-primary-500" />
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-primary-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('recognize')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === 'recognize'
                            ? 'border-brand-500 text-brand-600'
                            : 'border-transparent text-primary-500 hover:text-primary-700 hover:border-brand-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <HeartIcon className="w-4 h-4" />
                          <span>Recognize Now</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={handleAwardsClick}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === 'awards'
                            ? 'border-brand-500 text-brand-600'
                            : 'border-transparent text-primary-500 hover:text-primary-700 hover:border-brand-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <TrophyIcon className="w-4 h-4" />
                          <span>Awards</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('announcements')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === 'announcements'
                            ? 'border-brand-500 text-brand-600'
                            : 'border-transparent text-primary-500 hover:text-primary-700 hover:border-brand-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <SpeakerWaveIcon className="w-4 h-4" />
                          <span>Announcements</span>
                        </div>
                      </button>
                    </nav>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {activeTab === 'recognize' && renderRecognizeTab()}
                    {activeTab === 'announcements' && renderAnnouncementsTab()}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
      {/* Awards Modal */}
      <AwardsModal 
        isOpen={showAwardsModal} 
        onClose={() => setShowAwardsModal(false)} 
        availablePoints={availablePoints}
      />
    </>
  )
}