'use client'

import { useState } from 'react'
import { ExclamationTriangleIcon, PlusIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useNotifications } from '@/components/NotificationSystem'
import ConfirmationDialog from '@/components/ConfirmationDialog'

export default function BannedHashtags() {
  const [bannedHashtags, setBannedHashtags] = useState<string[]>([])
  const [newHashtag, setNewHashtag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    hashtag: string | null
  }>({ isOpen: false, hashtag: null })
  const [inputError, setInputError] = useState('')
  
  const { showSuccess, showError, showInfo } = useNotifications()

  const validateHashtag = (hashtag: string) => {
    if (!hashtag.trim()) {
      return 'Hashtag cannot be empty'
    }
    if (!hashtag.startsWith('#')) {
      return 'Hashtag must start with #'
    }
    if (hashtag.length < 3) {
      return 'Hashtag must be at least 3 characters'
    }
    if (bannedHashtags.includes(hashtag.trim())) {
      return 'This hashtag is already banned'
    }
    return ''
  }

  const addBannedHashtag = () => {
    const error = validateHashtag(newHashtag)
    if (error) {
      setInputError(error)
      return
    }

    setBannedHashtags([...bannedHashtags, newHashtag.trim()])
    showSuccess(
      'Hashtag Banned',
      `"${newHashtag.trim()}" has been added to the banned hashtags list.`
    )
    setNewHashtag('')
    setInputError('')
  }

  const confirmRemoveBannedHashtag = (hashtag: string) => {
    setDeleteConfirmation({ isOpen: true, hashtag })
  }

  const removeBannedHashtag = () => {
    if (deleteConfirmation.hashtag) {
      setBannedHashtags(bannedHashtags.filter(tag => tag !== deleteConfirmation.hashtag))
      showInfo(
        'Hashtag Unbanned',
        `"${deleteConfirmation.hashtag}" has been removed from the banned list.`
      )
      setDeleteConfirmation({ isOpen: false, hashtag: null })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addBannedHashtag()
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate random success/error for demo
      if (Math.random() > 0.1) {
        showSuccess(
          'Banned Hashtags Saved!', 
          `Successfully saved ${bannedHashtags.length} banned hashtag${bannedHashtags.length !== 1 ? 's' : ''}.`
        )
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      showError(
        'Save Failed', 
        'There was an error saving your banned hashtags. Please try again.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="settings-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="settings-header mb-2">Banned Hashtags</h2>
          <p className="settings-description">
            Prohibit certain hashtags from being used in recognition posts to maintain appropriate workplace communication
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Add Banned Hashtag Section */}
        <div className="settings-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-cherish-red rounded-2xl flex items-center justify-center shadow-soft">
              <ExclamationTriangleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="settings-subheader mb-1">Add Banned Hashtag</h3>
              <p className="text-sm text-cherish-gray-600">
                Enter hashtags you want to prohibit from being used
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={newHashtag}
                onChange={(e) => {
                  setNewHashtag(e.target.value)
                  if (inputError) {
                    setInputError('')
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter hashtag to ban (e.g., #inappropriate-word)"
                className={`form-input ${inputError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {inputError && (
                <p className="text-xs text-red-600 mt-2 flex items-center">
                  <InformationCircleIcon className="h-4 w-4 mr-1" />
                  {inputError}
                </p>
              )}
            </div>
            <button
              onClick={addBannedHashtag}
              disabled={!newHashtag.trim() || bannedHashtags.includes(newHashtag.trim())}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add hashtag</span>
            </button>
          </div>
        </div>

        {/* Banned Hashtags List */}
        <div className="settings-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="settings-subheader mb-1">Banned Hashtags</h3>
              <p className="text-sm text-cherish-gray-600">
                Hashtags that are prohibited from being used in recognition posts
              </p>
            </div>
            {bannedHashtags.length > 0 && (
              <span className="text-sm text-cherish-gray-500">
                {bannedHashtags.length} banned hashtag{bannedHashtags.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {bannedHashtags.length === 0 ? (
            <div className="text-center py-12">
              <ExclamationTriangleIcon className="h-12 w-12 text-cherish-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-cherish-gray-500 mb-2">No banned hashtags</h4>
              <p className="text-sm text-cherish-gray-400">
                Add hashtags above to prevent them from being used in recognition posts
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bannedHashtags.map((hashtag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cherish-red rounded-full flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-cherish-gray-900">{hashtag}</span>
                  </div>
                  <button
                    onClick={() => confirmRemoveBannedHashtag(hashtag)}
                    className="p-2 text-cherish-red hover:bg-cherish-red hover:text-white rounded-xl transition-all duration-300"
                    title="Remove from banned list"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="h-6 w-6 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 mb-2">How Banned Hashtags Work</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Users will be prevented from using these hashtags in recognition posts</li>
                <li>• Banned hashtags are case-insensitive (e.g., #Test and #test are treated the same)</li>
                <li>• Include the # symbol when adding hashtags to the banned list</li>
                <li>• This helps maintain appropriate and professional workplace communication</li>
                <li>• Example banned hashtags might include inappropriate language or off-topic terms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-cherish-gray-200">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`btn-primary ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-cherish-dark border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, hashtag: null })}
        onConfirm={removeBannedHashtag}
        title="Remove Banned Hashtag"
        message={`Are you sure you want to remove "${deleteConfirmation.hashtag}" from the banned hashtags list? Users will be able to use this hashtag again.`}
        confirmText="Remove from Ban List"
        cancelText="Keep Banned"
        type="warning"
        icon="warning"
      />
    </div>
  )
}
