'use client'

import { useState } from 'react'
import { CurrencyDollarIcon, SparklesIcon, CogIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { useNotifications } from '@/components/NotificationSystem'

export default function PointsSettings() {
  const [pointsName, setPointsName] = useState('Superstars')
  const [exchangeRate, setExchangeRate] = useState('10 superstars = 1 USD')
  const [pointsRequirement, setPointsRequirement] = useState('required')
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  const { showSuccess, showError } = useNotifications()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!pointsName.trim()) {
      newErrors.pointsName = 'Points name is required'
    } else if (pointsName.trim().length < 2) {
      newErrors.pointsName = 'Points name must be at least 2 characters'
    } else if (pointsName.trim().length > 20) {
      newErrors.pointsName = 'Points name must be less than 20 characters'
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
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate random success/error for demo
      if (Math.random() > 0.2) {
        showSuccess(
          'Points Settings Saved!', 
          `Your points system has been updated with "${pointsName}" as the currency name.`
        )
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      showError(
        'Save Failed', 
        'There was an error saving your points settings. Please try again.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="settings-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="settings-header mb-2">Points Configuration</h2>
          <p className="settings-description">
            Customize your recognition currency and point requirements to match your company culture
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Points Name Section */}
        <div className="settings-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
              <SparklesIcon className="w-6 h-6 text-cherish-dark" />
            </div>
            <div>
              <h3 className="settings-subheader mb-1">Points Name</h3>
              <p className="text-sm text-cherish-gray-600">
                Customize your currency name to reflect your company culture
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="points-name" className="block text-sm font-semibold text-cherish-gray-700 mb-2">
                Currency Name
              </label>
              <input
                type="text"
                id="points-name"
                value={pointsName}
                onChange={(e) => {
                  setPointsName(e.target.value)
                  if (errors.pointsName) {
                    setErrors(prev => ({ ...prev, pointsName: '' }))
                  }
                }}
                placeholder="Enter desired points name, like 'big ups' or '⭐'"
                className={`form-input ${errors.pointsName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {errors.pointsName && (
                <p className="text-xs text-red-600 mt-2 flex items-center">
                  <InformationCircleIcon className="h-4 w-4 mr-1" />
                  {errors.pointsName}
                </p>
              )}
              <p className="text-xs text-cherish-gray-500 mt-2">
                You can use emojis or creative names that match your company&apos;s personality
              </p>
            </div>
          </div>
        </div>

        {/* Exchange Rate Section */}
        <div className="settings-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-cherish-green rounded-2xl flex items-center justify-center shadow-soft">
              <CurrencyDollarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="settings-subheader mb-1">Exchange Rate</h3>
              <p className="text-sm text-cherish-gray-600">
                Standard 10:1 ratio for optimal recognition value
              </p>
            </div>
          </div>
          
          <div className="bg-cherish-yellow-light p-6 rounded-2xl border border-cherish-yellow-mono/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl font-bold text-cherish-dark">{exchangeRate}</div>
            </div>
            <p className="text-sm text-cherish-gray-600 leading-relaxed">
              If users want to claim a $15 USD reward, they must redeem 150 points. 
              This 10:1 exchange rate maintains meaningful recognition while keeping values clear and consistent.
            </p>
          </div>
        </div>

        {/* Points Requirements Section */}
        <div className="settings-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-cherish-purple rounded-2xl flex items-center justify-center shadow-soft">
              <CogIcon className="w-6 h-6 text-cherish-dark" />
            </div>
            <div>
              <h3 className="settings-subheader mb-1">Points Requirements</h3>
              <p className="text-sm text-cherish-gray-600">
                Control whether points are required for recognition posts
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="radio"
                id="posts-without-points"
                name="points-requirement"
                value="optional"
                checked={pointsRequirement === 'optional'}
                onChange={(e) => setPointsRequirement(e.target.value)}
                className="mt-1 h-4 w-4 text-cherish-yellow-mono focus:ring-cherish-yellow border-cherish-gray-300"
              />
              <div className="flex-1">
                <label htmlFor="posts-without-points" className="block text-sm font-medium text-cherish-gray-900 mb-1">
                  Posts can be given without points
                </label>
                <p className="text-sm text-cherish-gray-600">
                  Allow recognition posts without point attachments for flexibility
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="radio"
                id="posts-require-points"
                name="points-requirement"
                value="required"
                checked={pointsRequirement === 'required'}
                onChange={(e) => setPointsRequirement(e.target.value)}
                className="mt-1 h-4 w-4 text-cherish-yellow-mono focus:ring-cherish-yellow border-cherish-gray-300"
              />
              <div className="flex-1">
                <label htmlFor="posts-require-points" className="block text-sm font-medium text-cherish-gray-900 mb-1">
                  Posts always require 1 or more points
                </label>
                <p className="text-sm text-cherish-gray-600">
                  Ensure all recognition includes points to maximize engagement and reward value
                </p>
              </div>
            </div>

            {/* Best Practice Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-6">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Best Practice Recommendation</h4>
                  <p className="text-sm text-blue-700">
                    We recommend requiring points for all posts. Data shows higher participation rates 
                    and more meaningful rewards when points are consistently used across your organization.
                  </p>
                </div>
              </div>
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
    </div>
  )
}
