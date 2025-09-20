'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon,
  GiftIcon,
  PhotoIcon,
  DocumentIcon,
  PaperClipIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface ClaimIncentiveModalProps {
  isOpen: boolean
  onClose: () => void
  incentiveId: string | null
  onSubmitClaim: (claimData: ClaimData) => void
}

interface ClaimData {
  incentiveId: string
  explanation: string
  attachments: File[]
  proofType: 'text' | 'file'
}

interface IncentiveDetails {
  id: string
  title: string
  description: string
  points: number
  icon: string
  requirements?: string[]
  proofRequired: boolean
}

export default function ClaimIncentiveModal({ isOpen, onClose, incentiveId, onSubmitClaim }: ClaimIncentiveModalProps) {
  const [explanation, setExplanation] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [proofType, setProofType] = useState<'text' | 'file'>('text')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Mock incentive data - in real app this would come from props or API
  const incentiveDetails: Record<string, IncentiveDetails> = {
    'social-media-superstar': {
      id: 'social-media-superstar',
      title: 'Social Media Superstar',
      description: 'Share meaningful content about our company on social media platforms. Help us build our brand presence and engage with our community.',
      points: 100,
      icon: '📱',
      requirements: ['Post on LinkedIn, Twitter, or Instagram', 'Tag company account', 'Use relevant hashtags'],
      proofRequired: true
    },
    'annual-security-training': {
      id: 'annual-security-training',
      title: 'Annual Security Training',
      description: 'Complete your mandatory annual security training to help keep our organization safe and secure.',
      points: 50,
      icon: '🔒',
      requirements: ['Complete all training modules', 'Pass final assessment', 'Submit completion certificate'],
      proofRequired: true
    },
    'renewal-rockstar': {
      id: 'renewal-rockstar',
      title: 'Renewal Rockstar',
      description: 'Successfully renew client contracts and maintain strong customer relationships.',
      points: 200,
      icon: '⭐',
      requirements: ['Renew contract worth $10K+', 'Maintain 95% customer satisfaction', 'Document renewal process'],
      proofRequired: false
    },
    'wellness-wednesday': {
      id: 'wellness-wednesday',
      title: 'Wellness Wednesday',
      description: 'Participate in our weekly wellness activities and promote a healthy work-life balance.',
      points: 25,
      icon: '🧘',
      requirements: ['Attend wellness session', 'Share wellness tip', 'Complete activity log'],
      proofRequired: true
    },
    'innovation-challenge': {
      id: 'innovation-challenge',
      title: 'Innovation Challenge',
      description: 'Submit innovative ideas that could improve our products, processes, or customer experience.',
      points: 150,
      icon: '💡',
      requirements: ['Submit detailed proposal', 'Include implementation plan', 'Present to innovation committee'],
      proofRequired: true
    },
    'volunteer-hours': {
      id: 'volunteer-hours',
      title: 'Community Volunteer',
      description: 'Volunteer in community service activities and make a positive impact in our local area.',
      points: 75,
      icon: '🤝',
      requirements: ['Volunteer for 4+ hours', 'Provide verification', 'Share experience story'],
      proofRequired: true
    }
  }

  const currentIncentive = incentiveId ? incentiveDetails[incentiveId] : null

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
      const maxSize = 10 * 1024 * 1024 // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize
    })
    
    setAttachments(prev => [...prev, ...validFiles])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleSubmit = async () => {
    if (!currentIncentive || !explanation.trim()) return

    setIsSubmitting(true)
    
    try {
      const claimData: ClaimData = {
        incentiveId: currentIncentive.id,
        explanation: explanation.trim(),
        attachments,
        proofType
      }
      
      await onSubmitClaim(claimData)
      
      // Reset form
      setExplanation('')
      setAttachments([])
      setProofType('text')
      onClose()
    } catch (error) {
      console.error('Failed to submit claim:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = explanation.trim().length > 0 && (!currentIncentive?.proofRequired || attachments.length > 0 || proofType === 'text')

  if (!currentIncentive) return null

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                      {currentIncentive.icon}
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-xl font-bold text-primary-900">
                        Claim Incentive
                      </Dialog.Title>
                      <p className="text-sm text-primary-600">
                        {currentIncentive.title} • +{currentIncentive.points} points
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Incentive Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-900 mb-2">About this incentive</h4>
                    <p className="text-primary-700 text-sm mb-4">{currentIncentive.description}</p>
                    
                    {currentIncentive.requirements && (
                      <div>
                        <h5 className="text-sm font-semibold text-primary-600 mb-2">Requirements:</h5>
                        <ul className="space-y-1">
                          {currentIncentive.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-primary-600 flex items-start space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Explanation */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-primary-900 mb-3">
                      Why have you earned this incentive? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm resize-none"
                      placeholder="Describe how you completed the requirements for this incentive..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-primary-500">
                        Provide details about how you met the requirements
                      </p>
                      <span className="text-xs text-primary-400">
                        {explanation.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Proof Section */}
                  {currentIncentive.proofRequired && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-primary-900 mb-3">
                        Attach proof <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-primary-500 mb-4">
                        Upload images (JPG, PNG) or documents (PDF) under 10MB each
                      </p>

                      {/* File Upload Area */}
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                          dragActive
                            ? 'border-brand-500 bg-brand-50'
                            : 'border-primary-300 hover:border-primary-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <PaperClipIcon className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-primary-900">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-primary-500">
                            JPG, PNG or PDF (max 10MB each)
                          </p>
                        </label>
                      </div>

                      {/* Uploaded Files */}
                      {attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200">
                              <div className="flex items-center space-x-3">
                                {file.type.startsWith('image/') ? (
                                  <PhotoIcon className="w-5 h-5 text-primary-500" />
                                ) : (
                                  <DocumentIcon className="w-5 h-5 text-primary-500" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-primary-900">{file.name}</p>
                                  <p className="text-xs text-primary-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeAttachment(index)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Warning */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-semibold text-yellow-800">Important</h5>
                        <p className="text-sm text-yellow-700 mt-1">
                          You can only claim this incentive once. Make sure all information is accurate before submitting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-primary-200 bg-primary-50">
                  <button
                    onClick={onClose}
                    className="bg-white hover:bg-primary-50 text-primary-900 font-medium px-6 py-2 rounded-xl transition-all duration-200 border border-primary-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="bg-brand-500 hover:bg-brand-600 disabled:bg-primary-300 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <GiftIcon className="w-4 h-4" />
                        <span>Collect {currentIncentive.points} points</span>
                      </>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
