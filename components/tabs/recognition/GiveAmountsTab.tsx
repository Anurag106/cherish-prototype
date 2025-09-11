'use client'

import { useState } from 'react'
import { useNotifications } from '@/components/NotificationSystem'
import { 
  PlusIcon,
  TrashIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function GiveAmountsTab() {
  const { showSuccess, showError } = useNotifications()
  
  const [suggestedAmounts, setSuggestedAmounts] = useState([5, 10, 15, 20, 25])
  const [newAmount, setNewAmount] = useState('')

  const handleSaveSettings = () => {
    if (suggestedAmounts.length === 0) {
      showError('Invalid Configuration', 'At least one suggested amount is required.')
      return
    }

    showSuccess('Settings Saved', 'Suggested give amounts have been updated.')
    console.log('Saving give amounts settings...', { suggestedAmounts })
  }

  const handleAddAmount = () => {
    const amount = parseInt(newAmount)
    if (!amount || amount <= 0) {
      showError('Invalid Amount', 'Please enter a valid positive number.')
      return
    }

    if (suggestedAmounts.includes(amount)) {
      showError('Duplicate Amount', 'This amount is already in the list.')
      return
    }

    if (suggestedAmounts.length >= 7) {
      showError('Maximum Reached', 'You can have a maximum of 7 suggested amounts.')
      return
    }

    setSuggestedAmounts(prev => [...prev, amount].sort((a, b) => a - b))
    setNewAmount('')
  }

  const handleRemoveAmount = (amount: number) => {
    setSuggestedAmounts(prev => prev.filter(a => a !== amount))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAmount()
    }
  }

  return (
    <div className="settings-section">
      <h2 className="settings-header">Give Amounts</h2>
      <p className="settings-description">
        Configure suggested point amounts that appear when users give recognition. 
        These suggestions make it quick and easy for users to select appropriate amounts.
      </p>

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
            <p className="text-sm text-cherish-gray-600">Quick selection options for recognition posts</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-cherish-yellow-light border border-cherish-yellow rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="w-5 h-5 text-cherish-yellow-mono mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-cherish-dark font-medium mb-1">
                  How Suggested Amounts Work
                </p>
                <p className="text-sm text-cherish-gray-700">
                  When users type a message and enter &quot;+&quot; in the give box, they will see these suggested amounts 
                  like +5, +10, +20, +50. Set a maximum of 7 suggested give amounts.
                </p>
              </div>
            </div>
          </div>

          {/* Current Suggestions */}
          <div>
            <label className="block text-sm font-semibold text-cherish-gray-800 mb-4">
              Current Suggestions
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
              {suggestedAmounts.map((amount) => (
                <div key={amount} className="relative group">
                  <div className="bg-white border-2 border-cherish-yellow rounded-2xl p-4 text-center shadow-soft hover:shadow-medium transition-all duration-300">
                    <div className="text-2xl font-bold text-cherish-yellow-mono mb-1">
                      +{amount}
                    </div>
                    <div className="text-xs text-cherish-gray-600">points</div>
                  </div>
                  <button
                    onClick={() => handleRemoveAmount(amount)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Amount */}
          {suggestedAmounts.length < 7 && (
            <div>
              <label className="block text-sm font-semibold text-cherish-gray-800 mb-2">
                Add New Suggestion
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-cherish-gray-600 font-medium">+</span>
                  <input
                    type="number"
                    min="1"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="form-input w-24"
                    placeholder="30"
                  />
                  <span className="text-cherish-gray-600 font-medium">points</span>
                </div>
                <button 
                  onClick={handleAddAmount}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              <p className="text-xs text-cherish-gray-600 mt-2">
                Maximum of 7 suggestions allowed
              </p>
            </div>
          )}

          {/* Preview */}
          <div>
            <label className="block text-sm font-semibold text-cherish-gray-800 mb-3">
              Preview
            </label>
            <div className="bg-cherish-gray-50 rounded-2xl p-6">
              <div className="bg-white rounded-2xl p-4 shadow-soft max-w-md">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-cherish-yellow rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-cherish-dark">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-cherish-dark">John Doe</div>
                    <div className="text-xs text-cherish-gray-600">to Sarah Wilson</div>
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    className="w-full p-3 border border-cherish-gray-200 rounded-xl text-sm resize-none"
                    rows={2}
                    placeholder="Great work on the project presentation! +"
                    readOnly
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      className="px-3 py-1 bg-cherish-yellow-light text-cherish-dark rounded-lg text-sm font-medium hover:bg-cherish-yellow transition-colors"
                    >
                      +{amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
