'use client'

import { useState } from 'react'
import { HashtagIcon, PlusIcon, TrashIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useNotifications } from '@/components/NotificationSystem'
import ConfirmationDialog from '@/components/ConfirmationDialog'

interface CompanyValue {
  id: string
  hashtag: string
  description: string
}

export default function CompanyValueHashtags() {
  const [hashtagMode, setHashtagMode] = useState('company-required')
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([
    {
      id: '1',
      hashtag: '#teamwork',
      description: 'Collaborate effectively; share knowledge, support each other consistently, and celebrate every outcome as a team victory or a learning moment!'
    },
    {
      id: '2',
      hashtag: '#leadership',
      description: 'Leadership is about humility, curiosity, and empathy. Lead by example and inspire others through your actions and understanding.'
    },
    {
      id: '3',
      hashtag: '#problem-solving',
      description: 'View each challenge as an opportunity to solve complex problems through diverse perspectives and innovative thinking.'
    },
    {
      id: '4',
      hashtag: '#vision',
      description: 'Keep our goals in clear view and strategically steer our efforts to achieve them, ensuring every action aligns with our long-term objectives.'
    }
  ])
  
  const [isSaving, setIsSaving] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    hashtag: CompanyValue | null
  }>({ isOpen: false, hashtag: null })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  const { showSuccess, showError, showWarning } = useNotifications()

  const addNewHashtag = () => {
    if (companyValues.length < 12) {
      const newValue: CompanyValue = {
        id: Date.now().toString(),
        hashtag: '',
        description: ''
      }
      setCompanyValues([...companyValues, newValue])
    }
  }

  const confirmRemoveHashtag = (hashtag: CompanyValue) => {
    setDeleteConfirmation({ isOpen: true, hashtag })
  }

  const removeHashtag = () => {
    if (deleteConfirmation.hashtag) {
      setCompanyValues(companyValues.filter(value => value.id !== deleteConfirmation.hashtag!.id))
      showSuccess(
        'Hashtag Removed',
        `"${deleteConfirmation.hashtag.hashtag}" has been removed from your company values.`
      )
      setDeleteConfirmation({ isOpen: false, hashtag: null })
    }
  }

  const updateHashtag = (id: string, field: 'hashtag' | 'description', value: string) => {
    setCompanyValues(companyValues.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    let hasValidHashtags = false
    
    companyValues.forEach((value, index) => {
      if (value.hashtag.trim() || value.description.trim()) {
        hasValidHashtags = true
        
        if (!value.hashtag.trim()) {
          newErrors[`hashtag-${value.id}`] = 'Hashtag is required'
        } else if (!value.hashtag.startsWith('#')) {
          newErrors[`hashtag-${value.id}`] = 'Hashtag must start with #'
        } else if (value.hashtag.length < 3) {
          newErrors[`hashtag-${value.id}`] = 'Hashtag must be at least 3 characters'
        }
        
        if (!value.description.trim()) {
          newErrors[`description-${value.id}`] = 'Description is required'
        } else if (value.description.length > 250) {
          newErrors[`description-${value.id}`] = 'Description must be less than 250 characters'
        }
      }
    })
    
    if (!hasValidHashtags && hashtagMode === 'company-required') {
      showWarning(
        'No Company Values',
        'You have "Company value hashtag required" selected but no hashtags defined. Please add at least one company value or change the hashtag mode.'
      )
      return false
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      showError('Validation Error', 'Please fix the errors before saving')
      return
    }

    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate random success/error for demo
      if (Math.random() > 0.15) {
        const validHashtags = companyValues.filter(v => v.hashtag.trim() && v.description.trim())
        showSuccess(
          'Company Values Saved!', 
          `Successfully saved ${validHashtags.length} company value hashtag${validHashtags.length !== 1 ? 's' : ''} with ${hashtagMode} mode.`
        )
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      showError(
        'Save Failed', 
        'There was an error saving your company value hashtags. Please try again.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="settings-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="settings-header mb-2">Company Value Hashtags</h2>
          <p className="settings-description">
            Add value hashtags and descriptions to connect recognition to your company values and foster a positive culture
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hashtag Mode Section */}
        <div className="settings-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-cherish-purple rounded-2xl flex items-center justify-center shadow-soft">
              <HashtagIcon className="w-6 h-6 text-cherish-dark" />
            </div>
            <div>
              <h3 className="settings-subheader mb-1">Hashtag Requirements</h3>
              <p className="text-sm text-cherish-gray-600">
                Determine whether hashtags must be attached to peer-to-peer posts
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="radio"
                id="company-required"
                name="hashtag-mode"
                value="company-required"
                checked={hashtagMode === 'company-required'}
                onChange={(e) => setHashtagMode(e.target.value)}
                className="mt-1 h-4 w-4 text-cherish-yellow-mono focus:ring-cherish-yellow border-cherish-gray-300"
              />
              <div className="flex-1">
                <label htmlFor="company-required" className="block text-sm font-medium text-cherish-gray-900 mb-1">
                  A company value hashtag is required
                </label>
                <p className="text-sm text-cherish-gray-600">
                  Requires at least one company value hashtag on every recognition post
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="radio"
                id="any-hashtag"
                name="hashtag-mode"
                value="any-required"
                checked={hashtagMode === 'any-required'}
                onChange={(e) => setHashtagMode(e.target.value)}
                className="mt-1 h-4 w-4 text-cherish-yellow-mono focus:ring-cherish-yellow border-cherish-gray-300"
              />
              <div className="flex-1">
                <label htmlFor="any-hashtag" className="block text-sm font-medium text-cherish-gray-900 mb-1">
                  Any hashtag is required
                </label>
                <p className="text-sm text-cherish-gray-600">
                  Requires any hashtag but doesn&apos;t have to be a company value
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="radio"
                id="hashtags-optional"
                name="hashtag-mode"
                value="optional"
                checked={hashtagMode === 'optional'}
                onChange={(e) => setHashtagMode(e.target.value)}
                className="mt-1 h-4 w-4 text-cherish-yellow-mono focus:ring-cherish-yellow border-cherish-gray-300"
              />
              <div className="flex-1">
                <label htmlFor="hashtags-optional" className="block text-sm font-medium text-cherish-gray-900 mb-1">
                  Hashtags are optional
                </label>
                <p className="text-sm text-cherish-gray-600">
                  Allows recognition with or without hashtags attached
                </p>
              </div>
            </div>

            {/* Best Practice Tip */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-6">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-green-900 mb-1">Recommended Setting</h4>
                  <p className="text-sm text-green-700">
                    We recommend &quot;Company value hashtag required&quot; to get the most data and analytics from your recognition program. 
                    This also feeds into our Achievements feature for additional recognition!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values Section */}
        <div className="settings-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="settings-subheader mb-1">Company Values</h3>
              <p className="text-sm text-cherish-gray-600">
                Enter up to 12 hashtags. Use dashes &quot;-&quot; or underscores &quot;_&quot; instead of spaces to improve legibility
              </p>
            </div>
            <span className="text-sm text-cherish-gray-500">
              {companyValues.length}/12 hashtags
            </span>
          </div>
          
          <div className="space-y-6">
            {companyValues.map((value, index) => (
              <div key={value.id} className="border border-cherish-gray-200 rounded-2xl p-6 bg-cherish-gray-50 hover:bg-white transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label htmlFor={`hashtag-${value.id}`} className="block text-sm font-semibold text-cherish-gray-700 mb-2">
                        Hashtag
                      </label>
                      <input
                        type="text"
                        id={`hashtag-${value.id}`}
                        value={value.hashtag}
                        onChange={(e) => {
                          updateHashtag(value.id, 'hashtag', e.target.value)
                          if (errors[`hashtag-${value.id}`]) {
                            setErrors(prev => ({ ...prev, [`hashtag-${value.id}`]: '' }))
                          }
                        }}
                        placeholder="#teamwork"
                        className={`form-input ${errors[`hashtag-${value.id}`] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors[`hashtag-${value.id}`] && (
                        <p className="text-xs text-red-600 mt-1 flex items-center">
                          <InformationCircleIcon className="h-4 w-4 mr-1" />
                          {errors[`hashtag-${value.id}`]}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor={`description-${value.id}`} className="block text-sm font-semibold text-cherish-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id={`description-${value.id}`}
                        value={value.description}
                        onChange={(e) => {
                          updateHashtag(value.id, 'description', e.target.value)
                          if (errors[`description-${value.id}`]) {
                            setErrors(prev => ({ ...prev, [`description-${value.id}`]: '' }))
                          }
                        }}
                        placeholder="Describe what this value means to your organization..."
                        rows={3}
                        maxLength={250}
                        className={`form-input resize-none ${errors[`description-${value.id}`] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors[`description-${value.id}`] && (
                        <p className="text-xs text-red-600 mt-1 flex items-center">
                          <InformationCircleIcon className="h-4 w-4 mr-1" />
                          {errors[`description-${value.id}`]}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-cherish-gray-500">
                          Help your team understand what it means to embody this value
                        </p>
                        <span className={`text-xs ${value.description.length > 250 ? 'text-red-500' : 'text-cherish-gray-400'}`}>
                          {value.description.length}/250
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {companyValues.length > 1 && (
                    <button
                      onClick={() => confirmRemoveHashtag(value)}
                      className="p-2 text-cherish-red hover:bg-cherish-red-light hover:text-white rounded-xl transition-all duration-300"
                      title="Remove hashtag"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {companyValues.length < 12 && (
              <button
                onClick={addNewHashtag}
                className="w-full border-2 border-dashed border-cherish-gray-300 rounded-2xl p-6 text-cherish-gray-500 hover:border-cherish-yellow hover:text-cherish-yellow-mono hover:bg-cherish-yellow-light transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <PlusIcon className="h-5 w-5" />
                <span className="font-medium">Add hashtag</span>
              </button>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">How Company Values Work</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Company value hashtags will be displayed on Home for users to reference</li>
                <li>• Hashtags feed into our Achievements feature for additional recognition</li>
                <li>• Top performers for each company value get extra visibility</li>
                <li>• Use descriptions to keep your team aligned with meaningful values</li>
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
        onConfirm={removeHashtag}
        title="Remove Company Value"
        message={`Are you sure you want to remove "${deleteConfirmation.hashtag?.hashtag}" from your company values? This action cannot be undone.`}
        confirmText="Remove Hashtag"
        cancelText="Keep Hashtag"
        type="danger"
        icon="trash"
      />
    </div>
  )
}
