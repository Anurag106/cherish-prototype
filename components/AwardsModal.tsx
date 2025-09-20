'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon, 
  TrophyIcon, 
  UserIcon, 
  PlusIcon, 
  HashtagIcon,
  GlobeAltIcon,
  FaceSmileIcon,
  GifIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  CurrencyDollarIcon,
  DocumentArrowUpIcon,
  UsersIcon,
  LockClosedIcon,
  EyeIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface Award {
  id: string
  name: string
  description?: string
  budget: number
  budgetUsed: number
  isTemplated: boolean
  template?: {
    points: number
    message: string
    hashtag?: string
  }
  icon?: string
  color?: string
}

interface AwardsModalProps {
  isOpen: boolean
  onClose: () => void
  availablePoints: number
}

export default function AwardsModal({ isOpen, onClose, availablePoints }: AwardsModalProps) {
  const [step, setStep] = useState<'select' | 'give'>('select')
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [message, setMessage] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'team' | 'private'>('public')
  const [showMyName, setShowMyName] = useState(true)
  const [showCSVUpload, setShowCSVUpload] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [groupName, setGroupName] = useState('')
  const [csvError, setCsvError] = useState('')

  // Mock awards data based on the images
  const awards: Award[] = [
    {
      id: 'above-beyond',
      name: 'Above-and-Beyond',
      description: 'You have 200 🏆 to give out for this award each month.',
      budget: 200,
      budgetUsed: 0,
      isTemplated: false,
      color: 'bg-cherish-green',
      icon: '🏆'
    },
    {
      id: 'happy-customers',
      name: 'Happy Customers',
      description: 'You have 300 🏆 to give out for this award each month.',
      budget: 300,
      budgetUsed: 0,
      isTemplated: false,
      color: 'bg-cherish-blue',
      icon: '😊'
    },
    {
      id: 'safety-award',
      name: 'Safety Award',
      description: 'Template: +20 @receiver_username for keeping safety top-of-mind and purrific! #safety-first',
      budget: 500,
      budgetUsed: 0,
      isTemplated: true,
      template: {
        points: 20,
        message: 'for keeping safety top-of-mind and purrific!',
        hashtag: 'safety-first'
      },
      color: 'bg-cherish-orange',
      icon: '🦺'
    },
    {
      id: 'champion-club-sdr',
      name: 'Champion Club SDR',
      description: 'Supplemental budget for the SDR team',
      budget: 5000,
      budgetUsed: 750,
      isTemplated: false,
      color: 'bg-cherish-purple',
      icon: '🏅'
    },
    {
      id: 'panw-ert-membership',
      name: 'PANW ERT membership',
      description: '113 of 150 total possible awards left to give',
      budget: 150,
      budgetUsed: 37,
      isTemplated: false,
      color: 'bg-cherish-red',
      icon: '🎖️'
    },
    {
      id: 'core-value-winners',
      name: 'Core Value Winners',
      description: 'Awarded quarterly to the person who most embodies each of our core values. Choose a winner based on who is the top receiver of the hashtag this year. There should be 1 winner per hashtag: #peoplefirst, #dotherighthing, #getitdoneright, or #ownit',
      budget: 0,
      budgetUsed: 0,
      isTemplated: false,
      color: 'bg-cherish-yellow',
      icon: '🏆'
    },
    {
      id: 'marketing-quarterly',
      name: 'Marketing Quarterly Awards',
      description: 'This is a quarterly excellence award for members of the Marketing department. Try not to give this award to the same individual multiple times in the same year.',
      budget: 4,
      budgetUsed: 1,
      isTemplated: false,
      color: 'bg-cherish-green-light',
      icon: '📈'
    },
    {
      id: 'volunteer-hours',
      name: 'Volunteer Hours',
      description: 'Use this to celebrate everyone who attends our volunteer events each quarter.',
      budget: 300,
      budgetUsed: 53,
      isTemplated: false,
      color: 'bg-cherish-blue-light',
      icon: '🤝'
    },
    {
      id: 'leadership-award',
      name: 'Leadership Award',
      description: 'Template: +100 @receiver_username for demonstrating what it looks like to be a leader this quarter.',
      budget: 100,
      budgetUsed: 0,
      isTemplated: true,
      template: {
        points: 100,
        message: 'for demonstrating what it looks like to be a leader this quarter.',
        hashtag: 'leadership'
      },
      color: 'bg-cherish-purple-light',
      icon: '👑'
    },
    {
      id: 'teamwork-award',
      name: 'Quarterly #Teamwork Award',
      description: 'Template: +100 @recipient for receiving the most recognition for our teamwork company value!',
      budget: 100,
      budgetUsed: 0,
      isTemplated: true,
      template: {
        points: 100,
        message: 'for receiving the most recognition for our teamwork company value!',
        hashtag: 'teamwork'
      },
      color: 'bg-cherish-orange-light',
      icon: '🤝'
    },
    {
      id: 'promotion-award',
      name: 'Promotion Award',
      description: 'Template: +100 @receiver_username Congratulations on your promotion!!',
      budget: 0,
      budgetUsed: 0,
      isTemplated: true,
      template: {
        points: 100,
        message: 'Congratulations on your promotion!!',
        hashtag: ''
      },
      color: 'bg-cherish-red-light',
      icon: '🎉'
    },
    {
      id: 'anniversary-award',
      name: "It's our anniversary!",
      description: 'Template: +50 @everyone we were founded in 1979 by practicing clinicians',
      budget: 200000,
      budgetUsed: 67850,
      isTemplated: true,
      template: {
        points: 50,
        message: 'we were founded in 1979 by practicing clinicians',
        hashtag: 'skillful'
      },
      color: 'bg-cherish-yellow-light',
      icon: '🎂'
    }
  ]

  const mockUsers = [
    { name: 'Charlotte Marrón', username: '@charlotte.marron', initials: 'CM', color: 'bg-cherish-purple' },
    { name: 'Mia Mavi', username: '@mia.mavi', initials: 'MM', color: 'bg-cherish-green', isTeam: true, teamSize: 8 },
    { name: 'Kai Murasaki', username: '@kai.murasaki', initials: 'KM', color: 'bg-cherish-orange' },
    { name: 'Emi Rosa', username: '@emi.rosa', initials: 'ER', color: 'bg-cherish-red' },
    { name: 'Emma Weiss', username: '@emma.weiss', initials: 'EW', color: 'bg-cherish-blue' },
    { name: 'Evan Vermillion', username: '@evan.vermillion', initials: 'EV', color: 'bg-cherish-yellow' },
    { name: 'Eric Arachnae', username: '@eric.arachnae', initials: 'EA', color: 'bg-cherish-purple-light' },
    { name: 'Evan Williams', username: '@evan.williams', initials: 'EW', color: 'bg-cherish-green-light' }
  ]

  const mockGroups = [
    { name: "Judith Bartels' Team", username: '@judith.bartels.team', type: 'Team', size: 6, color: 'bg-cherish-blue' },
    { name: 'Customer Success', username: '@customer.success', type: 'Department', size: 17, color: 'bg-cherish-orange' },
    { name: 'Boulder HQ', username: '@boulder.hq', type: 'Location', size: 30, color: 'bg-cherish-green' },
    { name: 'Everyone', username: '@everyone', type: 'Everyone', size: 69, color: 'bg-cherish-yellow' }
  ]

  const handleAwardSelect = (award: Award) => {
    setSelectedAward(award)
    if (award.isTemplated && award.template) {
      setAmount(award.template.points.toString())
      setMessage(award.template.message)
      setHashtag(award.template.hashtag || '')
    }
    setStep('give')
  }

  const handleBack = () => {
    setStep('select')
    setSelectedAward(null)
    setRecipient('')
    setAmount('')
    setHashtag('')
    setMessage('')
    setShowCSVUpload(false)
    setCsvFile(null)
    setGroupName('')
    setCsvError('')
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log({ 
      award: selectedAward?.id, 
      recipient, 
      amount, 
      hashtag, 
      message, 
      visibility,
      showMyName,
      csvFile,
      groupName
    })
    onClose()
    handleBack()
  }

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
      setCsvError('')
    } else {
      setCsvError('Please upload a valid CSV file')
    }
  }

  const renderAwardSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <TrophyIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Select Award</h2>
        <p className="text-secondary-600">Choose an award to give recognition</p>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-3">
        {awards.map((award) => (
          <button
            key={award.id}
            onClick={() => handleAwardSelect(award)}
            className="w-full p-4 rounded-xl border border-secondary-200 hover:border-primary-300 bg-white hover:bg-primary-50 transition-all text-left group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center text-white text-xl shadow-sm">
                {award.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-secondary-900 group-hover:text-primary-700 transition-colors">
                    {award.name}
                  </h3>
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-lg">
                    <CurrencyDollarIcon className="w-4 h-4 text-points-green" />
                    <span className="font-semibold text-points-green text-sm">
                      {award.budget === 0 ? '∞' : award.budget - award.budgetUsed}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {award.isTemplated && award.template && (
                    <span className="text-primary-600 font-medium">Template: +{award.template.points} @receiver_username </span>
                  )}
                  {award.description}
                </p>
                {award.budget > 0 && award.budgetUsed > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-accent-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((award.budget - award.budgetUsed) / award.budget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-secondary-500 mt-1">
                      {award.budget - award.budgetUsed} of {award.budget} remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderGiveAward = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 pb-4 border-b border-primary-200">
        <div className={`w-12 h-12 ${selectedAward?.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
          {selectedAward?.icon}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary-900">{selectedAward?.name}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-xl">
              <CurrencyDollarIcon className="w-4 h-4 text-points-green" />
              <span className="font-bold text-points-green text-sm">
                {selectedAward?.budget === 0 ? '∞' : (selectedAward?.budget || 0) - (selectedAward?.budgetUsed || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Selection */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cherish-blue rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
          <label className="font-semibold text-cherish-dark">Recipient</label>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="@recipient"
            className="w-full px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow text-lg"
          />
          
          {/* CSV Upload Option */}
          <button
            onClick={() => setShowCSVUpload(!showCSVUpload)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-cherish-purple hover:bg-cherish-purple-light/20 rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        {showCSVUpload && (
          <div className="p-4 bg-cherish-purple-light/10 rounded-xl border-2 border-dashed border-cherish-purple">
            <div className="flex items-center space-x-3 mb-3">
              <DocumentArrowUpIcon className="w-6 h-6 text-cherish-purple" />
              <span className="font-semibold text-cherish-purple">Add multiple recipients from CSV</span>
            </div>
            <p className="text-sm text-cherish-gray-600 mb-3">
              Upload file of recipient email addresses
            </p>
            
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-cherish-gray-300 rounded-lg cursor-pointer hover:bg-cherish-gray-50 transition-colors"
            >
              <DocumentArrowUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Choose CSV file</span>
            </label>
            
            {csvFile && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-cherish-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-cherish-dark">{csvFile.name}</span>
                  <button
                    onClick={() => setCsvFile(null)}
                    className="text-cherish-red hover:bg-cherish-red-light/20 p-1 rounded"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-cherish-gray-500 mt-1">Group contains 49 recipients.</p>
                
                <div className="mt-3">
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-3 py-2 border border-cherish-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherish-yellow text-sm"
                  />
                  <p className="text-xs text-cherish-gray-500 mt-1">
                    Group name will be automatically converted to an &quot;@handle&quot; shown in the givebox and on the post. Periods &quot;.&quot; will be added in place of spaces. Group name as written is shown in the popover on hover. Do not include special characters, like &quot;@&quot;.
                  </p>
                </div>
              </div>
            )}
            
            {csvError && (
              <p className="text-sm text-cherish-red mt-2">{csvError}</p>
            )}
          </div>
        )}

        {/* User/Group Suggestions */}
        <div className="space-y-2">
          <p className="text-sm text-cherish-gray-600">Type to search users or groups</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {mockUsers.map((user, index) => (
              <button
                key={index}
                onClick={() => setRecipient(user.username)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-cherish-gray-50 transition-colors text-left"
              >
                <div className={`w-10 h-10 ${user.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {user.initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-cherish-dark text-sm">{user.name}</p>
                  <p className="text-xs text-cherish-gray-500">{user.username}</p>
                </div>
                {user.isTeam && (
                  <div className="flex items-center space-x-1 text-cherish-gray-500">
                    <UsersIcon className="w-4 h-4" />
                    <span className="text-xs">{user.teamSize} people</span>
                  </div>
                )}
              </button>
            ))}
            
            {mockGroups.map((group, index) => (
              <button
                key={index}
                onClick={() => setRecipient(group.username)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-cherish-gray-50 transition-colors text-left"
              >
                <div className={`w-10 h-10 ${group.color} rounded-2xl flex items-center justify-center text-white shadow-md`}>
                  {group.type === 'Team' && <UsersIcon className="w-5 h-5" />}
                  {group.type === 'Department' && <TrophyIcon className="w-5 h-5" />}
                  {group.type === 'Location' && <GlobeAltIcon className="w-5 h-5" />}
                  {group.type === 'Everyone' && <GlobeAltIcon className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-cherish-dark text-sm">{group.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-cherish-gray-500">{group.type}</span>
                    <span className="text-xs text-cherish-gray-400">•</span>
                    <span className="text-xs text-cherish-gray-500">{group.size} people</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Amount (if not templated) */}
      {!selectedAward?.isTemplated && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cherish-green rounded-full flex items-center justify-center">
              <PlusIcon className="w-5 h-5 text-white" />
            </div>
            <label className="font-semibold text-cherish-dark">Amount</label>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow text-lg"
          />
        </div>
      )}

      {/* Hashtag (if not templated) */}
      {!selectedAward?.isTemplated && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cherish-purple rounded-full flex items-center justify-center">
              <HashtagIcon className="w-5 h-5 text-white" />
            </div>
            <label className="font-semibold text-cherish-dark">Hashtag</label>
          </div>
          <input
            type="text"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            placeholder="teamwork"
            className="w-full px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow text-lg"
          />
        </div>
      )}

      {/* Message */}
      <div className="space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={selectedAward?.isTemplated ? selectedAward.template?.message : "Amazing work this past year."}
          rows={3}
          disabled={selectedAward?.isTemplated}
          className={`w-full px-4 py-4 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow resize-none text-lg transition-all ${
            selectedAward?.isTemplated ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        />
        
        {selectedAward?.isTemplated && selectedAward.template && (
          <div className="p-3 bg-cherish-yellow-light/20 rounded-xl border border-cherish-yellow/30">
            <p className="text-sm text-cherish-gray-700">
              <span className="font-semibold">Template:</span> +{selectedAward.template.points} @receiver_username {selectedAward.template.message}
              {selectedAward.template.hashtag && ` #${selectedAward.template.hashtag}`}
            </p>
          </div>
        )}
      </div>

      {/* Show my name option */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowMyName(!showMyName)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            showMyName 
              ? 'bg-cherish-blue border-cherish-blue' 
              : 'border-cherish-gray-300 hover:border-cherish-blue'
          }`}
        >
          {showMyName && <CheckIcon className="w-3 h-3 text-white" />}
        </button>
        <label className="text-sm font-medium text-cherish-dark cursor-pointer" onClick={() => setShowMyName(!showMyName)}>
          Show my name on award post
        </label>
      </div>

      {/* Visibility Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-cherish-dark">Visibility</label>
          <button
            onClick={() => setVisibility(visibility === 'public' ? 'team' : visibility === 'team' ? 'private' : 'public')}
            className="flex items-center space-x-2 px-4 py-2 bg-cherish-gray-100 hover:bg-cherish-gray-200 rounded-xl transition-colors"
          >
            {visibility === 'public' && (
              <>
                <GlobeAltIcon className="w-4 h-4 text-cherish-blue" />
                <span className="text-sm font-medium text-cherish-dark">Public</span>
              </>
            )}
            {visibility === 'team' && (
              <>
                <UsersIcon className="w-4 h-4 text-cherish-green" />
                <span className="text-sm font-medium text-cherish-dark">Team</span>
              </>
            )}
            {visibility === 'private' && (
              <>
                <LockClosedIcon className="w-4 h-4 text-cherish-orange" />
                <span className="text-sm font-medium text-cherish-dark">Private</span>
              </>
            )}
          </button>
        </div>
        
        {/* Visibility dropdown */}
        <div className="p-4 bg-cherish-gray-50 rounded-xl">
          <h4 className="font-semibold text-cherish-dark mb-3">Who can see your post?</h4>
          <div className="space-y-3">
            <button
              onClick={() => setVisibility('public')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                visibility === 'public' 
                  ? 'bg-cherish-blue-light text-cherish-blue' 
                  : 'hover:bg-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                visibility === 'public' ? 'bg-cherish-blue' : 'bg-cherish-gray-300'
              }`}>
                <GlobeAltIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Public</p>
                <p className="text-sm text-cherish-gray-600">Everyone on Cherish</p>
              </div>
              {visibility === 'public' && (
                <div className="w-5 h-5 bg-cherish-blue rounded-full flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
            
            <button
              onClick={() => setVisibility('team')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                visibility === 'team' 
                  ? 'bg-cherish-green-light text-cherish-green' 
                  : 'hover:bg-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                visibility === 'team' ? 'bg-cherish-green' : 'bg-cherish-gray-300'
              }`}>
                <UsersIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Team</p>
                <p className="text-sm text-cherish-gray-600">Anyone tagged, their managers, their teams, and admins</p>
              </div>
              {visibility === 'team' && (
                <div className="w-5 h-5 bg-cherish-green rounded-full flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
            
            <button
              onClick={() => setVisibility('private')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                visibility === 'private' 
                  ? 'bg-cherish-orange-light text-cherish-orange' 
                  : 'hover:bg-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                visibility === 'private' ? 'bg-cherish-orange' : 'bg-cherish-gray-300'
              }`}>
                <LockClosedIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Private</p>
                <p className="text-sm text-cherish-gray-600">Anyone tagged, their managers, and admins</p>
              </div>
              {visibility === 'private' && (
                <div className="w-5 h-5 bg-cherish-orange rounded-full flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-4">
          <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
            <FaceSmileIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-yellow" />
          </button>
          <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
            <GifIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-purple" />
          </button>
          <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
            <PhotoIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-green" />
          </button>
          <button className="p-3 hover:bg-cherish-gray-100 rounded-xl transition-colors group">
            <EllipsisHorizontalIcon className="w-6 h-6 text-cherish-gray-500 group-hover:text-cherish-orange" />
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          className="bg-cherish-blue hover:bg-cherish-blue-light text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Award {selectedAward?.isTemplated && selectedAward.template ? selectedAward.template.points : amount || '0'} {selectedAward?.icon}
        </button>
      </div>
    </div>
  )

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary-200">
                  <div className="flex items-center space-x-3">
                    {step === 'give' && (
                      <button
                        onClick={handleBack}
                        className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
                      >
                        <XMarkIcon className="w-6 h-6 text-primary-500 rotate-180" />
                      </button>
                    )}
                    <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrophyIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-900">
                      {step === 'select' ? 'Give an award' : `Give award`}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-xl">
                      <div className="w-6 h-6 bg-points-green rounded-full flex items-center justify-center">
                        <CurrencyDollarIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-points-green">{availablePoints}</span>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6 text-primary-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {step === 'select' ? renderAwardSelection() : renderGiveAward()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
