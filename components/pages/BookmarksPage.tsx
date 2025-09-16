'use client'

import { useState } from 'react'
import { 
  BookmarkIcon,
  PencilIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline'
import EditLabelsModal from '@/components/EditLabelsModal'

interface Label {
  id: string
  name: string
}

interface BookmarksPageProps {
  onBack: () => void;
}

export default function BookmarksPage({ onBack }: BookmarksPageProps) {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [labels, setLabels] = useState<Label[]>([
    { id: '1', name: 'ABC' }
  ])
  const [isEditLabelsModalOpen, setIsEditLabelsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-yellow-light"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center">
                  <BookmarkIcon className="w-5 h-5 text-cherish-dark" />
                </div>
                <h1 className="text-2xl font-bold text-cherish-dark">Bookmarks</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-cherish-gray-100">
          {/* Bookmarks Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-cherish-dark mb-2">Your bookmarks</h2>
              <p className="text-cherish-gray-600">Save recognition moments that matter to you</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-cherish-gray-100 rounded-2xl p-1 flex items-center space-x-1">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedFilter === 'all'
                      ? 'bg-cherish-dark text-white shadow-sm'
                      : 'text-cherish-gray-600 hover:text-cherish-dark'
                  }`}
                >
                  All bookmarks
                </button>
                <span className="bg-cherish-dark text-white text-xs px-2 py-1 rounded-lg font-semibold">
                  0
                </span>
              </div>
              <div className="bg-cherish-yellow-light rounded-2xl px-4 py-2 border border-cherish-yellow/30 flex items-center space-x-2">
                <span className="text-cherish-dark text-sm font-medium">Bookmark for later</span>
                <BookmarkIcon className="w-4 h-4 text-cherish-yellow-mono" />
              </div>
            </div>
          </div>

          {/* Labels Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-cherish-dark mb-4">Your labels</h3>
            <div className="flex items-center space-x-4 mb-4">
              <button 
                onClick={() => setIsEditLabelsModalOpen(true)}
                className="bg-cherish-gray-100 hover:bg-cherish-gray-200 text-cherish-gray-700 px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <PencilIcon className="w-4 h-4" />
                <span>Edit labels</span>
              </button>
            </div>
            
            {/* Display Labels */}
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {labels.map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cherish-yellow-light text-cherish-dark border border-cherish-yellow/30"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 bg-cherish-gray-100 rounded-3xl mx-auto flex items-center justify-center mb-4">
                <BookmarkIcon className="w-12 h-12 text-cherish-gray-400" />
              </div>
              <div className="bg-cherish-yellow-light rounded-2xl p-6 max-w-md mx-auto border border-cherish-yellow/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-cherish-gray-200 rounded-lg"></div>
                  <div className="w-4 h-4 bg-cherish-yellow-mono rounded-lg"></div>
                  <span className="text-cherish-gray-400 text-sm">...</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-cherish-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-cherish-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <div className="w-6 h-4 bg-cherish-green rounded-full"></div>
                    <div className="w-8 h-4 bg-cherish-gray-200 rounded-full"></div>
                  </div>
                  <BookmarkIcon className="w-5 h-5 text-cherish-yellow-mono" />
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-cherish-dark mb-2">No bookmarks saved</h3>
            <p className="text-cherish-gray-600 mb-4 max-w-md mx-auto">
              Click the bookmark icon on any recognition post to start saving the moments that matter.
            </p>
            <p className="text-sm text-cherish-gray-500 max-w-lg mx-auto">
              <strong>Tip:</strong> use bookmarks for self-reflection, reviews, or guiding meaningful discussions.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Labels Modal */}
      <EditLabelsModal
        isOpen={isEditLabelsModalOpen}
        onClose={() => setIsEditLabelsModalOpen(false)}
        labels={labels}
        onLabelsChange={setLabels}
      />
    </div>
  )
}
