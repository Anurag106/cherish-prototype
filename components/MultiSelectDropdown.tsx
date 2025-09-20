'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Option {
  id: string
  name: string
  department?: string
}

interface MultiSelectDropdownProps {
  options: Option[]
  selectedOptions: Option[]
  onSelectionChange: (selected: Option[]) => void
  placeholder: string
  searchPlaceholder: string
  type: 'locations' | 'departments' | 'teams' | 'roles'
}

export default function MultiSelectDropdown({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder,
  searchPlaceholder,
  type
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleOption = (option: Option) => {
    const isSelected = selectedOptions.some(selected => selected.id === option.id)
    if (isSelected) {
      onSelectionChange(selectedOptions.filter(selected => selected.id !== option.id))
    } else {
      onSelectionChange([...selectedOptions, option])
    }
  }

  const handleRemoveOption = (optionId: string) => {
    onSelectionChange(selectedOptions.filter(selected => selected.id !== optionId))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Options Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="form-input min-h-[44px] cursor-pointer flex items-center justify-between"
      >
        <div className="flex-1 flex flex-wrap gap-1">
          {selectedOptions.length === 0 ? (
            <span className="text-cherish-gray-400">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <div
                key={option.id}
                className="inline-flex items-center gap-1 bg-cherish-yellow-light text-cherish-dark px-2 py-1 rounded-lg text-sm"
              >
                <span>{option.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveOption(option.id)
                  }}
                  className="text-cherish-gray-600 hover:text-cherish-dark"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-cherish-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-cherish-gray-300 rounded-2xl shadow-medium max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-cherish-gray-200">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cherish-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 border border-cherish-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cherish-yellow focus:border-transparent"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-cherish-gray-500 text-center">
                No {type} found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedOptions.some(selected => selected.id === option.id)
                return (
                  <div
                    key={option.id}
                    onClick={() => handleToggleOption(option)}
                    className={`px-3 py-2 cursor-pointer hover:bg-cherish-gray-50 flex items-center justify-between ${
                      isSelected ? 'bg-cherish-yellow-light' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-cherish-dark">{option.name}</div>
                      {option.department && (
                        <div className="text-xs text-cherish-gray-500">{option.department}</div>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 bg-cherish-yellow-mono rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
