'use client'

import { useState } from 'react'
import { 
  ChevronLeftIcon,
  InformationCircleIcon,
  CameraIcon
} from '@heroicons/react/24/outline'

interface ProfileSettingsPageProps {
  onBack: () => void;
}

export default function ProfileSettingsPage({ onBack }: ProfileSettingsPageProps) {
  const [activeTab, setActiveTab] = useState('basic')
  const [emailNotifications, setEmailNotifications] = useState({
    posts: true,
    allowance: true,
    achievements: true,
    comments: true,
    activityUpdate: true,
    announcements: true,
    flashPoints: true
  })
  const [slackNotifications, setSlackNotifications] = useState({
    posts: true,
    addOns: true,
    announcements: true,
    workAnniversaries: true,
    companyBirthdays: true,
    allowance: true
  })
  const [celebrations, setCelebrations] = useState({
    workAnniversary: { celebrate: true, private: false },
    birthday: { celebrate: true, private: false }
  })

  const tabs = [
    { id: 'basic', label: 'Basic Settings' },
    { id: 'email', label: 'Email Notifications' },
    { id: 'slack', label: 'Slack Notifications' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'security', label: 'Security' }
  ]

  const renderBasicSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">First name</label>
          <div className="text-cherish-gray-700">Biplob</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Preferred first name</label>
          <div className="text-cherish-gray-700">Biplob</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Last name</label>
          <div className="text-cherish-gray-700">Chakraborty</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Date of birth</label>
          <div className="text-cherish-gray-700">October 15</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Hired on</label>
          <div className="text-cherish-gray-700">2023-05-25</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Email</label>
          <div className="text-cherish-gray-700">biplob.chakraborty@mindbodyonline.com</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Manager email</label>
          <div className="text-cherish-gray-700">alex.klein@mindbodyonline.com</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Cost center</label>
          <div className="text-cherish-gray-700">-</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Country</label>
          <div className="text-cherish-gray-700">IN</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">
            Time zone
            <InformationCircleIcon className="inline w-4 h-4 ml-1 text-cherish-gray-400" />
          </label>
          <div className="text-cherish-gray-700">Asia/Kolkata</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-2">Locale</label>
          <select className="w-full px-4 py-2 border border-cherish-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow">
            <option>Automatic</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-cherish-dark mb-4">Avatar</label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cherish-purple to-cherish-purple-light rounded-3xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            BC
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-cherish-gray-200 hover:bg-cherish-gray-300 text-cherish-gray-700 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2">
              <CameraIcon className="w-4 h-4" />
              <span>Choose File</span>
            </button>
            <span className="text-sm text-cherish-gray-500">No file chosen</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmailNotifications = () => (
    <div className="space-y-6">
      {Object.entries({
        posts: 'notify me when I receive a post',
        allowance: 'remind me to use my recognition allowance',
        achievements: 'notify me when I receive a new achievement',
        comments: 'notify me of comments on posts I\'m involved with',
        activityUpdate: 'inform me of interesting activity on Bonusly, including birthdays and work anniversaries',
        announcements: 'notify me about company announcements',
        flashPoints: 'notify me about Flash Points events'
      }).map(([key, label]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <p className="text-sm text-cherish-gray-600">{label}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications[key as keyof typeof emailNotifications]}
              onChange={(e) => setEmailNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-cherish-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cherish-yellow/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cherish-yellow-mono"></div>
          </label>
        </div>
      ))}
      
      <div className="pt-6">
        <button className="bg-cherish-dark hover:bg-cherish-dark/90 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Save Preferences
        </button>
      </div>
    </div>
  )

  const renderSlackNotifications = () => (
    <div className="space-y-6">
      {Object.entries({
        posts: 'notify me when I receive a post',
        addOns: 'notify me when people relevant to me receive posts',
        announcements: 'notify me about company announcements',
        workAnniversaries: 'Shows notifications for work anniversaries',
        companyBirthdays: 'Shows notifications for company birthdays',
        allowance: 'remind me to use my recognition allowance'
      }).map(([key, label]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-1">
              {key === 'addOns' ? 'Add-ons' : key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <p className="text-sm text-cherish-gray-600">{label}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={slackNotifications[key as keyof typeof slackNotifications]}
              onChange={(e) => setSlackNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-cherish-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cherish-yellow/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cherish-yellow-mono"></div>
          </label>
        </div>
      ))}
      
      <div className="pt-6">
        <button className="bg-cherish-dark hover:bg-cherish-dark/90 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Save Preferences
        </button>
      </div>
    </div>
  )

  const renderCelebrations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-1">Work Anniversary</label>
          <p className="text-sm text-cherish-gray-600">May 25, 2023</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={celebrations.workAnniversary.celebrate}
              onChange={(e) => setCelebrations(prev => ({
                ...prev,
                workAnniversary: { ...prev.workAnniversary, celebrate: e.target.checked }
              }))}
              className="w-4 h-4 text-cherish-yellow-mono bg-cherish-gray-100 border-cherish-gray-300 rounded focus:ring-cherish-yellow focus:ring-2"
            />
            <span className="text-sm text-cherish-dark">Celebrate</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={celebrations.workAnniversary.private}
              onChange={(e) => setCelebrations(prev => ({
                ...prev,
                workAnniversary: { ...prev.workAnniversary, private: e.target.checked }
              }))}
              className="w-4 h-4 text-cherish-yellow-mono bg-cherish-gray-100 border-cherish-gray-300 rounded focus:ring-cherish-yellow focus:ring-2"
            />
            <span className="text-sm text-cherish-dark">Private</span>
            <InformationCircleIcon className="w-4 h-4 text-cherish-gray-400" />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-semibold text-cherish-dark mb-1">Birthday</label>
          <p className="text-sm text-cherish-gray-600">October 15</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={celebrations.birthday.celebrate}
              onChange={(e) => setCelebrations(prev => ({
                ...prev,
                birthday: { ...prev.birthday, celebrate: e.target.checked }
              }))}
              className="w-4 h-4 text-cherish-yellow-mono bg-cherish-gray-100 border-cherish-gray-300 rounded focus:ring-cherish-yellow focus:ring-2"
            />
            <span className="text-sm text-cherish-dark">Celebrate</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={celebrations.birthday.private}
              onChange={(e) => setCelebrations(prev => ({
                ...prev,
                birthday: { ...prev.birthday, private: e.target.checked }
              }))}
              className="w-4 h-4 text-cherish-yellow-mono bg-cherish-gray-100 border-cherish-gray-300 rounded focus:ring-cherish-yellow focus:ring-2"
            />
            <span className="text-sm text-cherish-dark">Private</span>
            <InformationCircleIcon className="w-4 h-4 text-cherish-gray-400" />
          </label>
        </div>
      </div>
      
      <div className="pt-6">
        <button className="bg-cherish-dark hover:bg-cherish-dark/90 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Update Celebrations
        </button>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-cherish-dark mb-4">Change password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-2">Current password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-cherish-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-2">New password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-cherish-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-2">Confirm password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-cherish-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow"
            />
          </div>
          <button className="bg-cherish-dark hover:bg-cherish-dark/90 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
            Submit
          </button>
        </div>
      </div>

      <div className="border-t border-cherish-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-cherish-dark mb-4">Multi factor authentication</h3>
        <p className="text-cherish-gray-600 mb-4">Multi factor authentication is disabled for your account.</p>
        <button className="bg-cherish-dark hover:bg-cherish-dark/90 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Enable
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-yellow-light"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-cherish-dark">Profile Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-cherish-gray-100">
          {/* Tabs */}
          <div className="flex border-b border-cherish-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'text-cherish-dark border-b-2 border-cherish-yellow-mono bg-cherish-yellow-light/30'
                    : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-cherish-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'basic' && renderBasicSettings()}
            {activeTab === 'email' && renderEmailNotifications()}
            {activeTab === 'slack' && renderSlackNotifications()}
            {activeTab === 'celebrations' && renderCelebrations()}
            {activeTab === 'security' && renderSecurity()}
          </div>
        </div>
      </div>
    </div>
  )
}
