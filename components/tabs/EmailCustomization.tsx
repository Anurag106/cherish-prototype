'use client'

import { useState } from 'react'
import Toggle from '@/components/Toggle'

export default function EmailCustomization() {
  const [activeEmailTab, setActiveEmailTab] = useState('welcome')
  
  const [welcomeEmail, setWelcomeEmail] = useState({
    subject: '',
    title: '',
    body: '',
    ctaText: '',
  })

  const [inviteEmail, setInviteEmail] = useState({
    subject: '',
    title: '',
    body: '',
  })

  const [emailSettings, setEmailSettings] = useState({
    useCompanyLogo: false,
    tearToPosts: true,
    pointsReminders: true,
    digestMessages: true,
    digestActivity: false,
    birthdayReminders: true,
    welcomeEmailToNewUsers: true,
  })

  const handleSave = () => {
    console.log('Saving email customization settings...', {
      welcomeEmail,
      inviteEmail,
      emailSettings,
    })
  }

  const handlePreview = (emailType: 'welcome' | 'invite') => {
    console.log(`Previewing ${emailType} email...`)
  }

  return (
    <div className="settings-section">
      <h2 className="settings-header">Email Customization</h2>
      <p className="settings-description">Configure email templates and communication settings</p>

      {/* Email Logo Settings - Moved to Top */}
      <div className="p-8 bg-gradient-to-br from-cherish-yellow-light to-white rounded-3xl border border-cherish-yellow shadow-soft">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-0">Email Logo</h3>
            <p className="text-sm text-cherish-gray-600">Configure your company logo in emails</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-cherish-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-yellow-mono" fill="currentColor">
                <path d="M9,11H7V9H9V11M13,11H11V9H13V11M17,11H15V9H17V11M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-cherish-dark">Use Company Logo in emails</div>
              <div className="text-sm text-cherish-gray-600">Display your logo in all email communications</div>
            </div>
          </div>
          <Toggle
            enabled={emailSettings.useCompanyLogo}
            onChange={(value) => setEmailSettings(prev => ({ ...prev, useCompanyLogo: value }))}
          />
        </div>
      </div>

      {/* Email Templates with Sub-tabs */}
      <div>
        <h3 className="settings-subheader">Email Templates</h3>
        
        {/* Sub-tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl max-w-fit">
            <button
              onClick={() => setActiveEmailTab('welcome')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeEmailTab === 'welcome'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Welcome Email
            </button>
            <button
              onClick={() => setActiveEmailTab('invite')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeEmailTab === 'invite'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Invite Email
            </button>
          </div>
        </div>

        {/* Email Template Content */}
        <div className="bg-white p-8 rounded-3xl border border-cherish-gray-200 shadow-soft">
          {activeEmailTab === 'welcome' ? (
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cherish-yellow rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cherish-dark" fill="currentColor">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-cherish-dark">Welcome Email Template</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Subject Line</label>
                  <input
                    type="text"
                    value={welcomeEmail.subject}
                    onChange={(e) => setWelcomeEmail(prev => ({ ...prev, subject: e.target.value }))}
                    className="form-input"
                    placeholder="Enter a subject line for your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Email Title</label>
                  <input
                    type="text"
                    value={welcomeEmail.title}
                    onChange={(e) => setWelcomeEmail(prev => ({ ...prev, title: e.target.value }))}
                    className="form-input"
                    placeholder="Enter a brief title or heading for your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Email Body</label>
                  <textarea
                    rows={5}
                    value={welcomeEmail.body}
                    onChange={(e) => setWelcomeEmail(prev => ({ ...prev, body: e.target.value }))}
                    className="form-input resize-none"
                    placeholder="Enter the body text for your emails so users understand how to get started..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Call-to-Action Button Text</label>
                  <input
                    type="text"
                    value={welcomeEmail.ctaText}
                    onChange={(e) => setWelcomeEmail(prev => ({ ...prev, ctaText: e.target.value }))}
                    className="form-input max-w-xs"
                    placeholder="e.g. Give a Point!"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handlePreview('welcome')}
                    className="btn-secondary"
                  >
                    <span className="flex items-center space-x-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                      </svg>
                      <span>Preview</span>
                    </span>
                  </button>
                  <button className="btn-primary">
                    <span className="flex items-center space-x-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
                      </svg>
                      <span>Save Template</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

          ) : (
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" fill="currentColor">
                    <path d="M12,2A3,3 0 0,1 15,5V7H19A1,1 0 0,1 20,8V19A1,1 0 0,1 19,20H5A1,1 0 0,1 4,19V8A1,1 0 0,1 5,7H9V5A3,3 0 0,1 12,2M12,4A1,1 0 0,0 11,5V7H13V5A1,1 0 0,0 12,4Z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-cherish-dark">Invite Email Template</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Subject Line</label>
                  <input
                    type="text"
                    value={inviteEmail.subject}
                    onChange={(e) => setInviteEmail(prev => ({ ...prev, subject: e.target.value }))}
                    className="form-input"
                    placeholder="Enter subject line for your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Email Title</label>
                  <input
                    type="text"
                    value={inviteEmail.title}
                    onChange={(e) => setInviteEmail(prev => ({ ...prev, title: e.target.value }))}
                    className="form-input"
                    placeholder="Enter a brief title or heading for your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">Email Body</label>
                  <textarea
                    rows={5}
                    value={inviteEmail.body}
                    onChange={(e) => setInviteEmail(prev => ({ ...prev, body: e.target.value }))}
                    className="form-input resize-none"
                    placeholder="Let employees know they need to create an account and join the team..."
                  />
                </div>

                <div className="bg-cherish-yellow-light p-6 rounded-2xl border border-cherish-yellow">
                  <div className="text-sm text-cherish-dark">
                    <div className="font-semibold mb-4 text-cherish-dark">Email Preview</div>
                    <div className="space-y-3">
                      <div className="font-semibold">Hi [First Name],</div>
                      <div>Ready to get started with Cherish?</div>
                      <div>Please create your account using the link below to join our employee recognition platform:</div>
                      <div className="mt-4">
                        <div className="inline-block bg-cherish-dark text-white px-8 py-3 rounded-2xl text-center font-semibold">
                          Create Account
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handlePreview('invite')}
                    className="btn-secondary"
                  >
                    <span className="flex items-center space-x-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                      </svg>
                      <span>Preview</span>
                    </span>
                  </button>
                  <button className="btn-primary">
                    <span className="flex items-center space-x-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
                      </svg>
                      <span>Save Template</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Communication Settings */}
      <div className="section-divider">
        <h3 className="settings-subheader">Email Communication Settings</h3>
        <p className="settings-description">
          Configure which email notifications are sent to your employees. Note: Opting out of certain emails might reduce employee engagement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${emailSettings.tearToPosts ? 'bg-cherish-yellow-mono' : 'bg-cherish-gray-300'}`}></div>
                <div>
                  <div className="font-semibold text-cherish-dark">Recognition Posts</div>
                  <div className="text-sm text-cherish-gray-600">Notifications about new recognition posts</div>
                </div>
              </div>
              <Toggle
                enabled={emailSettings.tearToPosts}
                onChange={(value) => setEmailSettings(prev => ({ ...prev, tearToPosts: value }))}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${emailSettings.pointsReminders ? 'bg-cherish-yellow-mono' : 'bg-cherish-gray-300'}`}></div>
                <div>
                  <div className="font-semibold text-cherish-dark">Points Reminders</div>
                  <div className="text-sm text-cherish-gray-600">Remind employees to give recognition points</div>
                </div>
              </div>
              <Toggle
                enabled={emailSettings.pointsReminders}
                onChange={(value) => setEmailSettings(prev => ({ ...prev, pointsReminders: value }))}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${emailSettings.digestMessages ? 'bg-cherish-yellow-mono' : 'bg-cherish-gray-300'}`}></div>
                <div>
                  <div className="font-semibold text-cherish-dark">Digest Messages</div>
                  <div className="text-sm text-cherish-gray-600">Weekly summary of platform activity</div>
                </div>
              </div>
              <Toggle
                enabled={emailSettings.digestMessages}
                onChange={(value) => setEmailSettings(prev => ({ ...prev, digestMessages: value }))}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${emailSettings.digestActivity ? 'bg-cherish-yellow-mono' : 'bg-cherish-gray-300'}`}></div>
                <div>
                  <div className="font-semibold text-cherish-dark">Activity Digest</div>
                  <div className="text-sm text-cherish-gray-600">Detailed activity reports and analytics</div>
                </div>
              </div>
              <Toggle
                enabled={emailSettings.digestActivity}
                onChange={(value) => setEmailSettings(prev => ({ ...prev, digestActivity: value }))}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${emailSettings.birthdayReminders ? 'bg-cherish-yellow-mono' : 'bg-cherish-gray-300'}`}></div>
                <div>
                  <div className="font-semibold text-cherish-dark">Birthday Reminders</div>
                  <div className="text-sm text-cherish-gray-600">Celebrate team members&apos; birthdays</div>
                </div>
              </div>
              <Toggle
                enabled={emailSettings.birthdayReminders}
                onChange={(value) => setEmailSettings(prev => ({ ...prev, birthdayReminders: value }))}
              />
            </div>

            <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${emailSettings.welcomeEmailToNewUsers ? 'bg-cherish-yellow-mono' : 'bg-cherish-gray-300'}`}></div>
                <div>
                  <div className="font-semibold text-cherish-dark">Welcome Emails</div>
                  <div className="text-sm text-cherish-gray-600">Automatically send welcome emails to new users</div>
                </div>
              </div>
              <Toggle
                enabled={emailSettings.welcomeEmailToNewUsers}
                onChange={(value) => setEmailSettings(prev => ({ ...prev, welcomeEmailToNewUsers: value }))}
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
              <span>Save All Settings</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
