'use client'

import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  GiftIcon, 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  EllipsisVerticalIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Toggle from '@/components/Toggle'
import CreateIncentiveModal from '@/components/CreateIncentiveModal'

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
  isArchived?: boolean
}

export default function IncentivesTab() {
  const [showInactive, setShowInactive] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingIncentive, setEditingIncentive] = useState<Incentive | null>(null)
  const [showArchivedView, setShowArchivedView] = useState(false)

  // Mock incentives data based on the images
  const [incentives, setIncentives] = useState<Incentive[]>([
    {
      id: '1',
      name: 'Mammogram Screening',
      points: 500,
      audience: 'Everyone',
      claimLimit: '1 per user',
      limitPeriod: 'Year',
      pending: 1,
      isActive: true,
      image: '/mammogram-icon.png',
      description: 'Early detection of breast cancer significantly improves the chances for successful treatment. Receive 500 points after getting your mammogram.',
      proofRequired: true,
      eligibilitySettings: {
        matchType: 'all',
        conditions: []
      },
      pointsBudget: {
        type: 'per-employee',
        amount: 500,
        claimLimitPerEmployee: 1,
        period: 'year'
      },
      recognitionPost: {
        message: 'if we go viral, it\'s because of you! 🏆✨ Thanks for sharing meaningful content about Cherish on social media.',
        visibility: 'public'
      },
      approvalProcess: {
        type: 'manual',
        approvers: [
          { level: 1, emails: ['jensen.legette@bonus.ly'] },
          { level: 2, emails: ['colleen.perry@bonus.ly'] },
          { level: 3, emails: ['shealagh.coughlin@bonus.ly', 'vito.cuccurolo@bonus.ly'] },
          { level: 4, emails: ['debra.squyres@bonus.ly'] }
        ]
      }
    },
    {
      id: '2',
      name: '92% CSAT Incentive',
      points: 10,
      audience: 'Provider billing support,Provider support, Client billing support, Client support',
      claimLimit: '1 per user',
      limitPeriod: 'Month',
      pending: 1,
      isActive: true,
      eligibilitySettings: {
        matchType: 'any',
        conditions: [
          { field: 'Department', operator: '=', value: 'Provider billing support' },
          { field: 'Department', operator: '=', value: 'Provider support' },
          { field: 'Department', operator: '=', value: 'Client billing support' },
          { field: 'Department', operator: '=', value: 'Client support' }
        ]
      },
      pointsBudget: {
        type: 'per-employee',
        amount: 10,
        claimLimitPerEmployee: 1,
        period: 'month'
      },
      approvalProcess: {
        type: 'automatic'
      }
    },
    {
      id: '3',
      name: 'Brush off the Desk',
      points: 100,
      audience: 'Everyone',
      claimLimit: '100 total',
      limitPeriod: 'Month',
      pending: 1,
      isActive: true,
      pointsBudget: {
        type: 'total-claims',
        amount: 100,
        quantity: 100,
        period: 'month'
      },
      approvalProcess: {
        type: 'automatic'
      }
    },
    {
      id: '4',
      name: 'Beauty Photo',
      points: 10,
      audience: 'Everyone',
      claimLimit: 'None',
      limitPeriod: '-',
      pending: 8,
      isActive: true,
      pointsBudget: {
        type: 'unlimited',
        amount: 10
      },
      approvalProcess: {
        type: 'automatic'
      }
    },
    {
      id: '5',
      name: '🚀 New Customer Has Taken Off!',
      points: 50,
      audience: 'Customer Success',
      claimLimit: 'None',
      limitPeriod: '-',
      pending: 1,
      isActive: true,
      eligibilitySettings: {
        matchType: 'all',
        conditions: [
          { field: 'Department', operator: '=', value: 'Customer Success' },
          { field: 'Location', operator: '=', value: 'Bangladesh' }
        ]
      },
      pointsBudget: {
        type: 'unlimited',
        amount: 50
      },
      approvalProcess: {
        type: 'automatic'
      }
    }
  ])

  // Mock archived incentives
  const [archivedIncentives, setArchivedIncentives] = useState<Incentive[]>([
    {
      id: 'arch1',
      name: '2024 Halloween Costume Contest',
      points: 50,
      audience: 'Everyone',
      claimLimit: '1 per user',
      limitPeriod: 'Year',
      pending: 0,
      isActive: false,
      isArchived: true
    },
    {
      id: 'arch2',
      name: '2024 Halloween Decorating Contest',
      points: 50,
      audience: 'Everyone',
      claimLimit: 'None',
      limitPeriod: 'Week',
      pending: 0,
      isActive: false,
      isArchived: true
    },
    {
      id: 'arch3',
      name: 'Bill.com Set-Up',
      points: 10,
      audience: '',
      claimLimit: '1 per user',
      limitPeriod: 'Week',
      pending: 0,
      isActive: false,
      isArchived: true
    },
    {
      id: 'arch4',
      name: 'Cherish 1 - 1s Feedback',
      points: 10,
      audience: 'Everyone',
      claimLimit: '1 per user',
      limitPeriod: 'Week',
      pending: 0,
      isActive: false,
      isArchived: true
    },
    {
      id: 'arch5',
      name: 'CS Hires',
      points: 250,
      audience: 'Everyone',
      claimLimit: 'None',
      limitPeriod: 'Month',
      pending: 0,
      isActive: false,
      isArchived: true
    }
  ])

  const toggleIncentive = (id: string) => {
    setIncentives(incentives.map(incentive => 
      incentive.id === id 
        ? { ...incentive, isActive: !incentive.isActive }
        : incentive
    ))
  }

  const handleCreateIncentive = () => {
    setEditingIncentive(null)
    setShowCreateModal(true)
  }

  const handleEditIncentive = (incentive: Incentive) => {
    setEditingIncentive(incentive)
    setShowCreateModal(true)
  }

  const handleSaveIncentive = (incentiveData: Partial<Incentive>) => {
    if (editingIncentive) {
      // Update existing incentive
      setIncentives(incentives.map(incentive => 
        incentive.id === editingIncentive.id 
          ? { ...incentive, ...incentiveData }
          : incentive
      ))
    } else {
      // Create new incentive
      const newIncentive: Incentive = {
        ...incentiveData as Incentive,
        id: Date.now().toString(),
        pending: 0,
        isActive: true
      }
      setIncentives([...incentives, newIncentive])
    }
    setEditingIncentive(null)
    setShowCreateModal(false)
  }

  const handleApproveIncentives = (incentiveId: string) => {
    // Navigate to pending approvals page or show approval modal
    console.log('Approve incentives for:', incentiveId)
  }

  const handleReviewPosts = (incentiveId: string) => {
    // Navigate to review posts page or show posts modal
    console.log('Review posts for:', incentiveId)
  }

  const handleDeactivateIncentive = (incentiveId: string) => {
    setIncentives(incentives.map(incentive => 
      incentive.id === incentiveId 
        ? { ...incentive, isActive: false }
        : incentive
    ))
  }

  const handleArchiveIncentive = (incentiveId: string) => {
    const incentiveToArchive = incentives.find(i => i.id === incentiveId)
    if (incentiveToArchive) {
      setArchivedIncentives([...archivedIncentives, { ...incentiveToArchive, isArchived: true }])
      setIncentives(incentives.filter(i => i.id !== incentiveId))
    }
  }

  const handleDeleteArchivedIncentive = (incentiveId: string) => {
    setArchivedIncentives(archivedIncentives.filter(i => i.id !== incentiveId))
  }

  const filteredIncentives = incentives.filter(incentive => 
    showInactive || incentive.isActive
  )

  const ActionDropdown = ({ incentive }: { incentive: Incentive }) => (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 hover:bg-cherish-gray-100 rounded-lg transition-colors">
        <EllipsisVerticalIcon className="w-4 h-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {incentive.pending > 0 && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleApproveIncentives(incentive.id)}
                    className={`${
                      active ? 'bg-cherish-gray-50 text-cherish-dark' : 'text-cherish-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm`}
                  >
                    <CheckIcon className="mr-3 h-4 w-4" />
                    Approve incentives
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleReviewPosts(incentive.id)}
                  className={`${
                    active ? 'bg-cherish-gray-50 text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <ClipboardDocumentListIcon className="mr-3 h-4 w-4" />
                  Review posts
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleEditIncentive(incentive)}
                  className={`${
                    active ? 'bg-cherish-gray-50 text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <PencilIcon className="mr-3 h-4 w-4" />
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleDeactivateIncentive(incentive.id)}
                  className={`${
                    active ? 'bg-cherish-gray-50 text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <XMarkIcon className="mr-3 h-4 w-4" />
                  Deactivate
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  const ArchivedActionDropdown = ({ incentive }: { incentive: Incentive }) => (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-2 text-cherish-gray-400 hover:text-cherish-gray-600 hover:bg-cherish-gray-100 rounded-lg transition-colors">
        <EllipsisVerticalIcon className="w-4 h-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleReviewPosts(incentive.id)}
                  className={`${
                    active ? 'bg-cherish-gray-50 text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <EyeIcon className="mr-3 h-4 w-4" />
                  Review
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleEditIncentive(incentive)}
                  className={`${
                    active ? 'bg-cherish-gray-50 text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <PencilIcon className="mr-3 h-4 w-4" />
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleDeleteArchivedIncentive(incentive.id)}
                  className={`${
                    active ? 'bg-red-50 text-red-700' : 'text-red-600'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <XMarkIcon className="mr-3 h-4 w-4" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  if (showArchivedView) {
    return (
      <div className="space-y-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button
              onClick={() => setShowArchivedView(false)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 flex items-center gap-1"
            >
              ← Back to Incentives
            </button>
            <h3 className="text-lg font-semibold text-cherish-dark">Archived Incentives</h3>
          </div>
        </div>

        {/* Archived Incentives Table */}
        <div className="bg-white rounded-2xl border border-cherish-gray-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-cherish-gray-50 border-b border-cherish-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[200px]">
                    Name
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[80px]">
                    Points
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[150px]">
                    Audience
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[120px]">
                    Claim limit
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[100px]">
                    Limit period
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[80px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cherish-gray-200">
                {archivedIncentives.map((incentive) => (
                  <tr key={incentive.id} className="hover:bg-cherish-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium text-cherish-dark truncate">{incentive.name}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-cherish-gray-900 font-medium">
                      {incentive.points}
                    </td>
                    <td className="px-3 py-4 text-sm text-cherish-gray-600">
                      <div className="max-w-[150px] truncate" title={incentive.audience || '-'}>
                        {incentive.audience || '-'}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-cherish-gray-600">
                      <div className="max-w-[120px] truncate" title={incentive.claimLimit}>
                        {incentive.claimLimit}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-cherish-gray-600">
                      {incentive.limitPeriod}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ArchivedActionDropdown incentive={incentive} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header with Create Button and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-cherish-dark">Incentives</h3>
          <p className="text-sm text-cherish-gray-600">
            Set up incentives to encourage your team to complete certain tasks, participate in events or more. Typically incentives for training completion, wellness initiatives, software adoption, and event participation help increase Cherish adoption and overall employee engagement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCreateIncentive}
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

      {/* Incentives Table */}
      <div className="bg-white rounded-2xl border border-cherish-gray-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-cherish-gray-50 border-b border-cherish-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[200px]">
                  Name
                </th>
                <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[80px]">
                  Points
                </th>
                <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[150px]">
                  Audience
                </th>
                <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[120px]">
                  Claim limit
                </th>
                <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[100px]">
                  Limit period
                </th>
                <th className="px-3 py-4 text-left text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[80px]">
                  Pending
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-cherish-gray-700 uppercase tracking-wider min-w-[80px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cherish-gray-200">
              {filteredIncentives.map((incentive) => (
                <tr key={incentive.id} className="hover:bg-cherish-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Toggle 
                        enabled={incentive.isActive} 
                        onChange={() => toggleIncentive(incentive.id)}
                        className="flex-shrink-0"
                      />
                      <div className="w-10 h-10 bg-cherish-yellow-light rounded-xl flex items-center justify-center flex-shrink-0">
                        <GiftIcon className="w-5 h-5 text-cherish-yellow-mono" />
                      </div>
                      <div className="font-medium text-cherish-dark truncate">{incentive.name}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-cherish-gray-900 font-medium">
                    {incentive.points}
                  </td>
                  <td className="px-3 py-4 text-sm text-cherish-gray-600">
                    <div className="max-w-[150px] truncate" title={incentive.audience}>
                      {incentive.audience}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-cherish-gray-600">
                    <div className="max-w-[120px] truncate" title={incentive.claimLimit}>
                      {incentive.claimLimit}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-cherish-gray-600">
                    {incentive.limitPeriod}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    {incentive.pending > 0 ? (
                      <button 
                        onClick={() => handleApproveIncentives(incentive.id)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {incentive.pending}
                      </button>
                    ) : (
                      <span className="text-cherish-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <ActionDropdown incentive={incentive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Archived Incentives Link */}
      <div className="flex justify-start">
        <button
          onClick={() => setShowArchivedView(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Review archived incentives
        </button>
      </div>

      {/* Help Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 text-blue-600 mt-0.5">
            <InformationCircleIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-blue-800">
              Learn more in our <a href="#" className="font-semibold underline hover:no-underline">Help Center</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Create/Edit Incentive Modal */}
      <CreateIncentiveModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          setEditingIncentive(null)
        }}
        onSave={handleSaveIncentive}
        initialData={editingIncentive}
      />
    </div>
  )
}
