'use client'

import { useState } from 'react'
import Toggle from '@/components/Toggle'
import Tooltip from '@/components/Tooltip'

export default function SecurityLogin() {
  const [loginMethods, setLoginMethods] = useState({
    usernamePassword: false, // Start with false as specified
    mfa: false,
    google: false,
    office365: false,
  })

  const [allowedDomains, setAllowedDomains] = useState('app.cherishly.com')
  const [mfaEnforcementDate, setMfaEnforcementDate] = useState('')
  const [allowAutoJoin, setAllowAutoJoin] = useState(false)
  const [rewardsSettings, setRewardsSettings] = useState({
    autoAddRewards: false,
    autoApproval: 'never',
  })

  const handleSave = () => {
    console.log('Saving security and login settings...', {
      loginMethods,
      allowedDomains,
      mfaEnforcementDate,
      rewardsSettings,
    })
  }

  const handleSetupSSO = () => {
    console.log('Opening SSO integration setup...')
  }

  const approvalOptions = [
    'Never approve',
    '$5.00 and under',
    '$25.00 and under', 
    '$50.00 and under',
    '$100.00 and under',
    '$500.00 and under',
    'All'
  ]

  return (
    <div className="settings-section">
      <h2 className="settings-header">Security & Login methods</h2>

      {/* Login Methods */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="settings-subheader">
              Login to 'app.cherishly.com'
            </h3>

            <div className="space-y-6">
              {/* Username and Password Toggle */}
              <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-yellow-mono" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-cherish-dark">Username and password</div>
                    <div className="text-sm text-cherish-gray-600">Basic authentication method</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Tooltip content="This is the least secure method. Consider enabling MFA or SSO for stronger protection." />
                  <Toggle
                    enabled={loginMethods.usernamePassword}
                    onChange={(value) => setLoginMethods(prev => ({ ...prev, usernamePassword: value, mfa: value ? prev.mfa : false }))}
                  />
                </div>
              </div>

              {/* MFA Section - Only show when Username/Password is enabled */}
              {loginMethods.usernamePassword && (
                <div className="ml-6 space-y-4">
                  <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-cherish-yellow-light hover:shadow-soft transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-cherish-yellow rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark" fill="currentColor">
                          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-cherish-dark">Multi-Factor Authentication (MFA)</div>
                        <div className="text-sm text-cherish-gray-700">Enhanced security verification</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Tooltip content="MFA requires users to provide additional verification (e.g., SMS code, authenticator app) beyond username and password. Enhances account security." />
                      <Toggle
                        enabled={loginMethods.mfa}
                        onChange={(value) => setLoginMethods(prev => ({ ...prev, mfa: value }))}
                      />
                    </div>
                  </div>

                  {/* MFA Date - Only show when MFA is enabled */}
                  {loginMethods.mfa && (
                    <div className="ml-6 p-6 bg-cherish-yellow-light border border-cherish-yellow rounded-2xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <label className="block text-sm font-semibold text-cherish-dark">
                          Enforce MFA on
                        </label>
                        <Tooltip content="Choose a date when MFA becomes mandatory. Until then, users have a grace period to enroll." />
                      </div>
                      <input
                        type="date"
                        value={mfaEnforcementDate}
                        onChange={(e) => setMfaEnforcementDate(e.target.value)}
                        className="form-input max-w-xs"
                        placeholder="Select enforcement date"
                      />
                    </div>
                  )}

                  {/* Additional Checkboxes - Only show when Username/Password is enabled */}
                  <div className="ml-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-cherish-gray-200 rounded-xl bg-white">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={allowAutoJoin}
                          onChange={(e) => setAllowAutoJoin(e.target.checked)}
                          className="h-4 w-4 text-cherish-yellow-mono focus:ring-cherish-yellow border-cherish-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-cherish-dark">
                          Allow users with allowed email domains to create an account and automatically join cherish
                        </span>
                      </div>
                      <Tooltip content="Enables automatic account creation for users from approved domains" />
                    </div>
                  </div>
                </div>
              )}

              {/* SSO Options */}
              <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-cherish-dark">Google Workspace</div>
                    <div className="text-sm text-cherish-gray-600">Single sign-on with Google</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Tooltip content="Allow employees to authenticate using their Google Workspace credentials." />
                  <Toggle
                    enabled={loginMethods.google}
                    onChange={(value) => setLoginMethods(prev => ({ ...prev, google: value }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-6 border border-cherish-gray-200 rounded-2xl bg-white hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
                      <path d="M11.4 24H12.6C18.6 24 22 20.6 22 14.6V9.4C22 3.4 18.6 0 12.6 0H11.4C5.4 0 2 3.4 2 9.4V14.6C2 20.6 5.4 24 11.4 24ZM4 9.4C4 4.6 6.6 2 11.4 2H12.6C17.4 2 20 4.6 20 9.4V14.6C20 19.4 17.4 22 12.6 22H11.4C6.6 22 4 19.4 4 14.6V9.4Z"/>
                      <path d="M8.5 7.4C9.3 7.4 10 8.1 10 8.9S9.3 10.4 8.5 10.4 7 9.7 7 8.9 7.7 7.4 8.5 7.4M15.5 7.4C16.3 7.4 17 8.1 17 8.9S16.3 10.4 15.5 10.4 14 9.7 14 8.9 14.7 7.4 15.5 7.4M12 18.5C14.5 18.5 16.7 16.3 16.7 13.8H7.3C7.3 16.3 9.5 18.5 12 18.5Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-cherish-dark">Microsoft 365</div>
                    <div className="text-sm text-cherish-gray-600">Single sign-on with Office 365</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Tooltip content="Allow employees to authenticate using their Microsoft 365 credentials." />
                  <Toggle
                    enabled={loginMethods.office365}
                    onChange={(value) => setLoginMethods(prev => ({ ...prev, office365: value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Allowed Email Domains */}
          <div className="section-divider">
            <div className="flex items-center space-x-3 mb-4">
              <label className="block text-sm font-semibold text-cherish-dark">
                Allowed Email Domains
              </label>
              <Tooltip content="List all approved company domains (e.g., acme.com). Only users with these domains can self-register and join automatically." />
            </div>
            <input
              type="text"
              value={allowedDomains}
              onChange={(e) => setAllowedDomains(e.target.value)}
              className="form-input"
              placeholder="Enter domains (e.g., yourcompany.com, acme.org)"
            />
            <p className="mt-2 text-sm text-cherish-gray-600">
              Separate multiple domains with commas. Users with email addresses from these domains can automatically create accounts.
            </p>
          </div>

          {/* Rewards Catalog Settings */}
          <div className="section-divider">
            <h3 className="settings-subheader">Rewards Catalog</h3>
            <p className="settings-description">Configure automatic rewards management and approval settings</p>
            
            <div className="space-y-6">
              <div className="p-6 border border-cherish-gray-200 rounded-2xl bg-white">
                <Toggle
                  enabled={rewardsSettings.autoAddRewards}
                  onChange={(value) => setRewardsSettings(prev => ({ ...prev, autoAddRewards: value }))}
                  label="Automatically add new rewards"
                  description="Enable this to automatically add new Cherish marketplace rewards to your company catalog."
                  className="block"
                />
              </div>

              <div className="p-6 border border-cherish-gray-200 rounded-2xl bg-white">
                <div className="flex items-center space-x-3 mb-4">
                  <label className="block text-sm font-semibold text-cherish-dark">
                    Automatic reward approvals
                  </label>
                  <Tooltip content="Configure which reward values can be automatically approved without admin intervention" />
                </div>
                <select
                  value={rewardsSettings.autoApproval}
                  onChange={(e) => setRewardsSettings(prev => ({ ...prev, autoApproval: e.target.value }))}
                  className="form-input max-w-sm"
                >
                  {approvalOptions.map((option) => (
                    <option key={option} value={option.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-sm text-cherish-gray-600 leading-relaxed">
                  Select which reward denominations are auto-approved. Higher value redemptions may still require admin approval for budget control.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Single Sign-On */}
          <div className="bg-gradient-to-br from-cherish-yellow-light to-white p-8 rounded-3xl border border-cherish-yellow shadow-soft">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <div>
                <h3 className="settings-subheader mb-2">
                  Single Sign-On (SSO) Integration
                </h3>
                <div className="flex items-center space-x-2">
                  <Tooltip content="SSO is the most secure login method. It centralizes authentication via your identity provider (Okta, OneLogin, SAML) and simplifies user access." />
                  <span className="text-xs text-cherish-gray-600 font-medium px-2 py-1 bg-cherish-yellow rounded-full">RECOMMENDED</span>
                </div>
              </div>
            </div>
            
            <p className="settings-description">
              Configure your SSO provider for the most secure authentication experience. You will need metadata from your identity provider (IdP) such as SAML URL, entity ID, and certificate.
            </p>
            
            <button
              onClick={handleSetupSSO}
              className="btn-primary w-full mb-4"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
                <span>Set up SSO Integration</span>
              </span>
            </button>
            
            <div className="bg-white p-4 rounded-2xl border border-cherish-gray-200">
              <div className="text-sm text-cherish-gray-700 leading-relaxed">
                <strong className="text-cherish-dark">Note:</strong> SSO authentication using your identity provider (e.g., Okta, OneLogin, SAML) is the most secure login method and streamlines user access management.
              </div>
            </div>
          </div>

          {/* Security Logs - Redesigned as buttons */}
          <div>
            <h3 className="settings-subheader">Security Logs</h3>
            <p className="settings-description">Access detailed logs and audit trails for your Cherish account</p>
            
            <div className="grid grid-cols-1 gap-4">
              {/* User Audit Log Button */}
              <div className="security-log-btn group relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cherish-yellow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1.5V3.5L21 9ZM17 11C17.56 11 18 11.44 18 12S17.56 13 17 13 16 12.56 16 12 16.44 11 17 11ZM14 20V22H2V20S2 15 12 15 14 20 14 20ZM8 20C8.67 20 9.67 20.33 11 20.67V18.44C9.11 17.56 7 18.78 7 20H8Z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-cherish-dark">User Audit Log</div>
                      <div className="text-sm text-cherish-gray-600">Track user data modifications</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tooltip 
                      content="User audit log lists each change to user data in your Cherish account including date, time, who made the change, who was modified, and what changes were made."
                    />
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark group-hover:translate-x-1 transition-transform duration-300" fill="currentColor">
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Login History Button */}
              <div className="security-log-btn group relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cherish-yellow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark" fill="currentColor">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M11,7H13V13H11V7Z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-cherish-dark">Login History</div>
                      <div className="text-sm text-cherish-gray-600">Monitor user login activities</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tooltip 
                      content="Login history lists each user who has logged into your Cherish account including date, time, location, authentication method, and IP address."
                    />
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark group-hover:translate-x-1 transition-transform duration-300" fill="currentColor">
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Company Audit Log Button */}
              <div className="security-log-btn group relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-cherish-yellow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark" fill="currentColor">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2ZM4 11.5L5.5 11.5L5.5 13L7 13L7 14.5L5.5 14.5L5.5 16L4 16L4 14.5L2.5 14.5L2.5 13L4 13L4 11.5ZM19.5 7.5L18.5 7.5L18.5 6.5L17.5 6.5L17.5 7.5L16.5 7.5L16.5 8.5L17.5 8.5L17.5 9.5L18.5 9.5L18.5 8.5L19.5 8.5L19.5 7.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-cherish-dark">Company Audit Log</div>
                      <div className="text-sm text-cherish-gray-600">Review all account changes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tooltip 
                      content="Company audit log reviews all changes made to your Cherish account including date, time, the admin who made the changes and what changes were made."
                    />
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-cherish-dark group-hover:translate-x-1 transition-transform duration-300" fill="currentColor">
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
                  </div>
                </div>
              </div>
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
