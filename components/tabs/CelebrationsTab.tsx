'use client'

import { useState } from 'react'
import { 
  GiftIcon, 
  TrophyIcon, 
  StarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  Cog6ToothIcon,
  BellIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import Toggle from '@/components/Toggle'
import CelebrationForm from './CelebrationForm'
import CelebrationPreviewModal from '@/components/CelebrationPreviewModal'
import CelebrationTypeSelector from '@/components/CelebrationTypeSelector'
import CreateAwardModal from '@/components/CreateAwardModal'
import IncentivesTab from './IncentivesTab'

interface Celebration {
  id: string
  name: string
  type: 'welcome' | 'birthday' | 'work-anniversary' | 'custom'
  categoryName?: string
  basedOn: string
  points: number | string
  audience: string
  postType: string
  isActive: boolean
  message?: string
}

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
  budgetUsed?: number
  pendingApprovals?: number
}

export default function CelebrationsTab() {
  const [activeSubTab, setActiveSubTab] = useState<'celebrations' | 'awards' | 'incentives'>('celebrations')
  const [showInactive, setShowInactive] = useState(false)
  const [editingCelebration, setEditingCelebration] = useState<Celebration | null>(null)
  const [previewCelebration, setPreviewCelebration] = useState<Celebration | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [formType, setFormType] = useState<'welcome' | 'birthday' | 'work-anniversary' | 'custom'>('welcome')
  
  // Awards state
  const [showCreateAwardModal, setShowCreateAwardModal] = useState(false)
  const [editingAward, setEditingAward] = useState<Award | null>(null)
  
  // Mock awards data based on the images
  const [awards, setAwards] = useState<Award[]>([
    {
      id: '1',
      name: 'Hiring Hero Award',
      budget: 10000,
      budgetPeriod: 'monthly',
      budgetUsed: 0,
      usePostTemplate: true,
      points: 100,
      message: '@receiver_username thanks for referring a great candidate!',
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
      pendingApprovals: 0
    },
    {
      id: '2',
      name: 'Above and Beyond',
      budget: 10000,
      budgetPeriod: 'monthly',
      budgetUsed: 0,
      usePostTemplate: true,
      points: 100,
      message: '@receiver_username for going above and beyond!',
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
      pendingApprovals: 0
    },
    {
      id: '3',
      name: 'Happy Customers',
      budget: 10000,
      budgetPeriod: 'monthly',
      budgetUsed: 0,
      usePostTemplate: true,
      points: 100,
      message: '@receiver_username for making customers happy!',
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
      pendingApprovals: 0
    },
    {
      id: '4',
      name: 'Happy Office',
      budget: 10000,
      budgetPeriod: 'monthly',
      budgetUsed: 0,
      usePostTemplate: true,
      points: 100,
      message: '@receiver_username for keeping the office happy!',
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
      pendingApprovals: 0
    },
    {
      id: '5',
      name: 'Wellness',
      budget: 10000,
      budgetPeriod: 'monthly',
      budgetUsed: 0,
      usePostTemplate: true,
      points: 100,
      message: '@receiver_username for prioritizing wellness!',
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
      pendingApprovals: 0
    }
  ])
  
  // Mock celebrations data based on the images
  const [celebrations, setCelebrations] = useState<Celebration[]>([
    {
      id: '1',
      name: 'Welcome Bot',
      type: 'welcome',
      basedOn: 'User activation date',
      points: 250,
      audience: 'Everyone',
      postType: 'Individual',
      isActive: true
    },
    {
      id: '2', 
      name: 'Birthday Bot',
      type: 'birthday',
      basedOn: 'Birth date',
      points: 2500,
      audience: 'Everyone',
      postType: 'Individual',
      isActive: true
    },
    {
      id: '3',
      name: 'Work Anniversary Bot',
      type: 'work-anniversary',
      basedOn: 'Hire date anniversary',
      points: 7500,
      audience: 'Everyone', 
      postType: 'Individual',
      isActive: true
    }
  ])

  const toggleCelebration = (id: string) => {
    setCelebrations(celebrations.map(celebration => 
      celebration.id === id 
        ? { ...celebration, isActive: !celebration.isActive }
        : celebration
    ))
  }

  const handleEditCelebration = (celebration: Celebration) => {
    setEditingCelebration(celebration)
    setFormType(celebration.type)
    setShowForm(true)
  }

  const handlePreviewCelebration = (celebration: Celebration) => {
    setPreviewCelebration(celebration)
  }

  const handleSaveCelebration = (data: any) => {
    if (editingCelebration) {
      setCelebrations(celebrations.map(celebration => 
        celebration.id === editingCelebration.id 
          ? { ...celebration, ...data }
          : celebration
      ))
    } else {
      // Add new celebration
      const newCelebration: Celebration = {
        id: Date.now().toString(),
        type: formType,
        name: data.name || `New ${formType} Celebration`,
        basedOn: data.basedOn || 'Custom date',
        points: data.pointSettings?.amount || 0,
        audience: data.audience || 'everyone',
        postType: 'Individual',
        isActive: true,
        ...data
      }
      setCelebrations([...celebrations, newCelebration])
    }
    setEditingCelebration(null)
    setShowForm(false)
  }

  const handleCreateNew = () => {
    setShowTypeSelector(true)
  }

  const handleSelectType = (type: 'welcome' | 'birthday' | 'work-anniversary' | 'custom') => {
    setEditingCelebration(null)
    setFormType(type)
    setShowForm(true)
    setShowTypeSelector(false)
  }

  // Award handlers
  const toggleAward = (id: string) => {
    setAwards(awards.map(award => 
      award.id === id 
        ? { ...award, isActive: !award.isActive }
        : award
    ))
  }

  const handleCreateAward = () => {
    setEditingAward(null)
    setShowCreateAwardModal(true)
  }

  const handleEditAward = (award: Award) => {
    setEditingAward(award)
    setShowCreateAwardModal(true)
  }

  const handleSaveAward = (awardData: Partial<Award>) => {
    if (editingAward) {
      // Update existing award
      setAwards(awards.map(award => 
        award.id === editingAward.id 
          ? { ...award, ...awardData }
          : award
      ))
    } else {
      // Create new award
      const newAward: Award = {
        ...awardData as Award,
        id: Date.now().toString(),
        budgetUsed: 0,
        pendingApprovals: 0
      }
      setAwards([...awards, newAward])
    }
    setEditingAward(null)
    setShowCreateAwardModal(false)
  }

  const getCelebrationIcon = (type: string | undefined) => {
    switch (type) {
      case 'welcome':
        return <GiftIcon className="w-5 h-5 text-cherish-yellow-mono" />
      case 'birthday':
        return <StarIcon className="w-5 h-5 text-cherish-yellow-mono" />
      case 'work-anniversary':
        return <TrophyIcon className="w-5 h-5 text-cherish-yellow-mono" />
      case 'custom':
        return <Cog6ToothIcon className="w-5 h-5 text-cherish-yellow-mono" />
      default:
        return <GiftIcon className="w-5 h-5 text-cherish-yellow-mono" />
    }
  }

  const getTypeColor = (type: string | undefined) => {
    switch (type) {
      case 'welcome':
        return 'bg-blue-100 text-blue-800'
      case 'birthday':
        return 'bg-pink-100 text-pink-800'
      case 'work-anniversary':
        return 'bg-green-100 text-green-800'
      case 'custom':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeDisplayText = (celebration: Celebration) => {
    if (celebration.type === 'custom' && celebration.categoryName) {
      return celebration.categoryName
    }
    if (celebration.type) {
      return celebration.type.replace('-', ' ')
    }
    return 'Unknown'
  }

  const filteredCelebrations = celebrations.filter(celebration => 
    showInactive || celebration.isActive
  )

  const renderCelebrationsContent = () => (
    <div className="space-y-6">
      {/* Header with Create Button and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-cherish-dark">Celebrations</h3>
          <p className="text-sm text-cherish-gray-600">
            Celebrations are milestones that are acknowledged automatically based on user data, like 
            birthdays or hire dates. Celebrations can also be used to auto-send posts for events that occur on a 
            specific date.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCreateNew}
            className="btn-primary inline-flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Create new
          </button>
          <div className="flex items-center gap-2">
            <Toggle 
              enabled={showInactive} 
              onChange={setShowInactive}
            />
            <span className="text-sm text-cherish-gray-600">Show inactive</span>
          </div>
        </div>
      </div>

      {/* Celebrations Table */}
      <div className="bg-white rounded-2xl border border-cherish-gray-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cherish-gray-50 border-b border-cherish-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider">
                  Based on
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider">
                  Audience
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider">
                  Post Type
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cherish-gray-200">
              {filteredCelebrations.map((celebration) => (
                <tr key={celebration.id} className="hover:bg-cherish-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <Toggle 
                          enabled={celebration.isActive} 
                          onChange={() => toggleCelebration(celebration.id)}
                        />
                        <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center">
                          {getCelebrationIcon(celebration.type)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-cherish-dark">{celebration.name}</div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getTypeColor(celebration.type)}`}>
                          {getTypeDisplayText(celebration)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cherish-gray-600">
                    {celebration.basedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cherish-gray-900 font-medium">
                    {celebration.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cherish-gray-600">
                    {celebration.audience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cherish-gray-600">
                    {celebration.postType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handlePreviewCelebration(celebration)}
                        className="p-2 text-cherish-gray-400 hover:text-cherish-yellow-mono transition-colors rounded-lg hover:bg-cherish-gray-50"
                        title="Preview"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditCelebration(celebration)}
                        className="p-2 text-cherish-gray-400 hover:text-cherish-yellow-mono transition-colors rounded-lg hover:bg-cherish-gray-50"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 text-blue-600 mt-0.5">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              For more information, <a href="#" className="font-semibold underline hover:no-underline">read about Celebrations</a> in our Help Center.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAwardsContent = () => {
    const filteredAwards = awards.filter(award => 
      showInactive || award.isActive
    )

    return (
      <div className="space-y-6">
        {/* Header with Create Button, Pending Approvals, and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-cherish-dark">Awards</h3>
            <p className="text-sm text-cherish-gray-600">
              Awards are a customizable feature for recognizing employees for specific contributions and events
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Pending Approvals Button */}
            <button className="relative inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <BellIcon className="w-4 h-4" />
              <span>Pending Approvals</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            <button 
              onClick={handleCreateAward}
              className="btn-primary inline-flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Create new
            </button>
            <div className="flex items-center gap-2">
              <Toggle 
                enabled={showInactive} 
                onChange={setShowInactive}
              />
              <span className="text-sm text-cherish-gray-600">Show inactive</span>
            </div>
          </div>
        </div>

        {/* Awards Grid - Mobile Friendly */}
        <div className="space-y-4">
          {filteredAwards.map((award) => (
            <div key={award.id} className="bg-white p-6 rounded-2xl border border-cherish-gray-200 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Award Info */}
                <div className="flex items-center space-x-4 flex-1">
                  <Toggle
                    enabled={award.isActive}
                    onChange={() => toggleAward(award.id)}
                  />
                  <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrophyIcon className="w-5 h-5 text-cherish-yellow-mono" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-cherish-dark truncate">{award.name}</h4>
                    <p className="text-sm text-cherish-gray-600 truncate">
                      {award.message || 'No message set'}
                    </p>
                  </div>
                </div>

                {/* Middle Section - Stats */}
                <div className="flex flex-wrap gap-4 lg:gap-6 text-sm">
                  <div className="flex flex-col">
                    <span className="text-cherish-gray-500 text-xs uppercase tracking-wide">Edit Givers</span>
                    <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">No limit</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-cherish-gray-500 text-xs uppercase tracking-wide">Budget Period</span>
                    <span className="text-cherish-dark font-medium capitalize">{award.budgetPeriod || 'Monthly'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-cherish-gray-500 text-xs uppercase tracking-wide">Budget</span>
                    <span className="text-cherish-dark font-medium">{award.budgetUsed || 0} / {award.budget || 10000}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-cherish-gray-500 text-xs uppercase tracking-wide">Pending</span>
                    <span className="text-cherish-dark font-medium">{award.pendingApprovals || 0}</span>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditAward(award)}
                    className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 hover:bg-cherish-gray-100 rounded-lg transition-colors"
                    title="Edit award"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 hover:bg-cherish-gray-100 rounded-lg transition-colors">
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAwards.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-cherish-yellow-light rounded-3xl flex items-center justify-center mx-auto mb-4">
              <TrophyIcon className="w-8 h-8 text-cherish-yellow-mono" />
            </div>
            <h3 className="text-lg font-semibold text-cherish-dark mb-2">No Awards Found</h3>
            <p className="text-cherish-gray-600 mb-4">
              {showInactive ? 'No awards match your current filters.' : 'No active awards found. Create your first award to get started.'}
            </p>
            {!showInactive && (
              <button 
                onClick={handleCreateAward}
                className="btn-primary inline-flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Create Award
              </button>
            )}
          </div>
        )}
    </div>
  )
  }

  const renderIncentivesContent = () => <IncentivesTab />

  return (
    <div className="settings-section">
      <h2 className="settings-header">Awards, Celebrations, & Incentives</h2>
      
      {/* Sub-tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-cherish-gray-100 p-1 rounded-2xl max-w-fit">
          <button
            onClick={() => setActiveSubTab('celebrations')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeSubTab === 'celebrations'
                ? 'bg-white text-cherish-dark shadow-soft'
                : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
            }`}
          >
            Celebrations
          </button>
          <button
            onClick={() => setActiveSubTab('awards')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeSubTab === 'awards'
                ? 'bg-white text-cherish-dark shadow-soft'
                : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
            }`}
          >
            Awards
          </button>
          <button
            onClick={() => setActiveSubTab('incentives')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeSubTab === 'incentives'
                ? 'bg-white text-cherish-dark shadow-soft'
                : 'text-cherish-gray-600 hover:text-cherish-dark hover:bg-white/50'
            }`}
          >
            Incentives
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-8 rounded-3xl border border-cherish-gray-200 shadow-soft">
        {activeSubTab === 'celebrations' && renderCelebrationsContent()}
        {activeSubTab === 'awards' && renderAwardsContent()}
        {activeSubTab === 'incentives' && renderIncentivesContent()}
      </div>

      {/* Form Modal */}
      {showForm && (
        <CelebrationForm
          type={formType}
          isOpen={showForm}
          onClose={() => {
            setShowForm(false)
            setEditingCelebration(null)
          }}
          onSave={handleSaveCelebration}
          initialData={editingCelebration}
        />
      )}

      {/* Preview Modal */}
      {previewCelebration && (
        <CelebrationPreviewModal
          isOpen={!!previewCelebration}
          onClose={() => setPreviewCelebration(null)}
          celebration={{
            type: previewCelebration.type,
            headline: previewCelebration.name === 'Welcome Bot' ? 'Welcome to Cherish!' : 
                     previewCelebration.name === 'Birthday Bot' ? 'Happy Birthday!' :
                     previewCelebration.name === 'Work Anniversary Bot' ? "Wow, it's your Work Anniversary!" : previewCelebration.name,
            message: previewCelebration.message || (
              previewCelebration.type === 'welcome' ? "@recipient we're so glad you're here! Cherish is where we celebrate and recognize our teammates!" :
              previewCelebration.type === 'birthday' ? "Let's celebrate @recipient for their birthday on birth_date . Enjoy your day!" :
              previewCelebration.type === 'work-anniversary' ? "Congratulations @recipient on your nth anniversary! Thank you for all of your contributions!" :
              "@recipient congratulations!"
            ),
            points: typeof previewCelebration.points === 'number' ? previewCelebration.points : parseInt(previewCelebration.points.toString()) || 0
          }}
        />
      )}

      {/* Type Selector Modal */}
      <CelebrationTypeSelector
        isOpen={showTypeSelector}
        onClose={() => setShowTypeSelector(false)}
        onSelectType={handleSelectType}
      />

      {/* Create Award Modal */}
      <CreateAwardModal
        isOpen={showCreateAwardModal}
        onClose={() => {
          setShowCreateAwardModal(false)
          setEditingAward(null)
        }}
        onSave={handleSaveAward}
        initialData={editingAward}
      />
    </div>
  )
}
