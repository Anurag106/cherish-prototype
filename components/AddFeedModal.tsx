'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon, 
  MagnifyingGlassIcon,
  UsersIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

interface AddFeedModalProps {
  isOpen: boolean
  onClose: () => void
  onAddFeed: (feedType: string, feedId: string, feedName: string) => void
}

type FeedType = 'teams' | 'departments' | 'locations' | null
type Step = 'select-type' | 'select-feed'

const mockTeams = [
  "Aaron Shafer's Team",
  "Abhimanyu Singh's Team", 
  "Adam Harrington's Team",
  "Aditya Hastak's Team",
  "Agnes Jiang's Team",
  "Alex Hoeffner's Team"
]

const mockDepartments = [
  "Accounting Dept",
  "Business Applications Ga Dept",
  "Business Applications Sm Dept", 
  "Business Intelligence Dept",
  "Business Operations Dept",
  "Compliance Controls Dept"
]

const mockLocations = [
  "Amsterdam",
  "Atlanta",
  "Bangkok",
  "Barcelona", 
  "Berlin",
  "California (Remote)"
]

export default function AddFeedModal({ isOpen, onClose, onAddFeed }: AddFeedModalProps) {
  const [step, setStep] = useState<Step>('select-type')
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([])

  const handleClose = () => {
    setStep('select-type')
    setSelectedFeedType(null)
    setSearchQuery('')
    setSelectedFeeds([])
    onClose()
  }

  const handleFeedTypeSelect = (type: FeedType) => {
    setSelectedFeedType(type)
    setStep('select-feed')
  }

  const handleBack = () => {
    if (step === 'select-feed') {
      setStep('select-type')
      setSelectedFeedType(null)
      setSearchQuery('')
    }
  }

  const getFeedData = () => {
    switch (selectedFeedType) {
      case 'teams':
        return mockTeams
      case 'departments':
        return mockDepartments
      case 'locations':
        return mockLocations
      default:
        return []
    }
  }

  const getFilteredFeeds = () => {
    const feeds = getFeedData()
    if (!searchQuery) return feeds
    return feeds.filter(feed => 
      feed.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const getFeedTypeIcon = (type: FeedType) => {
    switch (type) {
      case 'teams':
        return <UsersIcon className="w-6 h-6" />
      case 'departments':
        return <BuildingOfficeIcon className="w-6 h-6" />
      case 'locations':
        return <MapPinIcon className="w-6 h-6" />
      default:
        return null
    }
  }

  const getFeedTypeTitle = () => {
    switch (selectedFeedType) {
      case 'teams':
        return 'Teams'
      case 'departments':
        return 'Departments'
      case 'locations':
        return 'Locations'
      default:
        return ''
    }
  }

  const toggleFeedSelection = (feed: string) => {
    setSelectedFeeds(prev => 
      prev.includes(feed) 
        ? prev.filter(f => f !== feed)
        : [...prev, feed]
    )
  }

  const handleAddSelectedFeeds = () => {
    selectedFeeds.forEach(feed => {
      onAddFeed(selectedFeedType!, feed, feed)
    })
    handleClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
                  <div className="flex items-center space-x-3">
                    {step === 'select-feed' && (
                      <button
                        onClick={handleBack}
                        className="p-2 text-cherish-gray-600 hover:text-cherish-dark transition-colors rounded-xl hover:bg-cherish-gray-100"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                    )}
                    <h3 className="text-xl font-bold text-cherish-dark">
                      {step === 'select-type' ? 'Select a feed' : getFeedTypeTitle()}
                    </h3>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 text-cherish-gray-600 hover:text-cherish-dark transition-colors rounded-xl hover:bg-cherish-gray-100"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {step === 'select-type' ? (
                    // Feed Type Selection
                    <div className="space-y-3">
                      <button
                        onClick={() => handleFeedTypeSelect('teams')}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-cherish-gray-50 transition-all group border border-transparent hover:border-cherish-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cherish-yellow/10 rounded-2xl flex items-center justify-center text-cherish-yellow-mono group-hover:bg-cherish-yellow/20 transition-colors">
                            <UsersIcon className="w-6 h-6" />
                          </div>
                          <span className="font-semibold text-cherish-dark">Teams</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-cherish-gray-400 group-hover:text-cherish-yellow-mono transition-colors" />
                      </button>

                      <button
                        onClick={() => handleFeedTypeSelect('departments')}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-cherish-gray-50 transition-all group border border-transparent hover:border-cherish-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cherish-yellow/10 rounded-2xl flex items-center justify-center text-cherish-yellow-mono group-hover:bg-cherish-yellow/20 transition-colors">
                            <BuildingOfficeIcon className="w-6 h-6" />
                          </div>
                          <span className="font-semibold text-cherish-dark">Departments</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-cherish-gray-400 group-hover:text-cherish-yellow-mono transition-colors" />
                      </button>

                      <button
                        onClick={() => handleFeedTypeSelect('locations')}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-cherish-gray-50 transition-all group border border-transparent hover:border-cherish-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cherish-yellow/10 rounded-2xl flex items-center justify-center text-cherish-yellow-mono group-hover:bg-cherish-yellow/20 transition-colors">
                            <MapPinIcon className="w-6 h-6" />
                          </div>
                          <span className="font-semibold text-cherish-dark">Locations</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-cherish-gray-400 group-hover:text-cherish-yellow-mono transition-colors" />
                      </button>
                    </div>
                  ) : (
                    // Feed Selection
                    <div className="space-y-4">
                      {/* Search */}
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cherish-gray-400" />
                        <input
                          type="text"
                          placeholder={`Search ${getFeedTypeTitle().toLowerCase()}...`}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-cherish-gray-200 focus:outline-none focus:ring-2 focus:ring-cherish-yellow focus:border-transparent transition-all"
                        />
                      </div>


                      {/* Feed List */}
                      <div className="max-h-80 overflow-y-auto space-y-2">
                        {getFilteredFeeds().map((feed, index) => (
                          <button
                            key={index}
                            onClick={() => toggleFeedSelection(feed)}
                            className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-cherish-gray-50 transition-all group"
                          >
                            <div className="flex-1 text-left">
                              <span className="font-medium text-cherish-dark">{feed}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedFeeds.includes(feed)
                                ? 'bg-cherish-yellow border-cherish-yellow'
                                : 'border-cherish-gray-300 group-hover:border-cherish-yellow'
                            }`}>
                              {selectedFeeds.includes(feed) && (
                                <div className="w-2 h-2 bg-cherish-dark rounded-full"></div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Selected Feeds Display */}
                      {selectedFeeds.length > 0 && (
                        <div className="border-t border-cherish-gray-200 pt-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedFeeds.map((feed, index) => (
                              <div key={index} className="flex items-center space-x-2 bg-cherish-yellow-light px-3 py-1 rounded-full border border-cherish-yellow/30">
                                <span className="text-sm font-medium text-cherish-dark">{feed}</span>
                                <button
                                  onClick={() => toggleFeedSelection(feed)}
                                  className="text-cherish-gray-500 hover:text-cherish-dark"
                                >
                                  <XMarkIcon className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={handleAddSelectedFeeds}
                            className="w-full bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono hover:from-cherish-yellow-mono hover:to-cherish-yellow text-cherish-dark font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            Add {selectedFeeds.length} feed{selectedFeeds.length !== 1 ? 's' : ''}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
