'use client'

import { useState } from 'react'
import { 
  XMarkIcon,
  PhotoIcon,
  EyeIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import Toggle from '@/components/Toggle'
import MultiSelectDropdown from '@/components/MultiSelectDropdown'
import DateFrequencySelector from '@/components/DateFrequencySelector'

interface CelebrationFormProps {
  type: 'welcome' | 'birthday' | 'work-anniversary' | 'custom'
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  initialData?: any
}

export default function CelebrationForm({ type, isOpen, onClose, onSave, initialData }: CelebrationFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || getDefaultName(type),
    categoryName: initialData?.categoryName || '',
    basedOn: initialData?.basedOn || getDefaultBasedOn(type),
    postVisibility: initialData?.postVisibility || 'Public',
    audience: initialData?.audience || 'everyone',
    selectedLocations: initialData?.selectedLocations || [],
    selectedDepartments: initialData?.selectedDepartments || [],
    selectedTeams: initialData?.selectedTeams || [],
    selectedRoles: initialData?.selectedRoles || [],
    customDate: initialData?.customDate || '',
    frequency: initialData?.frequency || 'once',
    pointSettings: initialData?.pointSettings || getDefaultPointSettings(type),
    headline: initialData?.headline || getDefaultHeadline(type),
    message: initialData?.message || getDefaultMessage(type),
    icon: initialData?.icon || null,
    image: initialData?.image || null,
    ...initialData
  })

  const [activeTab, setActiveTab] = useState<'basic' | 'points' | 'customization'>('basic')

  // Mock data for dropdowns
  const mockLocations = [
    { id: '1', name: 'New York Office' },
    { id: '2', name: 'San Francisco Office' },
    { id: '3', name: 'London Office' },
    { id: '4', name: 'Remote Workers' },
    { id: '5', name: 'Tokyo Office' }
  ]

  const mockDepartments = [
    { id: '1', name: 'Engineering' },
    { id: '2', name: 'Marketing' },
    { id: '3', name: 'Sales' },
    { id: '4', name: 'Human Resources' },
    { id: '5', name: 'Finance' },
    { id: '6', name: 'Operations' },
    { id: '7', name: 'Customer Success' }
  ]

  const mockTeams = [
    { id: '1', name: 'Frontend Team', department: 'Engineering' },
    { id: '2', name: 'Backend Team', department: 'Engineering' },
    { id: '3', name: 'DevOps Team', department: 'Engineering' },
    { id: '4', name: 'Growth Team', department: 'Marketing' },
    { id: '5', name: 'Content Team', department: 'Marketing' },
    { id: '6', name: 'Sales Development', department: 'Sales' },
    { id: '7', name: 'Account Management', department: 'Sales' }
  ]

  const mockRoles = [
    { id: '1', name: 'Software Engineer' },
    { id: '2', name: 'Senior Software Engineer' },
    { id: '3', name: 'Team Lead' },
    { id: '4', name: 'Product Manager' },
    { id: '5', name: 'Designer' },
    { id: '6', name: 'Marketing Manager' },
    { id: '7', name: 'Sales Representative' }
  ]

  function getDefaultName(type: string) {
    switch (type) {
      case 'welcome': return 'Welcome'
      case 'birthday': return 'Birthday'
      case 'work-anniversary': return 'Work Anniversary'
      default: return 'Custom Celebration'
    }
  }

  function getDefaultBasedOn(type: string) {
    switch (type) {
      case 'welcome': return 'User account creation date'
      case 'birthday': return 'Birth date'
      case 'work-anniversary': return 'Hire date'
      case 'custom': return 'Custom date'
      default: return 'Custom date'
    }
  }

  function getDefaultHeadline(type: string) {
    switch (type) {
      case 'welcome': return 'Welcome to Cherish!'
      case 'birthday': return 'Happy Birthday!'
      case 'work-anniversary': return "Wow, it's your Work Anniversary!"
      default: return 'Celebration!'
    }
  }

  function getDefaultMessage(type: string) {
    switch (type) {
      case 'welcome': return "@recipient we're so glad you're here! Cherish is where we celebrate and recognize our teammates!"
      case 'birthday': return "Let's celebrate @recipient for their birthday on birth_date . Enjoy your day!"
      case 'work-anniversary': return "Congratulations @recipient on your nth anniversary! Thank you for all of your contributions!"
      default: return "@recipient congratulations!"
    }
  }

  function getDefaultPointSettings(type: string) {
    switch (type) {
      case 'welcome': return { type: 'fixed', amount: 10 }
      case 'birthday': return { type: 'fixed', amount: 50 }
      case 'work-anniversary': return { 
        type: 'milestone', 
        milestones: [
          { year: 1, points: 250 },
          { year: 5, points: 750 },
          { year: 10, points: 1500 },
          { year: 15, points: 2500 }
        ],
        nonMilestonePoints: 100
      }
      default: return { type: 'fixed', amount: 10 }
    }
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePointSettingChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      pointSettings: {
        ...prev.pointSettings,
        [field]: value
      }
    }))
  }

  const addMilestone = () => {
    const milestones = formData.pointSettings.milestones || []
    setFormData((prev: any) => ({
      ...prev,
      pointSettings: {
        ...prev.pointSettings,
        milestones: [...milestones, { year: '', points: '' }]
      }
    }))
  }

  const removeMilestone = (index: number) => {
    const milestones = [...formData.pointSettings.milestones]
    milestones.splice(index, 1)
    setFormData((prev: any) => ({
      ...prev,
      pointSettings: {
        ...prev.pointSettings,
        milestones
      }
    }))
  }

  const updateMilestone = (index: number, field: 'year' | 'points', value: string) => {
    const milestones = [...formData.pointSettings.milestones]
    milestones[index] = { ...milestones[index], [field]: value }
    setFormData((prev: any) => ({
      ...prev,
      pointSettings: {
        ...prev.pointSettings,
        milestones
      }
    }))
  }

  if (!isOpen) return null

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-cherish-dark mb-4">Basic info</h3>
      
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="form-input"
          placeholder="Enter celebration name"
        />
      </div>

      {/* Category Name for Custom celebrations */}
      {type === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={formData.categoryName}
            onChange={(e) => handleInputChange('categoryName', e.target.value)}
            className="form-input"
            placeholder="Enter category name (e.g., Holiday, Achievement, etc.)"
          />
          <p className="text-xs text-cherish-gray-500 mt-1">
            This will appear as a tag on the celebration post.
          </p>
        </div>
      )}

      {/* Based On */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
          Based on
          <InformationCircleIcon className="inline w-4 h-4 ml-1 text-cherish-gray-400" />
        </label>
        {type === 'custom' ? (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.basedOn}
              onChange={(e) => handleInputChange('basedOn', e.target.value)}
              className="form-input"
              placeholder="Enter what this celebration is based on (e.g., Holiday, Achievement)"
            />
            <DateFrequencySelector
              selectedDate={formData.customDate}
              selectedFrequency={formData.frequency}
              onDateChange={(date) => handleInputChange('customDate', date)}
              onFrequencyChange={(frequency) => handleInputChange('frequency', frequency)}
            />
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              value={formData.basedOn}
              className="form-input pr-8 bg-cherish-gray-50 cursor-not-allowed"
              disabled
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-4 h-4 text-cherish-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}
        <p className="text-xs text-cherish-gray-500 mt-1">
          {type === 'custom' 
            ? 'Select the date and frequency for this custom celebration.'
            : 'Posts are automatically sent to the recipient on this date according to user data.'
          }
        </p>
      </div>

      {/* Post Visibility */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Post visibility</label>
        <select
          value={formData.postVisibility}
          onChange={(e) => handleInputChange('postVisibility', e.target.value)}
          className="form-input"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        {type === 'birthday' && (
          <p className="text-xs text-cherish-gray-500 mt-1">
            Celebration visibility settings are overridden by user preferences in their profile settings.
          </p>
        )}
      </div>

      {/* Audience */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Audience</label>
        <p className="text-sm text-cherish-gray-600 mb-3">
          If multiple groups within a category are selected, all users of any selected group will 
          receive a celebration post on their {type === 'welcome' ? 'user account creation date' : 
          type === 'birthday' ? 'birth date' : 'anniversary of their hire date'}.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              All users are eligible to receive a {type} celebration post.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="everyone"
              name="audience"
              value="everyone"
              checked={formData.audience === 'everyone'}
              onChange={(e) => handleInputChange('audience', e.target.value)}
              className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
            />
            <label htmlFor="everyone" className="ml-2 text-sm text-cherish-gray-700">Everyone</label>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="locations"
                name="audience"
                value="locations"
                checked={formData.audience === 'locations'}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
              />
              <label htmlFor="locations" className="ml-2 text-sm text-cherish-gray-700">Select locations</label>
            </div>
            {formData.audience === 'locations' && (
              <div className="ml-6">
                <MultiSelectDropdown
                  options={mockLocations}
                  selectedOptions={formData.selectedLocations}
                  onSelectionChange={(selected) => handleInputChange('selectedLocations', selected)}
                  placeholder="Choose locations..."
                  searchPlaceholder="Search locations..."
                  type="locations"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="departments"
                name="audience"
                value="departments"
                checked={formData.audience === 'departments'}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
              />
              <label htmlFor="departments" className="ml-2 text-sm text-cherish-gray-700">Select departments</label>
            </div>
            {formData.audience === 'departments' && (
              <div className="ml-6">
                <MultiSelectDropdown
                  options={mockDepartments}
                  selectedOptions={formData.selectedDepartments}
                  onSelectionChange={(selected) => handleInputChange('selectedDepartments', selected)}
                  placeholder="Choose departments..."
                  searchPlaceholder="Search departments..."
                  type="departments"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="teams"
                name="audience"
                value="teams"
                checked={formData.audience === 'teams'}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
              />
              <label htmlFor="teams" className="ml-2 text-sm text-cherish-gray-700">Select teams</label>
            </div>
            {formData.audience === 'teams' && (
              <div className="ml-6">
                <MultiSelectDropdown
                  options={mockTeams}
                  selectedOptions={formData.selectedTeams}
                  onSelectionChange={(selected) => handleInputChange('selectedTeams', selected)}
                  placeholder="Choose teams..."
                  searchPlaceholder="Search teams..."
                  type="teams"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="roles"
                name="audience"
                value="roles"
                checked={formData.audience === 'roles'}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
              />
              <label htmlFor="roles" className="ml-2 text-sm text-cherish-gray-700">Select roles</label>
            </div>
            {formData.audience === 'roles' && (
              <div className="ml-6">
                <MultiSelectDropdown
                  options={mockRoles}
                  selectedOptions={formData.selectedRoles}
                  onSelectionChange={(selected) => handleInputChange('selectedRoles', selected)}
                  placeholder="Choose roles..."
                  searchPlaceholder="Search roles..."
                  type="roles"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPointSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-cherish-dark mb-4">Point settings</h3>
      
      {type === 'work-anniversary' ? (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-cherish-gray-700 mb-4">
              How do you want to celebrate work anniversaries?
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="same-amount"
                  name="anniversaryType"
                  value="same"
                  checked={formData.pointSettings.type === 'same'}
                  onChange={() => handlePointSettingChange('type', 'same')}
                  className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
                />
                <label htmlFor="same-amount" className="ml-2 text-sm text-cherish-gray-700">
                  Celebrate every year with the same amount of points each year
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="milestone"
                  name="anniversaryType"
                  value="milestone"
                  checked={formData.pointSettings.type === 'milestone'}
                  onChange={() => handlePointSettingChange('type', 'milestone')}
                  className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
                />
                <label htmlFor="milestone" className="ml-2 text-sm text-cherish-gray-700">
                  Celebrate every year and customize milestone years
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="specific"
                  name="anniversaryType"
                  value="specific"
                  checked={formData.pointSettings.type === 'specific'}
                  onChange={() => handlePointSettingChange('type', 'specific')}
                  className="w-4 h-4 text-cherish-yellow-mono border-cherish-gray-300 focus:ring-cherish-yellow"
                />
                <label htmlFor="specific" className="ml-2 text-cherish-gray-700">
                  Only celebrate specific milestone years
                </label>
              </div>
            </div>
          </div>

          {formData.pointSettings.type === 'milestone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
                  Milestone anniversary years
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium text-cherish-gray-700">
                    <div>Year</div>
                    <div>Amount in points</div>
                  </div>
                  {formData.pointSettings.milestones?.map((milestone: any, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="number"
                        value={milestone.year}
                        onChange={(e) => updateMilestone(index, 'year', e.target.value)}
                        className="form-input flex-1"
                        placeholder="Year"
                      />
                      <input
                        type="number"
                        value={milestone.points}
                        onChange={(e) => updateMilestone(index, 'points', e.target.value)}
                        className="form-input flex-1"
                        placeholder="Points"
                      />
                      <button
                        onClick={() => removeMilestone(index)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addMilestone}
                    className="btn-secondary text-sm"
                  >
                    Add year
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
                  Amount in points on non-milestone years
                  <InformationCircleIcon className="inline w-4 h-4 ml-1 text-cherish-gray-400" />
                </label>
                <input
                  type="number"
                  value={formData.pointSettings.nonMilestonePoints || ''}
                  onChange={(e) => handlePointSettingChange('nonMilestonePoints', parseInt(e.target.value))}
                  className="form-input"
                  placeholder="Points for non-milestone years"
                />
                <p className="text-xs text-cherish-gray-500 mt-1">
                  Users will get {formData.pointSettings.nonMilestonePoints || 0} points on anniversary years 2-4, 6-9, 11-14, 16 and beyond.
                </p>
              </div>
            </div>
          )}

          {formData.pointSettings.type === 'specific' && (
            <div>
              <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
                Milestone anniversary years
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-cherish-gray-700">
                  <div>Year</div>
                  <div>Amount in points <InformationCircleIcon className="inline w-4 h-4 ml-1 text-cherish-gray-400" /></div>
                </div>
                {formData.pointSettings.milestones?.map((milestone: any, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="number"
                      value={milestone.year}
                      onChange={(e) => updateMilestone(index, 'year', e.target.value)}
                      className="form-input flex-1"
                      placeholder="Year"
                    />
                    <input
                      type="number"
                      value={milestone.points}
                      onChange={(e) => updateMilestone(index, 'points', e.target.value)}
                      className="form-input flex-1"
                      placeholder="Points"
                    />
                    <button
                      onClick={() => removeMilestone(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMilestone}
                  className="btn-secondary text-sm"
                >
                  Add year
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-4">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Users will not get a work anniversary post on any year not listed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {formData.pointSettings.type === 'same' && (
            <div>
              <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
                Amount in points
                <InformationCircleIcon className="inline w-4 h-4 ml-1 text-cherish-gray-400" />
              </label>
              <input
                type="number"
                value={formData.pointSettings.amount || ''}
                onChange={(e) => handlePointSettingChange('amount', parseInt(e.target.value))}
                className="form-input"
                placeholder="Points amount"
              />
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-3">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Users will get {formData.pointSettings.amount || 0} points on every work anniversary.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-cherish-gray-700 mb-2">
            Amount in points
            <InformationCircleIcon className="inline w-4 h-4 ml-1 text-cherish-gray-400" />
          </label>
          <input
            type="number"
            value={formData.pointSettings.amount || ''}
            onChange={(e) => handlePointSettingChange('amount', parseInt(e.target.value))}
            className="form-input"
            placeholder="Points amount"
          />
          <p className="text-xs text-cherish-gray-500 mt-1">
            Enter 0 to send the celebration post without giving any points.
          </p>
          {type !== 'welcome' && (
            <p className="text-xs text-cherish-gray-500">
              You can send 0 point celebrations without enabling the Posts can be given without points option in Program Settings.
            </p>
          )}
        </div>
      )}
    </div>
  )

  const renderPostCustomization = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cherish-dark">Post customization</h3>
        <button className="btn-ghost inline-flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          Preview
        </button>
      </div>
      
      {/* Icon */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Icon</label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-cherish-yellow-light rounded-2xl flex items-center justify-center">
            {formData.icon ? (
              <img src={formData.icon} alt="Icon" className="w-12 h-12 rounded-xl" />
            ) : (
              <PhotoIcon className="w-8 h-8 text-cherish-yellow-mono" />
            )}
          </div>
          <button className="btn-primary">
            Upload image
          </button>
        </div>
        <p className="text-xs text-cherish-gray-500 mt-2">
          Upload pngs or jpegs. Images should be square for best results.
        </p>
      </div>

      {/* Headline */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={formData.headline}
          onChange={(e) => handleInputChange('headline', e.target.value)}
          className="form-input"
          placeholder="Enter headline"
          maxLength={40}
        />
        <div className="text-right text-xs text-cherish-gray-400 mt-1">
          {formData.headline.length}/40
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Message</label>
        <textarea
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="form-input h-24 resize-none"
          placeholder="Enter message"
          maxLength={100}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-cherish-gray-500">
            Must include &quot;@recipient&quot; to tag the user. {type === 'birthday' ? 'Include &quot;birth_date&quot; to insert the recipient\'s date of birth.' : type === 'work-anniversary' ? 'Include &quot;nth&quot; to insert anniversary year as 1st, 2nd, etc.' : 'Do not include &quot;+&quot; point amount.'}
          </p>
          <div className="text-xs text-cherish-gray-400">
            {formData.message.length}/100
          </div>
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-cherish-gray-700 mb-2">Image</label>
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 bg-cherish-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-cherish-gray-300">
            {formData.image ? (
              <img src={formData.image} alt="Celebration" className="w-full h-full object-cover rounded-2xl" />
            ) : type === 'birthday' ? (
              <div className="text-center">
                <div className="w-16 h-20 mx-auto mb-2 relative">
                  {/* Cupcake illustration */}
                  <div className="w-16 h-12 bg-green-400 rounded-t-full absolute bottom-0"></div>
                  <div className="w-12 h-8 bg-yellow-200 rounded-t-lg absolute bottom-3 left-2"></div>
                  <div className="w-1 h-3 bg-yellow-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                  {/* Confetti dots */}
                  <div className="w-1 h-1 bg-red-400 rounded-full absolute top-2 left-2"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full absolute top-1 right-3"></div>
                  <div className="w-1 h-1 bg-green-400 rounded-full absolute top-3 right-1"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full absolute bottom-1 left-1"></div>
                </div>
              </div>
            ) : type === 'work-anniversary' ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto relative">
                  {/* Trophy/celebration graphic */}
                  <div className="w-8 h-8 bg-green-500 rounded-full absolute top-2 left-4"></div>
                  <div className="w-6 h-4 bg-yellow-400 rounded-t-lg absolute top-6 left-5"></div>
                  <div className="w-1 h-1 bg-red-400 rounded-full absolute top-1 left-2"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full absolute top-0 right-2"></div>
                  <div className="w-1 h-1 bg-green-400 rounded-full absolute top-2 right-0"></div>
                </div>
              </div>
            ) : (
              <PhotoIcon className="w-8 h-8 text-cherish-gray-400" />
            )}
          </div>
          <div>
            <button className="btn-primary mb-2">
              Upload image
            </button>
            <p className="text-xs text-cherish-gray-500">
              Upload pngs or jpegs. Images should be square for best results.
            </p>
            {type === 'work-anniversary' && (
              <p className="text-xs text-cherish-gray-500 mt-1">
                Note: &quot;1&quot; shown here will automatically update to their work anniversary year.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
          <h2 className="text-xl font-bold text-cherish-dark">
            Edit {getDefaultName(type)} Celebration
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-6">
          <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl max-w-fit">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === 'basic'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Basic info
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === 'points'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Point settings
            </button>
            <button
              onClick={() => setActiveTab('customization')}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === 'customization'
                  ? 'bg-white text-cherish-dark shadow-soft'
                  : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
              }`}
            >
              Post customization
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'basic' && renderBasicInfo()}
          {activeTab === 'points' && renderPointSettings()}
          {activeTab === 'customization' && renderPostCustomization()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-cherish-gray-200 bg-cherish-gray-50">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
