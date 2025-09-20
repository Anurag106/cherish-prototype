'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon, 
  TrophyIcon, 
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import Toggle from './Toggle'

interface Award {
  id: string
  name: string
  avatar?: string
  budget?: number
  budgetPeriod?: 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'no-refresh'
  usePostTemplate: boolean
  points?: number
  message?: string
  givers: {
    matchType: 'all' | 'any'
    conditions: Array<{
      field: 'role' | 'department' | 'location'
      operator: '='
      value: string
    }>
  }
  visibility: 'public' | 'private' | 'team'
  allowVisibilityChange: boolean
  approvers: {
    automaticallyApprove: boolean
    levels: Array<{
      id: string
      approvers: string[]
    }>
  }
  isActive: boolean
}

interface CreateAwardModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (award: Partial<Award>) => void
  initialData?: Award | null
}

export default function CreateAwardModal({ isOpen, onClose, onSave, initialData }: CreateAwardModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<Award>>({
    name: '',
    budget: undefined,
    budgetPeriod: 'monthly',
    usePostTemplate: false,
    points: undefined,
    message: '',
    givers: {
      matchType: 'all',
      conditions: []
    },
    visibility: 'public',
    allowVisibilityChange: true,
    approvers: {
      automaticallyApprove: true,
      levels: []
    },
    isActive: true,
    ...initialData
  })

  const steps = [
    { id: 1, name: 'Settings', completed: currentStep > 1 },
    { id: 2, name: 'Post', completed: currentStep > 2 },
    { id: 3, name: 'Givers', completed: currentStep > 3 },
    { id: 4, name: 'Approvers', completed: currentStep > 4 }
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
    setCurrentStep(1)
  }

  const addCondition = () => {
    setFormData({
      ...formData,
      givers: {
        ...formData.givers!,
        conditions: [
          ...formData.givers!.conditions,
          { field: 'role', operator: '=', value: '' }
        ]
      }
    })
  }

  const removeCondition = (index: number) => {
    setFormData({
      ...formData,
      givers: {
        ...formData.givers!,
        conditions: formData.givers!.conditions.filter((_, i) => i !== index)
      }
    })
  }

  const updateCondition = (index: number, field: string, value: string) => {
    const newConditions = [...formData.givers!.conditions]
    newConditions[index] = { ...newConditions[index], [field]: value }
    setFormData({
      ...formData,
      givers: {
        ...formData.givers!,
        conditions: newConditions
      }
    })
  }

  const addApprovalLevel = () => {
    const newLevel = { 
      id: `level-${Date.now()}`, 
      approvers: [''] // Start with one empty approver
    }
    setFormData({
      ...formData,
      approvers: {
        ...formData.approvers!,
        levels: [...formData.approvers!.levels, newLevel]
      }
    })
  }

  const removeApprovalLevel = (levelId: string) => {
    setFormData({
      ...formData,
      approvers: {
        ...formData.approvers!,
        levels: formData.approvers!.levels.filter(level => level.id !== levelId)
      }
    })
  }

  const updateApprovalLevel = (levelId: string, approverIndex: number, value: string) => {
    setFormData({
      ...formData,
      approvers: {
        ...formData.approvers!,
        levels: formData.approvers!.levels.map(level => 
          level.id === levelId 
            ? {
                ...level,
                approvers: level.approvers.map((approver, index) => 
                  index === approverIndex ? value : approver
                )
              }
            : level
        )
      }
    })
  }

  const addApproverToLevel = (levelId: string) => {
    setFormData({
      ...formData,
      approvers: {
        ...formData.approvers!,
        levels: formData.approvers!.levels.map(level => 
          level.id === levelId 
            ? { ...level, approvers: [...level.approvers, ''] }
            : level
        )
      }
    })
  }

  const removeApproverFromLevel = (levelId: string, approverIndex: number) => {
    setFormData({
      ...formData,
      approvers: {
        ...formData.approvers!,
        levels: formData.approvers!.levels.map(level => 
          level.id === levelId 
            ? { 
                ...level, 
                approvers: level.approvers.filter((_, index) => index !== approverIndex)
              }
            : level
        )
      }
    })
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
            ${currentStep === step.id 
              ? 'bg-blue-600 text-white' 
              : step.completed 
                ? 'bg-cherish-yellow text-cherish-dark' 
                : 'bg-cherish-gray-200 text-cherish-gray-600'
            }
          `}>
            {step.id}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep === step.id ? 'text-blue-600' : 'text-cherish-gray-500'
          }`}>
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className="w-8 h-px bg-cherish-gray-300 ml-4"></div>
          )}
        </div>
      ))}
    </div>
  )

  const renderSettingsStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Referral"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Avatar</label>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-cherish-yellow-light rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-cherish-yellow-mono" />
            </div>
          </div>
          <button className="px-4 py-2 border border-cherish-gray-300 rounded-lg text-sm font-medium text-cherish-gray-700 hover:bg-cherish-gray-50 transition-colors">
            Upload new image
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Budget</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={formData.budget || ''}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || undefined })}
            className="flex-1 px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1"
          />
          <span className="text-sm text-cherish-gray-500">points</span>
        </div>
        <p className="text-xs text-cherish-gray-500 mt-1">Has infinite budget if no budget is set</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Budget period</label>
        <select
          value={formData.budgetPeriod || 'monthly'}
          onChange={(e) => setFormData({ ...formData, budgetPeriod: e.target.value as any })}
          className="w-full px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
          <option value="no-refresh">Do not refresh</option>
        </select>
        <p className="text-xs text-cherish-gray-500 mt-1">
          {formData.budgetPeriod === 'weekly' && 'This budget will refresh every Monday'}
          {formData.budgetPeriod === 'monthly' && 'This budget will refresh on the 1st of each month'}
          {formData.budgetPeriod === 'quarterly' && 'This budget will refresh every quarter'}
          {formData.budgetPeriod === 'annually' && 'This budget will refresh on January 1st'}
          {formData.budgetPeriod === 'no-refresh' && 'This budget will not refresh automatically'}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-cherish-dark">Use post template</label>
          <p className="text-xs text-cherish-gray-500">Standardize recognition with pre-set templates</p>
        </div>
        <Toggle
          enabled={formData.usePostTemplate || false}
          onChange={(enabled) => setFormData({ ...formData, usePostTemplate: enabled })}
        />
      </div>
    </div>
  )

  const renderPostStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Points</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={formData.points || ''}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || undefined })}
            className="flex-1 px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-sm text-cherish-gray-500">points</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Message</label>
        <textarea
          value={formData.message || ''}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="for helping us grow our amazing team! #teamwork"
        />
      </div>

      <div className="bg-cherish-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-cherish-dark mb-2">Preview</h4>
        <div className="bg-white p-3 rounded border border-cherish-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-semibold text-blue-600">Test:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {formData.points || 200}
            </span>
            <span className="text-blue-600">@receiver_username</span>
            <span className="text-cherish-dark">{formData.message || 'for helping us grow our amazing team! #teamwork'}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGiversStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">
          Do users need to match all the conditions or just one of them?
        </label>
        <select
          value={formData.givers?.matchType || 'all'}
          onChange={(e) => setFormData({
            ...formData,
            givers: { ...formData.givers!, matchType: e.target.value as 'all' | 'any' }
          })}
          className="w-full px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Match All</option>
          <option value="any">Match Any</option>
        </select>
      </div>

      <div className="space-y-4">
        {formData.givers?.conditions.map((condition, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={condition.field}
              onChange={(e) => updateCondition(index, 'field', e.target.value)}
              className="flex-1 px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="role">Role</option>
              <option value="department">Department</option>
              <option value="location">Location</option>
            </select>
            <span className="text-cherish-gray-500">=</span>
            <select
              value={condition.value}
              onChange={(e) => updateCondition(index, 'value', e.target.value)}
              className="flex-1 px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-cherish-yellow-light"
            >
              <option value="">Select value</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={() => removeCondition(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <button
          onClick={addCondition}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add a condition</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-cherish-dark mb-2">Visibility</label>
        <select
          value={formData.visibility || 'public'}
          onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
          className="w-full px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="public">Publicly Visible</option>
          <option value="private">Private</option>
          <option value="team">Team Only</option>
        </select>
        <p className="text-xs text-cherish-gray-500 mt-1">
          Public posts are visible by anyone in the company. Private posts are only visible to the giver and receiver(s). 
          Immediate team indicates that the people directly underneath the same manager can also see the post. 
          Company admins and managers of the giver and receiver(s) can also see the post.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-cherish-dark">Allow visibility change</label>
          <p className="text-xs text-cherish-gray-500">Givers will have the option to change post visibility to public, private, or team as they create the award post.</p>
        </div>
        <Toggle
          enabled={formData.allowVisibilityChange || false}
          onChange={(enabled) => setFormData({ ...formData, allowVisibilityChange: enabled })}
        />
      </div>
    </div>
  )

  const renderApproversStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-cherish-dark">Automatically approve</label>
          <p className="text-xs text-cherish-gray-500">Toggle off to require approval for this award</p>
        </div>
        <Toggle
          enabled={formData.approvers?.automaticallyApprove || false}
          onChange={(enabled) => setFormData({
            ...formData,
            approvers: { ...formData.approvers!, automaticallyApprove: enabled }
          })}
        />
      </div>

      {!formData.approvers?.automaticallyApprove && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-cherish-dark mb-2">
              You can add multiple approvers and up to four approval levels
            </h4>
            <p className="text-xs text-cherish-gray-500">
              Use this for spot bonuses, sales awards, or larger one-time bonuses that require multiple levels of approval.
            </p>
          </div>

          <div className="border-t border-cherish-gray-200 pt-4">
            <h5 className="text-sm font-medium text-cherish-gray-600 mb-3 uppercase tracking-wide">LEVEL 1 REVIEWS FIRST</h5>
            
            {formData.approvers?.levels.map((level, levelIndex) => (
              <div key={level.id} className="mb-4 p-4 bg-cherish-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h6 className="text-sm font-medium text-cherish-dark">Level {levelIndex + 1}</h6>
                  <button
                    onClick={() => removeApprovalLevel(level.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {level.approvers.map((approver, approverIndex) => (
                    <div key={approverIndex} className="flex items-center space-x-2">
                      <select
                        value={approver}
                        onChange={(e) => updateApprovalLevel(level.id, approverIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-cherish-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="">Select approver...</option>
                        <option value="manager1">John Smith (Manager)</option>
                        <option value="manager2">Sarah Johnson (Director)</option>
                        <option value="admin1">Mike Wilson (Admin)</option>
                        <option value="hr1">Lisa Brown (HR)</option>
                      </select>
                      {level.approvers.length > 1 && (
                        <button
                          onClick={() => removeApproverFromLevel(level.id, approverIndex)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={() => addApproverToLevel(level.id)}
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 mt-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add another approver</span>
                  </button>
                </div>
              </div>
            ))}

            <p className="text-xs text-cherish-gray-500 mb-4">
              When there are multiple approvers in a level, only one person has to review a request in order for it to be approved.
            </p>

            <button
              onClick={addApprovalLevel}
              className="px-4 py-2 bg-cherish-gray-100 text-cherish-dark rounded-lg text-sm font-medium hover:bg-cherish-gray-200 transition-colors"
            >
              Add Approval Level
            </button>
          </div>
        </div>
      )}
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-cherish-dark">
                    Create Award
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {renderStepIndicator()}

                <div className="mb-8">
                  {currentStep === 1 && renderSettingsStep()}
                  {currentStep === 2 && renderPostStep()}
                  {currentStep === 3 && renderGiversStep()}
                  {currentStep === 4 && renderApproversStep()}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-6 py-2 border border-cherish-gray-300 rounded-lg text-sm font-medium text-cherish-gray-700 hover:bg-cherish-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Back
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      onClick={handleNext}
                      className="btn-primary"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="btn-primary"
                    >
                      Create
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
