'use client'

import { useState } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'

interface DateFrequencySelectorProps {
  selectedDate: string
  selectedFrequency: string
  onDateChange: (date: string) => void
  onFrequencyChange: (frequency: string) => void
}

export default function DateFrequencySelector({
  selectedDate,
  selectedFrequency,
  onDateChange,
  onFrequencyChange
}: DateFrequencySelectorProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const frequencies = [
    { value: 'once', label: 'Once only' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ]

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
          Celebration Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="form-input pr-10"
            min={new Date().toISOString().split('T')[0]}
          />
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cherish-gray-400 pointer-events-none" />
        </div>
        {selectedDate && (
          <p className="text-xs text-cherish-gray-500 mt-1">
            Selected: {formatDate(selectedDate)}
          </p>
        )}
      </div>

      {/* Frequency Selection */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
          Frequency
        </label>
        <select
          value={selectedFrequency}
          onChange={(e) => onFrequencyChange(e.target.value)}
          className="form-input"
        >
          {frequencies.map((frequency) => (
            <option key={frequency.value} value={frequency.value}>
              {frequency.label}
            </option>
          ))}
        </select>
        {selectedFrequency && selectedFrequency !== 'once' && (
          <p className="text-xs text-cherish-gray-500 mt-1">
            This celebration will repeat {selectedFrequency} starting from the selected date.
          </p>
        )}
      </div>

      {/* Preview */}
      {selectedDate && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 text-blue-600 mt-0.5">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Celebration Schedule</p>
              <p className="text-sm text-blue-700">
                {selectedFrequency === 'once' 
                  ? `This celebration will occur once on ${formatDate(selectedDate)}`
                  : `This celebration will occur ${selectedFrequency} starting from ${formatDate(selectedDate)}`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
