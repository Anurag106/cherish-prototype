'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon, 
  PlusIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface Label {
  id: string
  name: string
}

interface EditLabelsModalProps {
  isOpen: boolean
  onClose: () => void
  labels: Label[]
  onLabelsChange: (labels: Label[]) => void
}

export default function EditLabelsModal({ isOpen, onClose, labels, onLabelsChange }: EditLabelsModalProps) {
  const [newLabelName, setNewLabelName] = useState('')
  const [editingLabel, setEditingLabel] = useState<Label | null>(null)
  const [editingName, setEditingName] = useState('')
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    label: Label | null
  }>({ isOpen: false, label: null })

  const handleAddLabel = () => {
    if (!newLabelName.trim()) return
    
    const newLabel: Label = {
      id: Date.now().toString(),
      name: newLabelName.trim()
    }
    
    onLabelsChange([...labels, newLabel])
    setNewLabelName('')
  }

  const handleEditLabel = (label: Label) => {
    setEditingLabel(label)
    setEditingName(label.name)
  }

  const handleSaveEdit = () => {
    if (!editingLabel || !editingName.trim()) return
    
    const updatedLabels = labels.map(label =>
      label.id === editingLabel.id
        ? { ...label, name: editingName.trim() }
        : label
    )
    
    onLabelsChange(updatedLabels)
    setEditingLabel(null)
    setEditingName('')
  }

  const handleCancelEdit = () => {
    setEditingLabel(null)
    setEditingName('')
  }

  const handleDeleteLabel = (label: Label) => {
    setDeleteConfirmation({ isOpen: true, label })
  }

  const confirmDeleteLabel = () => {
    if (deleteConfirmation.label) {
      const updatedLabels = labels.filter(label => label.id !== deleteConfirmation.label!.id)
      onLabelsChange(updatedLabels)
      setDeleteConfirmation({ isOpen: false, label: null })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      if (action === 'add') {
        handleAddLabel()
      } else {
        handleSaveEdit()
      }
    } else if (e.key === 'Escape' && action === 'edit') {
      handleCancelEdit()
    }
  }

  return (
    <>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-cherish-gray-200">
                    <h3 className="text-xl font-bold text-cherish-dark">Edit labels</h3>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-cherish-gray-100 rounded-xl transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5 text-cherish-gray-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Add New Label Section */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-cherish-gray-700">Add a new label</h4>
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={newLabelName}
                          onChange={(e) => setNewLabelName(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, 'add')}
                          placeholder="Label name"
                          className="flex-1 px-4 py-3 bg-cherish-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cherish-yellow transition-all"
                        />
                        <button
                          onClick={handleAddLabel}
                          disabled={!newLabelName.trim()}
                          className="p-3 bg-cherish-gray-100 hover:bg-cherish-yellow-light text-cherish-gray-600 hover:text-cherish-dark rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Edit Existing Labels Section */}
                    {labels.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-cherish-gray-700">Edit an existing label</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {labels.map((label) => (
                            <div key={label.id} className="flex items-center justify-between p-3 bg-cherish-gray-50 rounded-xl">
                              {editingLabel?.id === label.id ? (
                                <div className="flex items-center space-x-2 flex-1">
                                  <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, 'edit')}
                                    className="flex-1 px-3 py-2 bg-white border border-cherish-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cherish-yellow transition-all"
                                    autoFocus
                                  />
                                  <button
                                    onClick={handleSaveEdit}
                                    className="px-3 py-2 bg-cherish-yellow text-cherish-dark text-sm font-medium rounded-lg hover:bg-cherish-yellow-mono transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-3 py-2 bg-cherish-gray-200 text-cherish-gray-600 text-sm font-medium rounded-lg hover:bg-cherish-gray-300 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <span className="text-cherish-dark font-medium">{label.name}</span>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => handleEditLabel(label)}
                                      className="p-2 text-cherish-gray-500 hover:text-cherish-yellow hover:bg-cherish-yellow-light rounded-lg transition-all"
                                    >
                                      <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteLabel(label)}
                                      className="p-2 text-cherish-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                      <TrashIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {labels.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-cherish-gray-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                          <EllipsisHorizontalIcon className="w-8 h-8 text-cherish-gray-400" />
                        </div>
                        <p className="text-cherish-gray-500 text-sm">No labels created yet. Add your first label above.</p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Dialog */}
      <Transition appear show={deleteConfirmation.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setDeleteConfirmation({ isOpen: false, label: null })}>
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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-cherish-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <TrashIcon className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Dialog.Title as="h3" className="text-lg font-semibold text-cherish-dark mb-2">
                        Delete label
                      </Dialog.Title>
                      <p className="text-sm text-cherish-gray-600 mb-6">
                        Are you sure you want to delete &quot;{deleteConfirmation.label?.name}&quot;? This action cannot be undone.
                      </p>
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => setDeleteConfirmation({ isOpen: false, label: null })}
                          className="px-4 py-2 text-sm font-medium text-cherish-gray-600 hover:text-cherish-dark transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmDeleteLabel}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
