'use client'

import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function DisplaySettings() {
  const [companyName, setCompanyName] = useState('Cherish')
  const [language, setLanguage] = useState('English')

  const handleSave = () => {
    // Handle save logic
    console.log('Saving display settings...')
  }

  return (
    <div className="settings-section">
      <h2 className="settings-header">Display Settings</h2>
      <p className="settings-description">Configure your company branding and display preferences</p>
      
      {/* Company Name */}
      <div className="p-8 bg-white rounded-3xl border border-cherish-gray-200 shadow-soft">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
              <path d="M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H20V19M20,15H12V13H20V15M20,11H12V9H20V11Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Company Information</h3>
            <p className="text-sm text-cherish-gray-600">Basic company details and branding</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="company-name" className="block text-sm font-semibold text-cherish-dark mb-3">
              Company Name
            </label>
            <input
              type="text"
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="form-input max-w-lg"
              placeholder="Enter your company name"
            />
            <p className="mt-3 text-sm text-cherish-gray-600 leading-relaxed">
              This name appears in email communications, reports, as alternative text for the logo, and is attached to your subscription.
            </p>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-3">
              Company Logo
            </label>
            <div className="flex items-start space-x-6">
              <div className="w-64 h-40 border-2 border-dashed border-cherish-gray-300 rounded-3xl flex flex-col items-center justify-center bg-cherish-gray-50 hover:border-cherish-yellow hover:bg-cherish-yellow-light transition-all duration-300 cursor-pointer group">
                <PhotoIcon className="h-12 w-12 text-cherish-gray-400 mb-3 group-hover:text-cherish-yellow-mono transition-colors duration-300" />
                <span className="text-sm text-cherish-gray-500 group-hover:text-cherish-gray-700 transition-colors duration-300 font-medium">No image uploaded</span>
                <span className="text-xs text-cherish-gray-400 mt-1">Click to browse files</span>
              </div>
              <div className="flex flex-col space-y-4">
                <button className="btn-primary">
                  <span className="flex items-center space-x-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <span>Upload Logo</span>
                  </span>
                </button>
                <div className="bg-cherish-yellow-light p-4 rounded-2xl border border-cherish-yellow">
                  <p className="text-sm text-cherish-dark font-medium mb-1">
                    Recommended specs:
                  </p>
                  <ul className="text-sm text-cherish-gray-700 space-y-1">
                    <li>• Transparent PNG format</li>
                    <li>• 350×150 pixels</li>
                    <li>• High resolution for crisp display</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="p-8 bg-white rounded-3xl border border-cherish-gray-200 shadow-soft">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="currentColor">
              <path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Language Settings</h3>
            <p className="text-sm text-cherish-gray-600">Default language for the platform</p>
          </div>
        </div>
        
        <div>
          <label htmlFor="language" className="block text-sm font-semibold text-cherish-dark mb-3">
            Default Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-input max-w-sm"
          >
            <option value="English">English (US)</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
            <option value="Portuguese">Português</option>
            <option value="Italian">Italiano</option>
          </select>
          <p className="mt-3 text-sm text-cherish-gray-600 leading-relaxed">
            Set the default language for all users. Individual users can override this setting in their personal account preferences.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="section-divider">
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="btn-primary px-8"
          >
            <span className="flex items-center space-x-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
              </svg>
              <span>Save Settings</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
