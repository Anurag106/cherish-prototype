'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon,
  PhotoIcon,
  InformationCircleIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import Toggle from '@/components/Toggle'

interface Incentive {
  id: string
  name: string
  points: number
  audience: string
  claimLimit: string
  limitPeriod: string
  pending: number
  isActive: boolean
  image?: string
  description?: string
  proofRequired?: boolean
  eligibilitySettings?: {
    matchType: 'all' | 'any'
    conditions: Array<{
      field: string
      operator: string
      value: string
    }>
  }
  pointsBudget?: {
    type: 'unlimited' | 'per-employee' | 'total-claims'
    amount: number
    quantity?: number
    period?: string
    claimLimitPerEmployee?: number
  }
  recognitionPost?: {
    message: string
    visibility: 'public' | 'private' | 'team'
  }
  approvalProcess?: {
    type: 'automatic' | 'manual'
    approvers?: Array<{
      level: number
      emails: string[]
    }>
  }
}

interface CreateIncentiveModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (incentive: Partial<Incentive>) => void
  initialData?: Incentive | null
}

export default function CreateIncentiveModal({ isOpen, onClose, onSave, initialData }: CreateIncentiveModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<Incentive>>({
    name: '',
    image: '',
    description: '',
    proofRequired: false,
    eligibilitySettings: {
      matchType: 'all',
      conditions: []
    },
    pointsBudget: {
      type: 'unlimited',
      amount: 50
    },
    recognitionPost: {
      message: '',
      visibility: 'public'
    },
    approvalProcess: {
      type: 'automatic',
      approvers: []
    },
    isActive: true,
    ...initialData
  })

  const steps = [
    { id: 1, name: 'Basic setup', completed: currentStep > 1 },
    { id: 2, name: 'Eligibility settings', completed: currentStep > 2 },
    { id: 3, name: 'Points budget', completed: currentStep > 3 },
    { id: 4, name: 'Recognition posts', completed: currentStep > 4 },
    { id: 5, name: 'Approval process', completed: currentStep > 5 }
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // Calculate derived fields
    let audience = 'Everyone'
    let claimLimit = 'None'
    let limitPeriod = '-'

    // Calculate audience
    if (formData.eligibilitySettings?.conditions && formData.eligibilitySettings.conditions.length > 0) {
      const departments = formData.eligibilitySettings.conditions
        .filter(c => c.field === 'Department')
        .map(c => c.value)
      if (departments.length > 0) {
        audience = departments.join(', ')
      }
    }

    // Calculate claim limit and period
    if (formData.pointsBudget?.type === 'per-employee') {
      claimLimit = `${formData.pointsBudget.claimLimitPerEmployee || 1} per user`
      limitPeriod = formData.pointsBudget.period || 'Month'
    } else if (formData.pointsBudget?.type === 'total-claims') {
      claimLimit = `${formData.pointsBudget.quantity || 100} total`
      limitPeriod = formData.pointsBudget.period || 'Month'
    }

    const incentiveData = {
      ...formData,
      audience,
      claimLimit,
      limitPeriod,
      points: formData.pointsBudget?.amount || 0,
      pending: 0
    }

    onSave(incentiveData)
    onClose()
    setCurrentStep(1)
  }

  const addEligibilityCondition = () => {
    setFormData({
      ...formData,
      eligibilitySettings: {
        ...formData.eligibilitySettings!,
        conditions: [
          ...formData.eligibilitySettings!.conditions,
          { field: 'Department', operator: '=', value: '' }
        ]
      }
    })
  }

  const removeEligibilityCondition = (index: number) => {
    setFormData({
      ...formData,
      eligibilitySettings: {
        ...formData.eligibilitySettings!,
        conditions: formData.eligibilitySettings!.conditions.filter((_, i) => i !== index)
      }
    })
  }

  const updateEligibilityCondition = (index: number, field: string, value: string) => {
    const newConditions = [...formData.eligibilitySettings!.conditions]
    newConditions[index] = { ...newConditions[index], [field]: value }
    setFormData({
      ...formData,
      eligibilitySettings: {
        ...formData.eligibilitySettings!,
        conditions: newConditions
      }
    })
  }

  const addApprover = (level: number) => {
    const newApprovers = [...(formData.approvalProcess?.approvers || [])]
    const existingLevel = newApprovers.find(a => a.level === level)
    
    if (existingLevel) {
      existingLevel.emails.push('')
    } else {
      newApprovers.push({ level, emails: [''] })
    }
    
    setFormData({
      ...formData,
      approvalProcess: {
        ...formData.approvalProcess!,
        approvers: newApprovers
      }
    })
  }

  const removeApprover = (level: number, emailIndex: number) => {
    const newApprovers = [...(formData.approvalProcess?.approvers || [])]
    const levelApprover = newApprovers.find(a => a.level === level)
    
    if (levelApprover) {
      levelApprover.emails.splice(emailIndex, 1)
      if (levelApprover.emails.length === 0) {
        const levelIndex = newApprovers.findIndex(a => a.level === level)
        newApprovers.splice(levelIndex, 1)
      }
    }
    
    setFormData({
      ...formData,
      approvalProcess: {
        ...formData.approvalProcess!,
        approvers: newApprovers
      }
    })
  }

  const updateApproverEmail = (level: number, emailIndex: number, email: string) => {
    const newApprovers = [...(formData.approvalProcess?.approvers || [])]
    const levelApprover = newApprovers.find(a => a.level === level)
    
    if (levelApprover) {
      levelApprover.emails[emailIndex] = email
    }
    
    setFormData({
      ...formData,
      approvalProcess: {
        ...formData.approvalProcess!,
        approvers: newApprovers
      }
    })
  }

  const renderBasicSetup = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-cherish-dark mb-3">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          placeholder="Mammogram Screening"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-cherish-dark mb-3">Image</label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-cherish-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-cherish-gray-300">
            {formData.image ? (
              <img src={formData.image} alt="Incentive" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <PhotoIcon className="w-8 h-8 text-cherish-gray-400" />
            )}
          </div>
          <button className="btn-secondary inline-flex items-center gap-2">
            <PhotoIcon className="w-4 h-4" />
            Upload image
          </button>
        </div>
        <p className="text-xs text-cherish-gray-500 mt-2">
          Upload pngs or jpegs. Images should be square for best results.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-cherish-dark mb-3">Description and instructions</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="form-input"
          placeholder="Early detection of breast cancer significantly improves the chances for successful treatment. Receive 500 points after getting your mammogram."
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-cherish-gray-500">
            Share what users need to do to earn this incentive. Include links to forms to complete or criteria, or supporting resources to refer to.
          </p>
          <span className="text-xs text-cherish-gray-400">442/500</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-cherish-dark">Do users need to attach proof to earn this incentive?</label>
            <p className="text-xs text-cherish-gray-500 mt-1">
              Users can provide text details or upload a jpeg, png, or pdf attachment as evidence.
            </p>
          </div>
          <Toggle
            enabled={formData.proofRequired || false}
            onChange={(enabled) => setFormData({ ...formData, proofRequired: enabled })}
          />
        </div>
      </div>
    </div>
  )

  const renderEligibilitySettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-cherish-dark mb-2">Audience</h4>
        <p className="text-sm text-cherish-gray-600 mb-4">
          Establish which users should be able to view and claim this incentive. Limit users by department, location, team, role, or other custom properties.
        </p>
        
        {formData.eligibilitySettings?.conditions && formData.eligibilitySettings.conditions.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <InformationCircleIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Only {formData.eligibilitySettings.conditions.length === 1 ? '3 users' : '21 users'} can claim this incentive.
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {formData.eligibilitySettings?.conditions && formData.eligibilitySettings.conditions.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setFormData({
                  ...formData,
                  eligibilitySettings: { ...formData.eligibilitySettings!, matchType: 'all' }
                })}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  formData.eligibilitySettings.matchType === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-cherish-gray-100 text-cherish-gray-600 hover:bg-cherish-gray-200'
                }`}
              >
                And
              </button>
              <button
                onClick={() => setFormData({
                  ...formData,
                  eligibilitySettings: { ...formData.eligibilitySettings!, matchType: 'any' }
                })}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  formData.eligibilitySettings.matchType === 'any'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-cherish-gray-100 text-cherish-gray-600 hover:bg-cherish-gray-200'
                }`}
              >
                Or
              </button>
            </div>
          )}

          {formData.eligibilitySettings?.conditions?.map((condition, index) => (
            <div key={index} className="flex gap-3 items-center">
              <select
                value={condition.field}
                onChange={(e) => updateEligibilityCondition(index, 'field', e.target.value)}
                className="form-select flex-1"
              >
                <option value="Department">Department</option>
                <option value="Location">Location</option>
                <option value="Role">Role</option>
                <option value="Team">Team</option>
              </select>
              
              <select
                value={condition.operator}
                onChange={(e) => updateEligibilityCondition(index, 'operator', e.target.value)}
                className="form-select w-20"
              >
                <option value="=">=</option>
                <option value="!=">!=</option>
              </select>
              
              <select
                value={condition.value}
                onChange={(e) => updateEligibilityCondition(index, 'value', e.target.value)}
                className="form-select flex-1"
              >
                <option value="">Select value...</option>
                {condition.field === 'Department' && (
                  <>
                    <option value="Provider billing support">Provider billing support</option>
                    <option value="Provider support">Provider support</option>
                    <option value="Client billing support">Client billing support</option>
                    <option value="Client support">Client support</option>
                    <option value="Customer Success">Customer Success</option>
                  </>
                )}
                {condition.field === 'Location' && (
                  <>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </>
                )}
              </select>
              
              <button
                onClick={() => removeEligibilityCondition(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            onClick={addEligibilityCondition}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            Add filter
          </button>

          {formData.eligibilitySettings?.conditions && formData.eligibilitySettings.conditions.length > 0 && (
            <button
              onClick={() => setFormData({
                ...formData,
                eligibilitySettings: { ...formData.eligibilitySettings!, conditions: [] }
              })}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove all
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const renderPointsBudget = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-cherish-dark mb-2">Points budget</h4>
        <p className="text-sm text-cherish-gray-600 mb-4">
          Do you want to limit how many times this incentive can be claimed?
        </p>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="budgetType"
                value="unlimited"
                checked={formData.pointsBudget?.type === 'unlimited'}
                onChange={(e) => setFormData({
                  ...formData,
                  pointsBudget: { ...formData.pointsBudget!, type: 'unlimited' }
                })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-cherish-dark">Allow unlimited claims</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="budgetType"
                value="per-employee"
                checked={formData.pointsBudget?.type === 'per-employee'}
                onChange={(e) => setFormData({
                  ...formData,
                  pointsBudget: { ...formData.pointsBudget!, type: 'per-employee' }
                })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-cherish-dark">Limit claims per employee</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="budgetType"
                value="total-claims"
                checked={formData.pointsBudget?.type === 'total-claims'}
                onChange={(e) => setFormData({
                  ...formData,
                  pointsBudget: { ...formData.pointsBudget!, type: 'total-claims' }
                })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-cherish-dark">Limit total number of claims</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-3">
              Amount in points
              <InformationCircleIcon className="w-4 h-4 text-cherish-gray-400 inline ml-1" />
            </label>
            <input
              type="number"
              value={formData.pointsBudget?.amount || ''}
              onChange={(e) => setFormData({
                ...formData,
                pointsBudget: { ...formData.pointsBudget!, amount: parseInt(e.target.value) || 0 }
              })}
              className="form-input"
              placeholder="10"
            />
          </div>

          {formData.pointsBudget?.type === 'per-employee' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-cherish-dark mb-3">Claim limit per employee</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={formData.pointsBudget.claimLimitPerEmployee || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pointsBudget: { 
                        ...formData.pointsBudget!, 
                        claimLimitPerEmployee: parseInt(e.target.value) || 1 
                      }
                    })}
                    className="form-input flex-1"
                    placeholder="1"
                  />
                  <select
                    value={formData.pointsBudget.period || 'month'}
                    onChange={(e) => setFormData({
                      ...formData,
                      pointsBudget: { ...formData.pointsBudget!, period: e.target.value }
                    })}
                    className="form-select flex-1"
                  >
                    <option value="month">per month</option>
                    <option value="year">per year</option>
                    <option value="week">per week</option>
                  </select>
                </div>
                <p className="text-xs text-cherish-gray-500 mt-2">
                  Each eligible user can only claim this once a month.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Estimated budget is approximately $21 per month
                  </span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Based on your settings, 21 users are eligible to claim this incentive once a month. Per month users could claim up to 210 points.
                </p>
              </div>
            </>
          )}

          {formData.pointsBudget?.type === 'total-claims' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-cherish-dark mb-3">Quantity per period</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={formData.pointsBudget.quantity || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pointsBudget: { 
                        ...formData.pointsBudget!, 
                        quantity: parseInt(e.target.value) || 100 
                      }
                    })}
                    className="form-input flex-1"
                    placeholder="100"
                  />
                  <select
                    value={formData.pointsBudget.period || 'year'}
                    onChange={(e) => setFormData({
                      ...formData,
                      pointsBudget: { ...formData.pointsBudget!, period: e.target.value }
                    })}
                    className="form-select flex-1"
                  >
                    <option value="year">per year</option>
                    <option value="month">per month</option>
                    <option value="week">per week</option>
                  </select>
                </div>
                <p className="text-xs text-cherish-gray-500 mt-2">
                  Total number of claims allowed for all employees. Amount resets at the start of each selected period, or you can choose &ldquo;Does not repeat&rdquo; to exhaust incentive once the total is met.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cherish-dark mb-3">Claim limit per employee</label>
                <input
                  type="number"
                  value={formData.pointsBudget.claimLimitPerEmployee || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    pointsBudget: { 
                      ...formData.pointsBudget!, 
                      claimLimitPerEmployee: parseInt(e.target.value) || 1 
                    }
                  })}
                  className="form-input"
                  placeholder="1"
                />
                <p className="text-xs text-cherish-gray-500 mt-2">
                  Limit how many times each employee can claim this incentive during the selected period. Leave blank to allow users to claim as many times as they want.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Estimated budget is approximately $100 per year
                  </span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Based on your settings, this incentive can be claimed 100 times in a year. Per year users could claim up to 1,000 points.
                </p>
              </div>
            </>
          )}

          {formData.pointsBudget?.type === 'unlimited' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  🚀 New Customer Has Taken Off! budget is unlimited
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Based on your settings, 16 eligible users can claim this incentive as many times as they want.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderRecognitionPosts = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-cherish-dark mb-2">Recognition posts</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-3">Message</label>
            <textarea
              value={formData.recognitionPost?.message || ''}
              onChange={(e) => setFormData({
                ...formData,
                recognitionPost: { ...formData.recognitionPost!, message: e.target.value }
              })}
              rows={3}
              className="form-input"
              placeholder="if we go viral, it's because of you! 🏆✨ Thanks for sharing meaningful content about Cherish on social media."
            />
            <p className="text-xs text-cherish-gray-500 mt-2">
              Change the message shown on incentive posts in &ldquo;Team&rdquo; or &ldquo;For you&rdquo; feeds and chat messaging integrations. Do not include &ldquo;@recipient&rdquo; or &ldquo;+amount&rdquo; in message.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-cherish-dark mb-3">Who can see this incentive activity?</label>
            <select
              value={formData.recognitionPost?.visibility || 'public'}
              onChange={(e) => setFormData({
                ...formData,
                recognitionPost: { 
                  ...formData.recognitionPost!, 
                  visibility: e.target.value as 'public' | 'private' | 'team'
                }
              })}
              className="form-select"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="team">Team</option>
            </select>
            <p className="text-xs text-cherish-gray-500 mt-2">
              Everyone in the company can see who earned the incentive.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-cherish-gray-50 rounded-xl">
          <p className="text-sm text-cherish-gray-600 mb-4">
            When an incentive is approved, users can review which incentives are being claimed and by who in the incentive activity module shown on the &ldquo;Company&rdquo; feed. Clicking on the incentive card will allow users to quickly claim this incentive themselves. Coworker counts are automatically updated based on total users who claimed the incentive in the time period.
          </p>
          <p className="text-sm text-cherish-gray-600">
            &ldquo;Message&rdquo; is shown on incentives posts on all other feeds and chat messaging integrations.
          </p>
        </div>

        {/* Recently claimed preview */}
        <div className="mt-6">
          <div className="bg-white border border-cherish-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <GiftIcon className="w-4 h-4 text-red-600" />
              </div>
              <span className="font-semibold text-cherish-dark">Recently claimed</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-auto">
                Explore all
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-cherish-gray-600">Today</p>
                <p className="text-sm font-medium text-cherish-dark">8 coworkers earned</p>
                <p className="text-sm text-blue-600 font-medium">Social Media</p>
                <p className="text-sm text-blue-600 font-medium">Superstar</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 bg-cherish-gray-300 rounded-full border-2 border-white"></div>
                  ))}
                  <div className="w-8 h-8 bg-cherish-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-cherish-gray-600">+4</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-cherish-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-cherish-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-3">
              Hide preview
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderApprovalProcess = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-cherish-dark mb-2">Approval process</h4>
        <p className="text-sm text-cherish-gray-600 mb-4">
          Does anyone need to approve incentive claims before points are distributed?
        </p>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="approvalType"
              value="automatic"
              checked={formData.approvalProcess?.type === 'automatic'}
              onChange={(e) => setFormData({
                ...formData,
                approvalProcess: { ...formData.approvalProcess!, type: 'automatic' }
              })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-cherish-dark">Automatically approve claims</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="approvalType"
              value="manual"
              checked={formData.approvalProcess?.type === 'manual'}
              onChange={(e) => setFormData({
                ...formData,
                approvalProcess: { ...formData.approvalProcess!, type: 'manual' }
              })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-cherish-dark">Specific people must provide approvals</span>
          </label>
        </div>

        {formData.approvalProcess?.type === 'manual' && (
          <div className="mt-6 space-y-6">
            <div>
              <h5 className="text-sm font-semibold text-cherish-dark mb-3">Required approvals</h5>
              <p className="text-sm text-cherish-gray-600 mb-4">
                Create an approval process with up to 4 steps. Specify one or multiple approvers for each step. Only 1 person per step has to review a request in order for it to be approved or routed to the next step in the approval process.
              </p>
            </div>

            {[1, 2, 3, 4].map((level) => {
              const levelApprover = formData.approvalProcess?.approvers?.find(a => a.level === level)
              return (
                <div key={level}>
                  <label className="block text-sm font-semibold text-cherish-dark mb-3">
                    {level === 1 ? 'First approval' : 
                     level === 2 ? 'Second approval' :
                     level === 3 ? 'Third approval' : 'Final approval'}
                  </label>
                  
                  <div className="space-y-2">
                    {levelApprover?.emails.map((email, emailIndex) => (
                      <div key={emailIndex} className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => updateApproverEmail(level, emailIndex, e.target.value)}
                          className="form-input flex-1"
                          placeholder="jensen.legette@bonus.ly"
                        />
                        <button
                          onClick={() => removeApprover(level, emailIndex)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addApprover(level)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add approver
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicSetup()
      case 2:
        return renderEligibilitySettings()
      case 3:
        return renderPointsBudget()
      case 4:
        return renderRecognitionPosts()
      case 5:
        return renderApprovalProcess()
      default:
        return renderBasicSetup()
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.name.trim().length > 0
      case 2:
        return true // Eligibility is optional
      case 3:
        return formData.pointsBudget?.amount && formData.pointsBudget.amount > 0
      case 4:
        return true // Recognition posts are optional
      case 5:
        return true // Approval process has defaults
      default:
        return false
    }
  }

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
                  <div>
                    <Dialog.Title as="h3" className="text-xl font-bold text-cherish-dark">
                      {initialData ? 'Edit Incentive' : 'Create New Incentive'}
                    </Dialog.Title>
                    <p className="text-sm text-cherish-gray-600 mt-1">
                      Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.name}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 hover:bg-cherish-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="px-6 py-4 bg-cherish-gray-50 border-b border-cherish-gray-200">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          step.completed
                            ? 'bg-green-500 text-white'
                            : currentStep === step.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-cherish-gray-200 text-cherish-gray-600'
                        }`}>
                          {step.completed ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            step.id
                          )}
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          currentStep === step.id ? 'text-cherish-dark' : 'text-cherish-gray-600'
                        }`}>
                          {step.name}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`mx-4 h-px w-8 ${
                            step.completed ? 'bg-green-500' : 'bg-cherish-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto">
                  {renderStepContent()}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-cherish-gray-200 bg-cherish-gray-50">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    
                    {currentStep < steps.length ? (
                      <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        disabled={!canProceed()}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {initialData ? 'Update Incentive' : 'Create Incentive'}
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
