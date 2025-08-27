'use client'

import { useState } from 'react'
import Toggle from '@/components/Toggle'

export default function InterfaceCustomization() {
  const [settings, setSettings] = useState({
    prohibitAvatars: false,
    prohibitImageUpload: false,
    prohibitGifAttachment: false,
    enablePostVisibility: true,
    allowDepartmentFilter: false,
    hideAnalytics: false,
    hideRecognizedWidget: false,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log('Saving interface customization settings...', settings)
  }

  return (
    <div className="settings-section">
      <h2 className="settings-header">Interface Customization</h2>
      <p className="settings-description">
        Configure user experience features and admin permissions to personalize how your team interacts with Cherish.
      </p>

      {/* User Experience Settings */}
      <div className="p-8 bg-white rounded-3xl border border-cherish-gray-200 shadow-soft">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">User Experience Features</h3>
            <p className="text-sm text-cherish-gray-600">Control how users can customize their profiles and posts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-cherish-gray-50 hover:bg-white transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-gray-600" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Restrict Avatar Uploads</div>
                  <div className="text-sm text-cherish-gray-600">Prevent users from uploading profile pictures</div>
                </div>
              </div>
              <Toggle
                enabled={settings.prohibitAvatars}
                onChange={(value) => updateSetting('prohibitAvatars', value)}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-cherish-gray-50 hover:bg-white transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-gray-600" fill="currentColor">
                    <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Restrict Image Uploads</div>
                  <div className="text-sm text-cherish-gray-600">Prohibit image attachments on posts</div>
                </div>
              </div>
              <Toggle
                enabled={settings.prohibitImageUpload}
                onChange={(value) => updateSetting('prohibitImageUpload', value)}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-cherish-gray-50 hover:bg-white transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-gray-600" fill="currentColor">
                    <path d="M18,16V10H12L10,8H4A2,2 0 0,0 2,10V18A2,2 0 0,0 4,20H18A2,2 0 0,0 20,18V18A2,2 0 0,0 18,16Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Restrict GIF Attachments</div>
                  <div className="text-sm text-cherish-gray-600">Prohibit animated GIF uploads on posts</div>
                </div>
              </div>
              <Toggle
                enabled={settings.prohibitGifAttachment}
                onChange={(value) => updateSetting('prohibitGifAttachment', value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-cherish-yellow-mono rounded-2xl bg-cherish-yellow-light hover:bg-white transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-cherish-yellow rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark" fill="currentColor">
                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Post Visibility Control</div>
                  <div className="text-sm text-cherish-gray-700">Allow users to set post visibility (public/private/team)</div>
                </div>
              </div>
              <Toggle
                enabled={settings.enablePostVisibility}
                onChange={(value) => updateSetting('enablePostVisibility', value)}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-cherish-gray-50 hover:bg-white transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-gray-600" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16,16.5H8V15H16V16.5M16,13H8V11.5H16V13M16,9.5H8V8H16V9.5Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Department Filtering</div>
                  <div className="text-sm text-cherish-gray-600">Allow department-based filtering in analytics leaderboard</div>
                </div>
              </div>
              <Toggle
                enabled={settings.allowDepartmentFilter}
                onChange={(value) => updateSetting('allowDepartmentFilter', value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Admin-Only Features */}
      <div className="section-divider">
        <div className="p-8 bg-gradient-to-br from-red-50 to-white rounded-3xl border border-red-200 shadow-soft">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shadow-soft">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-600" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
              </svg>
            </div>
            <div>
              <h3 className="settings-subheader mb-1">Admin-Only Features</h3>
              <p className="text-sm text-red-700">Restrict access to sensitive features for non-admin users</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-6 border border-red-200 rounded-2xl bg-white hover:bg-red-50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600" fill="currentColor">
                    <path d="M1,11H23L12,2M12,6L19,10H5M19,13H5V20H19M8,15V18H11V15H8Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Hide Analytics Screens</div>
                  <div className="text-sm text-cherish-gray-600">Make all analytics data admin-only</div>
                </div>
              </div>
              <Toggle
                enabled={settings.hideAnalytics}
                onChange={(value) => updateSetting('hideAnalytics', value)}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-red-200 rounded-2xl bg-white hover:bg-red-50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shadow-soft">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600" fill="currentColor">
                    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-cherish-dark">Hide Leaderboard Widget</div>
                  <div className="text-sm text-cherish-gray-600 leading-relaxed">Hide recognition leaderboard from non-admin users</div>
                </div>
              </div>
              <Toggle
                enabled={settings.hideRecognizedWidget}
                onChange={(value) => updateSetting('hideRecognizedWidget', value)}
              />
            </div>
          </div>
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
