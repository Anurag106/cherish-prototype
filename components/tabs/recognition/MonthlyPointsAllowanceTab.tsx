'use client'

import { useState } from 'react'
import { useNotifications } from '@/components/NotificationSystem'
import { 
  InformationCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import ConfirmationDialog from '@/components/ConfirmationDialog'

interface AllowanceRule {
  id: string
  department: string
  amount: number
  conditions: string
}

export default function MonthlyPointsAllowanceTab() {
  const { showSuccess, showError, showWarning } = useNotifications()
  
  const [monthlyAllowance, setMonthlyAllowance] = useState(300)
  const [directReportAllowance, setDirectReportAllowance] = useState(5)
  const [customRules, setCustomRules] = useState<AllowanceRule[]>([
    {
      id: '1',
      department: 'Design',
      amount: 400,
      conditions: 'Department = Design'
    }
  ])
  const [showCustomSettingsModal, setShowCustomSettingsModal] = useState(false)
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [showDirectReportModal, setShowDirectReportModal] = useState(false)
  const [editingRule, setEditingRule] = useState<AllowanceRule | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    rule: AllowanceRule | null
  }>({ isOpen: false, rule: null })
  
  // New rule form state
  const [newRuleForm, setNewRuleForm] = useState({
    amount: 400,
    matchCondition: 'all', // 'all' or 'any'
    conditions: [
      { field: 'Department', operator: '=', value: 'Design' }
    ]
  })
  
  // Manager allowance form state
  const [managerAllowanceForm, setManagerAllowanceForm] = useState({
    amount: 5,
    matchCondition: 'all',
    conditions: [
      { field: 'Department', operator: '=', value: 'Sales' }
    ]
  })

  const handleSaveSettings = () => {
    // Validate inputs
    if (monthlyAllowance < 10) {
      showError('Invalid Amount', 'Monthly allowance must be at least 10 points.')
      return
    }

    // Simulate save
    showSuccess('Settings Saved', 'All changes will go into effect immediately.')
    console.log('Saving monthly points allowance settings...', {
      monthlyAllowance,
      directReportAllowance,
      customRules
    })
  }

  const handleDeleteRule = (rule: AllowanceRule) => {
    setDeleteConfirmation({ isOpen: true, rule })
  }

  const confirmDeleteRule = () => {
    if (deleteConfirmation.rule) {
      setCustomRules(prev => prev.filter(r => r.id !== deleteConfirmation.rule!.id))
      showSuccess('Rule Deleted', 'Custom allowance rule has been removed.')
      setDeleteConfirmation({ isOpen: false, rule: null })
    }
  }

  const handleEditRule = (rule: AllowanceRule) => {
    setEditingRule(rule)
    setNewRuleForm({
      amount: rule.amount,
      matchCondition: 'all',
      conditions: [
        { field: 'Department', operator: '=', value: rule.department }
      ]
    })
    setShowRuleModal(true)
  }

  const handleOpenCustomSettings = () => {
    setShowCustomSettingsModal(true)
  }

  const handleOpenNewRule = () => {
    setEditingRule(null)
    setNewRuleForm({
      amount: 400,
      matchCondition: 'all',
      conditions: [
        { field: 'Department', operator: '=', value: 'Design' }
      ]
    })
    setShowRuleModal(true)
  }

  const handleSaveRule = () => {
    const conditionText = newRuleForm.conditions
      .map(c => `${c.field} ${c.operator} ${c.value}`)
      .join(newRuleForm.matchCondition === 'all' ? ' AND ' : ' OR ')

    if (editingRule) {
      // Update existing rule
      setCustomRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { 
              ...rule, 
              amount: newRuleForm.amount,
              department: newRuleForm.conditions[0].value,
              conditions: conditionText
            }
          : rule
      ))
      showSuccess('Rule Updated', 'Custom allowance rule has been updated.')
    } else {
      // Add new rule
      const newRule: AllowanceRule = {
        id: Date.now().toString(),
        department: newRuleForm.conditions[0].value,
        amount: newRuleForm.amount,
        conditions: conditionText
      }
      setCustomRules(prev => [...prev, newRule])
      showSuccess('Rule Added', 'New custom allowance rule has been created.')
    }
    
    setShowRuleModal(false)
    setShowCustomSettingsModal(false)
  }

  const handleAddCondition = () => {
    setNewRuleForm(prev => ({
      ...prev,
      conditions: [...prev.conditions, { field: 'Department', operator: '=', value: '' }]
    }))
  }

  const handleRemoveCondition = (index: number) => {
    setNewRuleForm(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }))
  }

  const handleConditionChange = (index: number, field: string, value: string) => {
    setNewRuleForm(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, [field]: value } : condition
      )
    }))
  }

  const handleOpenManagerSettings = () => {
    setShowDirectReportModal(true)
  }

  return (
    <div className="settings-section">
      <h2 className="settings-header">Monthly Points Allowance</h2>
      <p className="settings-description">
        Every Bonusly user has a monthly allowance to give to their peers to recognize outstanding work and valuable contributions. 
        By default, each user receives the same amount unless custom rules are set.
      </p>

      {/* Base Monthly Allowance */}
      <div className="settings-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-cherish-yellow rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cherish-dark" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,13H13V17H11V13H7V11H11V7H13V11H17V13Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Monthly Allowance Amount</h3>
            <p className="text-sm text-cherish-gray-600">Base points given to all users each month</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-cherish-gray-800 mb-2">
              Monthly allowance amount
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="10"
                value={monthlyAllowance}
                onChange={(e) => setMonthlyAllowance(parseInt(e.target.value) || 0)}
                className="form-input w-32"
                placeholder="300"
              />
              <span className="text-cherish-gray-600 font-medium">superstars</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <InformationCircleIcon className="w-4 h-4 text-cherish-yellow-mono" />
              <p className="text-xs text-cherish-gray-600">
                This change will go into effect immediately.
              </p>
            </div>
            <p className="text-sm text-cherish-gray-600 mt-2">
              Enter number of points to give users at the start of each month. Typically, 
              users distribute about 60% of their allowance each month. Amount must be more than 10 points.
            </p>
            <button 
              onClick={handleOpenCustomSettings}
              className="text-sm text-cherish-yellow-mono hover:text-cherish-yellow font-medium mt-2 transition-colors"
            >
              Manage custom settings
            </button>
          </div>
        </div>
      </div>

      {/* Custom Rules */}
      {customRules.length > 0 && (
        <div className="settings-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-soft">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                </svg>
              </div>
              <div>
                <h3 className="settings-subheader mb-1">Monthly Allowance Rules</h3>
                <p className="text-sm text-cherish-gray-600">Custom rules for specific groups</p>
              </div>
            </div>
            <button 
              onClick={handleOpenNewRule}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>New Rule</span>
            </button>
          </div>

          <div className="space-y-3">
            {customRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-cherish-gray-50 rounded-2xl">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-cherish-gray-600">For users with</span>
                    <span className="font-semibold text-cherish-dark">{rule.conditions}</span>
                    <span className="text-sm text-cherish-gray-600">set monthly allowance to</span>
                    <span className="font-bold text-cherish-yellow-mono text-lg">{rule.amount}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditRule(rule)}
                    className="p-2 text-cherish-gray-500 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-white"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRule(rule)}
                    className="p-2 text-cherish-gray-500 hover:text-red-500 transition-colors rounded-xl hover:bg-white"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Amount per Direct Report */}
      <div className="settings-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shadow-soft">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-600" fill="currentColor">
              <path d="M16,4C18.11,4 19.8,5.69 19.8,7.8C19.8,9.91 18.11,11.6 16,11.6C13.89,11.6 12.2,9.91 12.2,7.8C12.2,5.69 13.89,4 16,4M16,13.4C18.67,13.4 24,14.73 24,17.4V20H8V17.4C8,14.73 13.33,13.4 16,13.4M8.8,7.8C8.8,9.91 7.11,11.6 5,11.6C2.89,11.6 1.2,9.91 1.2,7.8C1.2,5.69 2.89,4 5,4C7.11,4 8.8,5.69 8.8,7.8M5,13.4C7.67,13.4 13,14.73 13,17.4V20H0V17.4C0,14.73 5.33,13.4 5,13.4Z"/>
            </svg>
          </div>
          <div>
            <h3 className="settings-subheader mb-1">Additional Amount per Direct Report</h3>
            <p className="text-sm text-cherish-gray-600">Extra points for managers based on team size</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-cherish-gray-800 mb-2">
              Additional allowance per direct report
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="0"
                value={directReportAllowance}
                onChange={(e) => setDirectReportAllowance(parseInt(e.target.value) || 0)}
                className="form-input w-32"
                placeholder="5"
              />
              <span className="text-cherish-gray-600 font-medium">superstars</span>
            </div>
            <p className="text-sm text-cherish-gray-600 mt-2">
              Give managers additional points per direct report.
            </p>
            <button 
              onClick={handleOpenManagerSettings}
              className="text-sm text-cherish-yellow-mono hover:text-cherish-yellow font-medium mt-2 transition-colors"
            >
              Refine manager allowance rules with additional settings
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button 
          onClick={handleSaveSettings}
          className="btn-primary"
        >
          Save Settings
        </button>
      </div>

      {/* Custom Settings Modal */}
      {showCustomSettingsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCustomSettingsModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-cherish-dark">Monthly Allowance Rules</h3>
                  <button
                    onClick={() => setShowCustomSettingsModal(false)}
                    className="text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-cherish-gray-600">For users with</p>
                    <p className="text-sm text-cherish-gray-600">set monthly allowance to</p>
                  </div>
                  
                  {customRules.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-cherish-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-cherish-gray-400" fill="currentColor">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,13H13V17H11V13H7V11H11V7H13V11H17V13Z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-cherish-dark mb-2">No rules defined.</h4>
                      <p className="text-cherish-gray-600 mb-4">Create custom allowance rules for specific departments or roles.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customRules.map((rule) => (
                        <div key={rule.id} className="flex items-center justify-between p-4 bg-cherish-gray-50 rounded-2xl">
                          <div className="flex-1">
                            <span className="text-sm text-cherish-gray-600">{rule.conditions}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-cherish-yellow-mono text-lg">{rule.amount}</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditRule(rule)}
                                className="p-2 text-cherish-gray-500 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-white"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRule(rule)}
                                className="p-2 text-cherish-gray-500 hover:text-red-500 transition-colors rounded-xl hover:bg-white"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleOpenNewRule}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>New Rule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New/Edit Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowRuleModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-cherish-dark">
                    {editingRule ? 'Edit rule' : 'Edit rule for direct report group'}
                  </h3>
                  <button
                    onClick={() => setShowRuleModal(false)}
                    className="text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Monthly Allowance Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-cherish-gray-800 mb-2">
                      {editingRule ? 'Monthly allowance amount' : 'Additional allowance per direct report'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newRuleForm.amount}
                      onChange={(e) => setNewRuleForm(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                      className="form-input w-32"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <InformationCircleIcon className="w-4 h-4 text-cherish-yellow-mono" />
                      <p className="text-xs text-cherish-gray-600">
                        This change will go into effect immediately.
                      </p>
                    </div>
                  </div>

                  {/* Match Conditions */}
                  <div>
                    <label className="block text-sm font-semibold text-cherish-gray-800 mb-3">
                      Do users need to match all the conditions or just one of them?
                    </label>
                    <select
                      value={newRuleForm.matchCondition}
                      onChange={(e) => setNewRuleForm(prev => ({ ...prev, matchCondition: e.target.value }))}
                      className="form-input w-full"
                    >
                      <option value="all">Match All</option>
                      <option value="any">Match Any</option>
                    </select>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-3">
                    {newRuleForm.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <select
                          value={condition.field}
                          onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                          className="form-input flex-1"
                        >
                          <option value="Department">Department</option>
                          <option value="Location">Location</option>
                          <option value="Role">Role</option>
                          <option value="Team">Team</option>
                        </select>
                        <span className="text-cherish-gray-600">=</span>
                        <select
                          value={condition.value}
                          onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                          className="form-input flex-1"
                        >
                          <option value="Design">Design</option>
                          <option value="Sales">Sales</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="HR">HR</option>
                        </select>
                        {newRuleForm.conditions.length > 1 && (
                          <button
                            onClick={() => handleRemoveCondition(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <div className="text-center">
                      <span className="text-sm font-medium text-cherish-gray-600 uppercase">
                        {newRuleForm.matchCondition === 'all' ? 'AND' : 'OR'}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleAddCondition}
                      className="w-full p-3 border-2 border-dashed border-cherish-gray-300 rounded-2xl text-cherish-gray-600 hover:border-cherish-yellow hover:text-cherish-yellow-mono transition-colors"
                    >
                      Add a condition
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setShowRuleModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveRule}
                    className="btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manager Allowance Settings Modal */}
      {showDirectReportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDirectReportModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-cherish-dark">Edit rule for direct report group</h3>
                  <button
                    onClick={() => setShowDirectReportModal(false)}
                    className="text-cherish-gray-400 hover:text-cherish-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Additional allowance per direct report */}
                  <div>
                    <label className="block text-sm font-semibold text-cherish-gray-800 mb-2">
                      Additional allowance per direct report
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={managerAllowanceForm.amount}
                      onChange={(e) => setManagerAllowanceForm(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                      className="form-input w-32"
                    />
                    <p className="text-sm text-cherish-gray-600 mt-2">
                      Additional monthly allowance for managers with direct reports. This change will go into effect immediately.
                    </p>
                  </div>

                  {/* Match Conditions */}
                  <div>
                    <label className="block text-sm font-semibold text-cherish-gray-800 mb-3">
                      Do users need to match all the conditions or just one of them?
                    </label>
                    <select
                      value={managerAllowanceForm.matchCondition}
                      onChange={(e) => setManagerAllowanceForm(prev => ({ ...prev, matchCondition: e.target.value }))}
                      className="form-input w-full"
                    >
                      <option value="all">Match All</option>
                      <option value="any">Match Any</option>
                    </select>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-3">
                    {managerAllowanceForm.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <select
                          value={condition.field}
                          onChange={(e) => {
                            const newConditions = [...managerAllowanceForm.conditions]
                            newConditions[index] = { ...condition, field: e.target.value }
                            setManagerAllowanceForm(prev => ({ ...prev, conditions: newConditions }))
                          }}
                          className="form-input flex-1"
                        >
                          <option value="Department">Department</option>
                          <option value="Location">Location</option>
                          <option value="Role">Role</option>
                          <option value="Team">Team</option>
                        </select>
                        <span className="text-cherish-gray-600">=</span>
                        <select
                          value={condition.value}
                          onChange={(e) => {
                            const newConditions = [...managerAllowanceForm.conditions]
                            newConditions[index] = { ...condition, value: e.target.value }
                            setManagerAllowanceForm(prev => ({ ...prev, conditions: newConditions }))
                          }}
                          className="form-input flex-1"
                        >
                          <option value="Sales">Sales</option>
                          <option value="Design">Design</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="HR">HR</option>
                        </select>
                        {managerAllowanceForm.conditions.length > 1 && (
                          <button
                            onClick={() => {
                              const newConditions = managerAllowanceForm.conditions.filter((_, i) => i !== index)
                              setManagerAllowanceForm(prev => ({ ...prev, conditions: newConditions }))
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <div className="text-center">
                      <span className="text-sm font-medium text-cherish-gray-600 uppercase">
                        {managerAllowanceForm.matchCondition === 'all' ? 'AND' : 'OR'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        setManagerAllowanceForm(prev => ({
                          ...prev,
                          conditions: [...prev.conditions, { field: 'Department', operator: '=', value: '' }]
                        }))
                      }}
                      className="w-full p-3 border-2 border-dashed border-cherish-gray-300 rounded-2xl text-cherish-gray-600 hover:border-cherish-yellow hover:text-cherish-yellow-mono transition-colors"
                    >
                      Add a condition
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setShowDirectReportModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      showSuccess('Manager Rules Updated', 'Direct report allowance rules have been updated.')
                      setShowDirectReportModal(false)
                    }}
                    className="btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, rule: null })}
        onConfirm={confirmDeleteRule}
        title="Delete Custom Rule"
        message={`Are you sure you want to delete the custom allowance rule for ${deleteConfirmation.rule?.department}? This action cannot be undone.`}
        confirmText="Delete Rule"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}
