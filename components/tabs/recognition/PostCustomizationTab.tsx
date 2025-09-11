'use client'

import { useState } from 'react'
import { useNotifications } from '@/components/NotificationSystem'
import Toggle from '@/components/Toggle'
import { 
  EyeIcon,
  EyeSlashIcon,
  UsersIcon,
  GlobeAltIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function PostCustomizationTab() {
  const { showSuccess } = useNotifications()
  
  const [allowVisibilityChange, setAllowVisibilityChange] = useState(true)
  const [modifySuggestedAmounts, setModifySuggestedAmounts] = useState(true)
  const [suggestedAmounts, setSuggestedAmounts] = useState([5, 10, 15, 20, 25])

  const handleSaveSettings = () => {
    showSuccess('Settings Saved', 'Post customization settings have been updated.')
    console.log('Saving post customization settings...', {
      allowVisibilityChange,
      modifySuggestedAmounts,
      suggestedAmounts
    })
  }

  const handleAddAmount = () => {
    if (suggestedAmounts.length < 7) {
      setSuggestedAmounts(prev => [...prev, 0])
    }
  }

  const handleRemoveAmount = (index: number) => {
    setSuggestedAmounts(prev => prev.filter((_, i) => i !== index))
  }

  const handleAmountChange = (index: number, value: string) => {
    const amount = parseInt(value) || 0
    setSuggestedAmounts(prev => prev.map((a, i) => i === index ? amount : a))
  }

  return (
    <div className="settings-section">
      <h2 className="settings-header">Post Customization</h2>
      <p className="settings-description">
        Configure how users can customize their recognition posts, including visibility settings and suggested point amounts.
      </p>

      {/* Allow Visibility Change */}
      <div className="settings-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-soft">
            <EyeIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Post Visibility</h3>
            <p className="text-sm text-cherish-gray-600">Control who can see recognition posts</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Toggle
              enabled={allowVisibilityChange}
              onChange={setAllowVisibilityChange}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold text-cherish-dark mb-2">Allow visibility change</div>
              <p className="text-sm text-cherish-gray-600 mb-4">
                Givers will have the option to change post visibility to public, private, or team 
                as they create a peer-to-peer recognition post.
              </p>
              
              {allowVisibilityChange && (
                <div className="bg-cherish-gray-50 rounded-2xl p-4">
                  <div className="text-sm font-medium text-cherish-gray-800 mb-3">
                    Visibility Options Available to Users:
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <GlobeAltIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-cherish-dark">Public</div>
                        <div className="text-xs text-cherish-gray-600">Visible to everyone in the organization</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <UsersIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-cherish-dark">Team</div>
                        <div className="text-xs text-cherish-gray-600">Visible to team members only</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <EyeSlashIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-cherish-dark">Private</div>
                        <div className="text-xs text-cherish-gray-600">Visible to giver and recipient only</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-cherish-yellow-light rounded-xl">
                    <div className="flex items-center space-x-2">
                      <InformationCircleIcon className="w-4 h-4 text-cherish-yellow-mono" />
                      <span className="text-sm font-medium text-cherish-dark">
                        All posts default to Public visibility
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Give Amounts */}
      <div className="settings-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
              <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Suggested Give Amounts</h3>
            <p className="text-sm text-cherish-gray-600">Quick point amount suggestions in recognition posts</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Toggle
              enabled={modifySuggestedAmounts}
              onChange={setModifySuggestedAmounts}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold text-cherish-dark mb-2">Modify suggested point amounts shown in give box</div>
              <p className="text-sm text-cherish-gray-600 mb-4">
                For example, when users type a message and enter &quot;+&quot; in the give box 
                they may see options like +5, +10, +20, +50. Set max of 7 suggested give amounts.
              </p>
              
              {modifySuggestedAmounts && (
                <div className="bg-white border-2 border-cherish-yellow rounded-2xl p-6">
                  <div className="mb-4">
                    <div className="font-semibold text-cherish-dark mb-3">Suggestions</div>
                    <div className="space-y-3">
                      {suggestedAmounts.map((amount, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => handleAmountChange(index, e.target.value)}
                            className="form-input w-24"
                          />
                          <button
                            onClick={() => handleRemoveAmount(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {suggestedAmounts.length < 7 && (
                      <button
                        onClick={handleAddAmount}
                        className="mt-4 btn-secondary flex items-center space-x-2"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                        </svg>
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="settings-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-600" fill="currentColor">
              <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Preview</h3>
            <p className="text-sm text-cherish-gray-600">How the recognition post will appear to users</p>
          </div>
        </div>

        <div className="bg-cherish-gray-50 rounded-2xl p-6">
          <div className="bg-white rounded-2xl p-6 shadow-soft max-w-md mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-cherish-yellow rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-cherish-dark">JD</span>
              </div>
              <div>
                <div className="font-semibold text-cherish-dark">John Doe</div>
                <div className="text-sm text-cherish-gray-600">to Sarah Wilson</div>
              </div>
            </div>
            
            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-cherish-gray-200 rounded-xl text-sm resize-none"
                rows={3}
                placeholder="Amazing work on the quarterly presentation! Your attention to detail really made the difference. +"
                readOnly
              />
            </div>

            {allowVisibilityChange && (
              <div className="mb-4">
                <select className="w-full p-2 border border-cherish-gray-200 rounded-lg text-sm">
                  <option>🌍 Public - Visible to everyone</option>
                  <option>👥 Team - Visible to team members</option>
                  <option>🔒 Private - Visible to you and recipient</option>
                </select>
              </div>
            )}

            {modifySuggestedAmounts && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedAmounts.filter(a => a > 0).map((amount) => (
                  <button
                    key={amount}
                    className="px-3 py-1 bg-cherish-yellow-light text-cherish-dark rounded-lg text-sm font-medium hover:bg-cherish-yellow transition-colors"
                  >
                    +{amount}
                  </button>
                ))}
              </div>
            )}

            <button className="w-full btn-primary text-sm">
              Send Recognition
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button 
          onClick={handleSaveSettings}
          className="btn-primary"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
