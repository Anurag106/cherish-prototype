'use client'

import { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  PlusIcon,
  ChevronDownIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  UsersIcon,
  UserIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  FireIcon,
  StarIcon,
  TrophyIcon,
  XMarkIcon,
  LinkIcon,
  FlagIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartPieIcon,
  HashtagIcon
} from '@heroicons/react/24/outline'
import RecognitionModal from '@/components/RecognitionModal'
import AwardsModal from '@/components/AwardsModal'
import ProfileHoverCard from '@/components/ProfileHoverCard'
import CoinDisplay from '@/components/CoinDisplay'
import ProfileDropdown from '@/components/ProfileDropdown'
import BookmarksPage from '@/components/pages/BookmarksPage'
import AnnouncementsPage from '@/components/pages/AnnouncementsPage'
import ViewProfilePage from '@/components/pages/ViewProfilePage'
import ProfileSettingsPage from '@/components/pages/ProfileSettingsPage'
import AddFeedModal from '@/components/AddFeedModal'
import MomentsInMotion from '@/components/MomentsInMotion'
import Tooltip from '@/components/Tooltip'
import ColorfulAvatar from '@/components/ColorfulAvatar'
import { NotificationProvider, useNotifications } from '@/components/NotificationSystem'
import IncentivesCard from '@/components/IncentivesCard'
import ExploreIncentivesModal from '@/components/ExploreIncentivesModal'
import ClaimIncentiveModal from '@/components/ClaimIncentiveModal'
// Removed OrganizationGraphPage import - now using proper routing

function HomeContent() {
  const { showSuccess, showInfo } = useNotifications()
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [showRecognitionModal, setShowRecognitionModal] = useState(false)
  const [showAwardsModal, setShowAwardsModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showAddFeedModal, setShowAddFeedModal] = useState(false)
  const [showExploreIncentivesModal, setShowExploreIncentivesModal] = useState(false)
  const [showClaimIncentiveModal, setShowClaimIncentiveModal] = useState(false)
  const [selectedIncentiveId, setSelectedIncentiveId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<string>('feed')
  const [showAllowanceBanner, setShowAllowanceBanner] = useState(true)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [activeFeeds, setActiveFeeds] = useState<Array<{type: string, id: string, name: string}>>([
    { type: 'locations', id: 'atlanta', name: 'Atlanta' },
    { type: 'teams', id: 'adam-harrington', name: "Adam Harrington's Team" }
  ])

  // Analytics menu items
  const analyticsMenuItems = [
    { id: 'team-dashboard', name: 'Team dashboard', icon: ChartBarIcon },
    { id: 'leaderboard', name: 'Leaderboard', icon: TrophyIcon },
    { id: 'participation', name: 'Participation', icon: UserGroupIcon },
    { id: 'recognition', name: 'Recognition', icon: StarIcon },
    { id: 'organization-graph', name: 'Organization graph', icon: ChartPieIcon },
    { id: 'top-words', name: 'Top words', icon: HashtagIcon }
  ]

  const handleAnalyticsNavigation = (analyticsType: string) => {
    console.log('Navigating to analytics:', analyticsType)
    if (analyticsType === 'organization-graph') {
      window.location.href = '/recognition-analytics/organization-graph'
    } else if (analyticsType === 'recognition') {
      window.location.href = '/recognition-analytics'
    } else if (analyticsType === 'top-words') {
      window.location.href = '/top-words'
    } else if (analyticsType === 'participation') {
      window.location.href = '/participation'
    } else if (analyticsType === 'team-dashboard') {
      window.location.href = '/recognition-analytics/team-dashboard'
    } else if (analyticsType === 'leaderboard') {
      window.location.href = '/recognition-analytics/leaderboards'
    }
  }

  const handleNavigation = (page: string) => {
    if (page === 'logout') {
      // Handle logout logic here
      console.log('Logging out...')
      return
    }
    setCurrentPage(page)
  }

  const handleBackToFeed = () => {
    setCurrentPage('feed')
  }

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleAddFeed = (feedType: string, feedId: string, feedName: string) => {
    const newFeed = { type: feedType, id: feedId, name: feedName }
    setActiveFeeds(prev => {
      // Check if feed already exists
      const exists = prev.some(feed => feed.type === feedType && feed.id === feedId)
      if (exists) return prev
      return [...prev, newFeed]
    })
  }

  const handleRemoveFeed = (feedType: string, feedId: string) => {
    setActiveFeeds(prev => prev.filter(feed => !(feed.type === feedType && feed.id === feedId)))
  }

  const handleDropdownToggle = (postId: string) => {
    setOpenDropdownId(openDropdownId === postId ? null : postId)
  }

  const handleCopyLink = (postId: string) => {
    const postUrl = `${window.location.origin}/post/${postId}`
    navigator.clipboard.writeText(postUrl).then(() => {
      showSuccess('Link copied!', 'Post link has been copied to your clipboard.')
    }).catch(err => {
      console.error('Failed to copy link: ', err)
      showInfo('Copy failed', 'Unable to copy link to clipboard. Please try again.')
    })
    setOpenDropdownId(null)
  }

  const handleReport = (postId: string) => {
    console.log('Reporting post:', postId)
    showInfo('Report submitted', 'Thank you for reporting this post. Our team will review it shortly.')
    setOpenDropdownId(null)
  }

  const handleExploreAllIncentives = () => {
    setShowExploreIncentivesModal(true)
  }

  const handleClaimIncentive = (incentiveId: string) => {
    setSelectedIncentiveId(incentiveId)
    setShowClaimIncentiveModal(true)
    setShowExploreIncentivesModal(false)
  }

  const handleSubmitClaim = async (claimData: any) => {
    try {
      // Here you would typically send the claim data to your API
      console.log('Submitting claim:', claimData)
      
      showSuccess('Claim submitted!', 'Your incentive claim has been submitted successfully and is pending review.')
      
      // Close modals
      setShowClaimIncentiveModal(false)
      setSelectedIncentiveId(null)
    } catch (error) {
      console.error('Failed to submit claim:', error)
      showInfo('Submission failed', 'Unable to submit your claim. Please try again.')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId && !(event.target as Element).closest('.relative')) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdownId])

  const teamMembers = [
    { name: 'Sarah Johnson', days: 'Never' },
    { name: 'Michael Chen', days: '180 days ago' },
    { name: 'Emily Davis', days: '335 days ago' },
    { name: 'David Wilson', days: 'Never' },
    { name: 'Lisa Anderson', days: '335 days ago' }
  ]

  const celebrations = [
    { name: 'Alex Thompson', event: '4 year anniversary', date: 'Aug 16' },
    { name: 'Jessica Martinez', event: 'Birthday', date: 'Aug 17' },
    { name: 'Ryan O\'Connor', event: 'Birthday', date: 'Aug 27' }
  ]

  const recognitionPosts = [
    {
      id: 'award-post1',
      author: { name: 'Amanda Gaabo' },
      recipients: [
        { name: 'Someone', username: '@someone' }
      ],
      amount: 100,
      hashtags: [],
      message: 'Congratulations on your promotion!! Amazing work this past year.',
      timeAgo: '1m ago',
      likes: 0,
      isLiked: false,
      isAward: true,
      awardType: 'Promotion Award',
      awardIcon: '🎉'
    },
    {
      id: 'award-post2',
      author: { name: 'Lills D' },
      recipients: [
        { name: 'Maple', username: '@maple.l' }
      ],
      amount: 10,
      hashtags: ['leadership'],
      message: 'Great presentation today on Q2 planning, Maple!',
      timeAgo: '2m ago',
      likes: 0,
      isLiked: false,
      isAward: true,
      awardType: 'Above-and-Beyond',
      awardIcon: '🏆'
    },
    {
      id: 'award-post3',
      author: { name: 'System' },
      recipients: [
        { name: 'May 2025 Volunteers - Boston', username: '@may.2025.volunteers.boston' }
      ],
      amount: 520,
      hashtags: ['do-good'],
      message: 'thank you for volunteering at the Boys & Girls Club of Dorchester! We know that the kids really appreciated your visit!',
      timeAgo: 'Now',
      likes: 0,
      isLiked: false,
      isAward: true,
      awardType: 'Volunteer Hours',
      awardIcon: '🤝'
    },
    {
      id: 'post1',
      author: { name: 'Emma Rodriguez' },
      recipients: [
        { name: 'Alex Thompson', username: '@alex.thompson' },
        { name: 'Sarah Johnson', username: '@sarah.johnson' },
        { name: 'Mike Chen', username: '@mike.chen' },
        { name: 'Jessica Martinez', username: '@jessica.martinez' },
        { name: 'David Wilson', username: '@david.wilson' },
        { name: 'Lisa Anderson', username: '@lisa.anderson' },
        { name: 'Ryan O\'Connor', username: '@ryan.oconnor' }
      ],
      amount: 9,
      hashtags: ['work-hard-live-well'],
      message: 'Great work in Reports as a driver for Analytics 2.0',
      timeAgo: '8h ago',
      likes: 12,
      isLiked: false
    },
    {
      id: 'post2',
      author: { name: 'Thomas Evans' },
      recipients: [
        { name: 'Gary Lombardo', username: '@gary.lombardo' }
      ],
      amount: 50,
      hashtags: ['stellar-partnership'],
      message: 'thank you for being a stellar partner and helping drive our Q4 success',
      timeAgo: '12h ago',
      likes: 8,
      comments: [
        {
          author: { name: 'Robert Schmitt' },
          message: 'Absolutely agree! Gary has been incredible.',
          amount: 5,
          hashtags: ['be-so-good-they-can-not-ignore-you'],
          timeAgo: '20h ago'
        }
      ],
      isLiked: false
    },
    {
      id: 'post3',
      author: { name: 'Eddie Rosado' },
      recipients: [
        { name: 'Juan Moreno', username: '@juan.moreno' },
        { name: 'CJ Ziegler', username: '@cj.ziegler' },
        { name: 'Zachary Schriock', username: '@zachary.schriock' },
        { name: 'Taissa Araujo', username: '@taissa.araujo' },
        { name: 'Robert Schmitt', username: '@robert.schmitt' },
        { name: 'Derick Rodriguez', username: '@derick.rodriguez' }
      ],
      amount: 10,
      hashtags: ['be-so-good-they-can-not-ignore-you'],
      message: 'Sooooooo good work on the new feature launch! 🚀',
      timeAgo: '21h ago',
      likes: 15,
      isLiked: false
    }
  ]

  // Render different pages based on currentPage state
  if (currentPage === 'bookmarks') {
    return <BookmarksPage onBack={handleBackToFeed} />
  }
  
  if (currentPage === 'announcements') {
    return <AnnouncementsPage onBack={handleBackToFeed} />
  }
  
  if (currentPage === 'profile') {
    return <ViewProfilePage onBack={handleBackToFeed} />
  }
  
  if (currentPage === 'profile-settings') {
    return <ProfileSettingsPage onBack={handleBackToFeed} />
  }

  // Organization graph now handled by standalone route /recognition-analytics/organization-graph

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-primary-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm hover:scale-105 transition-all duration-200">
                  <TrophyIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-primary-700">ABC Organization</h1>
                  <p className="text-xs text-primary-600">Recognition Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-primary-700 font-medium border-b-2 border-brand-500 pb-1 transition-all hover:border-brand-600">Home</a>
              <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors font-medium">Rewards</a>
              
              {/* Analytics Dropdown */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors cursor-pointer font-medium">
                    <span>Analytics</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-primary-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-primary-200 z-50">
                    <div className="py-2">
                      {analyticsMenuItems.map((item) => (
                        <Menu.Item key={item.id}>
                          {({ active }) => (
                            <button
                              onClick={() => handleAnalyticsNavigation(item.id)}
                              className={`${
                                active ? 'bg-brand-50 text-primary-900' : 'text-primary-700'
                              } group flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
                            >
                              <item.icon className="mr-3 h-5 w-5" />
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-primary-600 hover:text-brand-600 transition-all duration-200 rounded-xl hover:bg-brand-50 hover:scale-105">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-primary-600 hover:text-brand-600 transition-all duration-200 rounded-xl hover:bg-brand-50 hover:scale-105 relative">
                <BellIcon className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 rounded-full animate-pulse"></div>
              </button>
              <ProfileDropdown onNavigate={handleNavigation} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            {/* Navigation Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 p-6 mb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary-50 transition-all cursor-pointer group">
                  <BuildingOfficeIcon className="w-5 h-5 text-secondary-500 group-hover:text-secondary-700 transition-colors" />
                  <span className="font-medium text-secondary-700 group-hover:text-secondary-900 transition-colors">Company</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary-50 border border-primary-200 cursor-pointer">
                  <UsersIcon className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-primary-700">Team</span>
                  <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary-50 transition-all cursor-pointer group">
                  <UserIcon className="w-5 h-5 text-secondary-500 group-hover:text-secondary-700 transition-colors" />
                  <span className="font-medium text-secondary-700 group-hover:text-secondary-900 transition-colors">For You</span>
                </div>
                <button 
                  onClick={() => setShowAddFeedModal(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-secondary-50 transition-all group"
                >
                  <PlusIcon className="w-5 h-5 text-secondary-500 group-hover:text-secondary-700 transition-colors" />
                  <span className="font-medium text-secondary-700 group-hover:text-secondary-900 transition-colors">Add feed</span>
                </button>
              </div>
            </div>

            {/* Active Feeds */}
            {activeFeeds.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-cherish-gray-100">
                <h3 className="text-lg font-bold text-cherish-dark mb-4">Active Feeds</h3>
                <div className="space-y-2">
                  {activeFeeds.map((feed, index) => (
                    <div key={`${feed.type}-${feed.id}`} className="flex items-center justify-between p-3 rounded-2xl bg-primary-50 hover:bg-cherish-gray-100 transition-all">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          feed.type === 'teams' ? 'bg-cherish-green text-white' :
                          feed.type === 'departments' ? 'bg-cherish-orange text-white' :
                          'bg-cherish-red text-white'
                        }`}>
                          {feed.type === 'teams' ? (
                            <UsersIcon className="w-4 h-4" />
                          ) : feed.type === 'departments' ? (
                            <BuildingOfficeIcon className="w-4 h-4" />
                          ) : (
                            <UserIcon className="w-4 h-4" />
                          )}
                        </div>
                        <span className="font-medium text-cherish-dark text-sm">{feed.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFeed(feed.type, feed.id)}
                        className="text-cherish-gray-400 hover:text-cherish-red transition-colors p-1 rounded-lg hover:bg-cherish-red-light/20"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Recognition Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-cherish-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <FireIcon className="w-6 h-6 text-cherish-orange" />
                <h3 className="text-xl font-bold text-cherish-dark">Your team</h3>
              </div>
              
              <div className="mb-6 p-4 bg-gradient-to-r from-cherish-yellow-light to-cherish-yellow-light/50 rounded-2xl border border-cherish-yellow/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-cherish-dark">Recognition Progress</span>
                  <span className="text-lg font-bold text-cherish-dark">0/5</span>
                </div>
                <div className="w-full bg-cherish-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono h-3 rounded-full w-0 transition-all duration-500"></div>
                </div>
                <p className="text-xs text-cherish-gray-600 mt-2 flex items-center space-x-1">
                  <StarIcon className="w-3 h-3" />
                  <span>29 days remaining</span>
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-cherish-gray-700 uppercase tracking-wide">Team Members</h4>
                {teamMembers.map((member, index) => (
                  <ProfileHoverCard
                    key={index}
                    name={member.name}
                    username={`@${member.name.toLowerCase().replace(' ', '.')}`}
                    location="Remote"
                    department="Engineering"
                    avatar={member.name}
                    stats={{ given: 0, received: 1 }}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-primary-50 transition-all cursor-pointer group">
                      <ColorfulAvatar name={member.name} size="lg" className="group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="font-semibold text-primary-900 text-sm group-hover:text-brand-600 transition-colors">{member.name}</p>
                        <p className="text-xs text-primary-500">{member.days}</p>
                      </div>
                      <button className="p-2 text-primary-400 hover:text-brand-500 transition-all duration-200 rounded-xl hover:bg-brand-50 hover:scale-105">
                        <SparklesIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </ProfileHoverCard>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            {/* Allowance Notice Banner */}
            {showAllowanceBanner && (
              <div className="bg-cherish-gray-100 border border-cherish-gray-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Tooltip content="Your 227 points from allowance adjustments will not expire.">
                    <InformationCircleIcon className="w-5 h-5 text-cherish-gray-600 flex-shrink-0 cursor-help" />
                  </Tooltip>
                  <span className="text-sm text-cherish-gray-700">
                    Allowance of 200 points expires in <strong>14 days</strong>
                  </span>
                </div>
                <button
                  onClick={() => setShowAllowanceBanner(false)}
                  className="text-cherish-gray-500 hover:text-cherish-gray-700 transition-colors p-1 rounded-lg hover:bg-cherish-gray-200"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Post Creation */}
            <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm hover:scale-105 transition-all duration-200">
                  BC
                </div>
                <div className="flex-1">
                  <button 
                    onClick={() => setShowPostModal(true)}
                    className="w-full bg-secondary-50 hover:bg-secondary-100 border border-secondary-200 rounded-xl px-6 py-4 text-secondary-500 hover:text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-left"
                  >
                    Start a post... ✨
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <CoinDisplay amount={427} type="coin" size="md" animated />
                  <button 
                    onClick={() => setShowRecognitionModal(true)}
                    className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    Give Recognition
                  </button>
                </div>
              </div>
                  </div>

            {/* Moments in motion */}
            <MomentsInMotion className="mb-8" />

            {/* Incentives Card - Show after 3 posts */}
            <IncentivesCard 
              onExploreAll={handleExploreAllIncentives}
              onClaimIncentive={handleClaimIncentive}
            />

            {/* Feed Posts */}
            <div className="space-y-6">
              {recognitionPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-secondary-200 p-6">
                  {/* Award Header */}
                  {(post as any).isAward && (
                    <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-secondary-200">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{(post as any).awardIcon}</span>
                      </div>
                      <h3 className="font-semibold text-secondary-900 text-base">{(post as any).awardType}</h3>
                    </div>
                  )}
                  
                  {/* Author and Recipients */}
                  <div className="flex items-start space-x-3 mb-4">
                    <ProfileHoverCard
                      name={post.author.name}
                      username={`@${post.author.name.toLowerCase().replace(' ', '.')}`}
                      location="Remote"
                      department="Engineering"
                      avatar=""
                      stats={{ given: 15, received: 8 }}
                    >
                      <ColorfulAvatar name={post.author.name} size="lg" className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0" />
                    </ProfileHoverCard>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <ProfileHoverCard
                          name={post.author.name}
                          username={`@${post.author.name.toLowerCase().replace(' ', '.')}`}
                          location="Remote"
                          department="Engineering"
                          avatar=""
                          stats={{ given: 15, received: 8 }}
                        >
                          <span className="font-bold text-primary-900 hover:text-brand-600 cursor-pointer transition-colors">
                            {post.author.name}
                          </span>
                        </ProfileHoverCard>
                        <span className="text-primary-500 text-sm">gave recognition to</span>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {post.recipients.slice(0, 3).map((recipient, idx) => (
                            <ProfileHoverCard
                              key={idx}
                              name={recipient.name}
                              username={recipient.username}
                              location="Remote"
                              department="Engineering"
                              avatar=""
                              stats={{ given: 8, received: 12 }}
                            >
                              <ColorfulAvatar name={recipient.name} size="sm" className="cursor-pointer hover:scale-110 transition-transform" />
                            </ProfileHoverCard>
                          ))}
                          {post.recipients.length > 3 && (
                            <div className="w-8 h-8 bg-primary-200 rounded-xl flex items-center justify-center text-primary-600 font-bold text-xs">
                              +{post.recipients.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        {post.recipients.map((recipient, idx) => (
                          <ProfileHoverCard
                            key={idx}
                            name={recipient.name}
                            username={recipient.username}
                            location="Remote"
                            department="Engineering"
                            avatar=""
                            stats={{ given: 8, received: 12 }}
                          >
                            <span className="inline-block bg-brand-50 text-brand-700 px-2 py-1 rounded-md border border-brand-200 hover:bg-brand-100 hover:text-brand-800 cursor-pointer transition-all duration-200 text-xs font-medium">
                              {recipient.username}
                            </span>
                          </ProfileHoverCard>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-secondary-900 font-normal mb-4 text-base leading-relaxed">
                    {post.message}
                  </p>

                  {/* Amount and Hashtags */}
                  <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                      +{post.amount} {(post as any).isAward ? (post as any).awardIcon : ''}
                    </span>
                    {post.hashtags.map((tag, idx) => (
                      <span key={idx} className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-lg text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="mb-4 pl-4 border-l-2 border-primary-100">
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className="flex items-start space-x-3 mb-3">
                          <ProfileHoverCard
                            name={comment.author.name}
                            username={`@${comment.author.name.toLowerCase().replace(' ', '.')}`}
                            location="Remote"
                            department="Engineering"
                            avatar=""
                            stats={{ given: 8, received: 5 }}
                          >
                            <ColorfulAvatar name={comment.author.name} size="sm" className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0" />
                          </ProfileHoverCard>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <ProfileHoverCard
                                name={comment.author.name}
                                username={`@${comment.author.name.toLowerCase().replace(' ', '.')}`}
                                location="Remote"
                                department="Engineering"
                                avatar=""
                                stats={{ given: 8, received: 5 }}
                              >
                                <span className="font-semibold text-primary-900 hover:text-brand-600 cursor-pointer transition-colors text-sm">
                                  {comment.author.name}
                                </span>
                              </ProfileHoverCard>
                              <span className="text-primary-500 text-xs">{comment.timeAgo}</span>
                            </div>
                            <p className="text-primary-900 text-sm mb-2">{comment.message}</p>
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">+{comment.amount}</span>
                              {comment.hashtags.map((tag, tagIdx) => (
                                <span key={tagIdx} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium border border-primary-300">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Time and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary-100">
                    <p className="text-primary-500 text-sm">{post.timeAgo}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-primary-500 hover:text-red-500 transition-colors">
                        <span className="text-sm">♥</span>
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-primary-500 hover:text-brand-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm">Comment</span>
                      </button>
                      <button className="flex items-center space-x-1 text-primary-500 hover:text-green-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm">Add-on</span>
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => handleDropdownToggle(post.id)}
                          className="text-primary-500 hover:text-brand-600 transition-colors p-1 rounded-lg hover:bg-primary-100"
                        >
                          <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>
                        
                        {openDropdownId === post.id && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-primary-200 py-2 z-50">
                            <button
                              onClick={() => handleCopyLink(post.id)}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span>Copy link</span>
                            </button>
                            <button
                              onClick={() => handleReport(post.id)}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors"
                            >
                              <FlagIcon className="w-4 h-4" />
                              <span>Report</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            {/* Rewards */}
            <div className="bg-white rounded-3xl shadow-sm border border-primary-200 hover:shadow-md transition-all duration-300 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-900">Rewards</h3>
                <CoinDisplay amount={2524} type="cart" size="lg" animated />
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center border-2 border-green-200">
                  <div className="w-10 h-10 bg-points-green rounded-2xl flex items-center justify-center text-white font-bold shadow-sm">
                    +10
                  </div>
                </div>
                <div className="w-16 h-16 bg-brand-50 rounded-3xl flex items-center justify-center border-2 border-brand-200">
                  <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105">
                Shop rewards
              </button>
                </div>

            {/* Celebrations */}
            <div className="bg-white rounded-3xl shadow-sm border border-primary-200 hover:shadow-md transition-all duration-300 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-900">🎉 Celebrations</h3>
                <Tooltip 
                  content="Displays upcoming celebrations for your close connections and teammates that you haven't celebrated yet."
                  position="top"
                  size="sm"
                  maxWidth="md"
                >
                  <button className="text-primary-400 hover:text-brand-500 transition-colors p-2 rounded-xl hover:bg-primary-100">
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-bold text-primary-700 uppercase tracking-wide">Recent</p>
                {celebrations.map((celebration, index) => (
                  <ProfileHoverCard
                    key={index}
                    name={celebration.name}
                    username={`@${celebration.name.toLowerCase().replace(' ', '.')}`}
                    location="San Francisco"
                    department="Product"
                    avatar={celebration.name}
                    stats={{ given: 3, received: 7 }}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-primary-50 transition-all cursor-pointer group">
                      <ColorfulAvatar name={celebration.name} size="lg" className="group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="font-semibold text-primary-900 text-sm group-hover:text-brand-600 transition-colors">{celebration.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                          <p className="text-xs text-primary-600">{celebration.event} on {celebration.date}</p>
                        </div>
                      </div>
                    </div>
                  </ProfileHoverCard>
                ))}
                
                <button className="w-full text-center text-sm text-brand-600 hover:text-brand-700 transition-colors py-3 font-semibold">
                  Explore all this month →
                </button>
                  </div>
                </div>

            {/* Trending */}
            <div className="bg-white rounded-3xl shadow-sm border border-primary-200 hover:shadow-md transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-900">📈 Trending</h3>
                <Tooltip 
                  content="Displays the most popular company values and custom hashtags based on recent activity over the last 15 days."
                  position="top"
                  size="sm"
                  maxWidth="md"
                >
                  <button className="text-primary-400 hover:text-brand-500 transition-colors p-2 rounded-xl hover:bg-primary-100">
                    <InformationCircleIcon className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-4">Company values</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <span className="text-blue-600 font-medium text-sm">#be-so-good-they-can-not-ignore-you</span>
                      <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">593</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <span className="text-indigo-600 font-medium text-sm">#its-us-vs-the-problem</span>
                      <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">415</span>
                      </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <span className="text-teal-600 font-medium text-sm">#work-hard-live-well</span>
                      <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">412</span>
                    </div>
                  </div>

                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 transition-colors py-3 mt-4 font-semibold">
                    Show more ↓
                  </button>
                      </div>
                
                <div className="border-t border-primary-200 pt-6">
                  <p className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-4">Custom tags</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <span className="text-purple-600 font-medium text-sm">#teamwork</span>
                      <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">14</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <span className="text-emerald-600 font-medium text-sm">#better-together</span>
                      <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">10</span>
                  </div>

                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary-50 transition-colors">
                      <span className="text-orange-600 font-medium text-sm">#volunteer-day</span>
                      <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">8</span>
                    </div>
                  </div>
                  
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 transition-colors py-3 mt-4 font-semibold">
                    Show more ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RecognitionModal 
        isOpen={showRecognitionModal} 
        onClose={() => setShowRecognitionModal(false)} 
        availablePoints={427}
      />

      <AwardsModal 
        isOpen={showAwardsModal} 
        onClose={() => setShowAwardsModal(false)} 
        availablePoints={427}
      />
      
      <RecognitionModal 
        isOpen={showPostModal} 
        onClose={() => setShowPostModal(false)} 
        availablePoints={427}
      />

      <AddFeedModal
        isOpen={showAddFeedModal}
        onClose={() => setShowAddFeedModal(false)}
        onAddFeed={handleAddFeed}
      />

      <ExploreIncentivesModal
        isOpen={showExploreIncentivesModal}
        onClose={() => setShowExploreIncentivesModal(false)}
        onClaimIncentive={handleClaimIncentive}
      />

      <ClaimIncentiveModal
        isOpen={showClaimIncentiveModal}
        onClose={() => setShowClaimIncentiveModal(false)}
        incentiveId={selectedIncentiveId}
        onSubmitClaim={handleSubmitClaim}
      />
    </div>
  )
}

export default function Home() {
  return (
    <NotificationProvider>
      <HomeContent />
    </NotificationProvider>
  )
}