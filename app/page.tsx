'use client'

import { useState } from 'react'
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
  FireIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import RecognitionModal from '@/components/RecognitionModal'
import ProfileHoverCard from '@/components/ProfileHoverCard'
import CoinDisplay from '@/components/CoinDisplay'
// import RecognitionCard from '@/components/RecognitionCard'
import ProfileDropdown from '@/components/ProfileDropdown'

export default function Home() {
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [showRecognitionModal, setShowRecognitionModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const teamMembers = [
    { name: 'Sarah Johnson', initials: 'SJ', color: 'bg-cherish-purple', days: 'Never' },
    { name: 'Michael Chen', initials: 'MC', color: 'bg-cherish-orange', days: '180 days ago' },
    { name: 'Emily Davis', initials: 'ED', color: 'bg-cherish-green', days: '335 days ago' },
    { name: 'David Wilson', initials: 'DW', color: 'bg-cherish-red', days: 'Never' },
    { name: 'Lisa Anderson', initials: 'LA', color: 'bg-cherish-purple-light', days: '335 days ago' }
  ]

  const celebrations = [
    { name: 'Alex Thompson', initials: 'AT', color: 'bg-cherish-yellow', event: '4 year anniversary', date: 'Aug 16' },
    { name: 'Jessica Martinez', initials: 'JM', color: 'bg-cherish-red', event: 'Birthday', date: 'Aug 17' },
    { name: 'Ryan O\'Connor', initials: 'RO', color: 'bg-cherish-purple', event: 'Birthday', date: 'Aug 27' }
  ]

  const recognitionPosts = [
    {
      id: 'post1',
      author: { name: 'Emma Rodriguez', initials: 'ER', color: 'bg-cherish-orange' },
      recipients: [
        { name: 'Alex Thompson', username: '@alex.thompson', initials: 'AT', color: 'bg-cherish-purple' },
        { name: 'Sarah Johnson', username: '@sarah.johnson', initials: 'SJ', color: 'bg-cherish-green' },
        { name: 'Mike Chen', username: '@mike.chen', initials: 'MC', color: 'bg-cherish-red' },
        { name: 'Jessica Martinez', username: '@jessica.martinez', initials: 'JM', color: 'bg-cherish-yellow' },
        { name: 'David Wilson', username: '@david.wilson', initials: 'DW', color: 'bg-cherish-purple-light' },
        { name: 'Lisa Anderson', username: '@lisa.anderson', initials: 'LA', color: 'bg-cherish-orange-light' },
        { name: 'Ryan O\'Connor', username: '@ryan.oconnor', initials: 'RO', color: 'bg-cherish-green-light' }
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
      author: { name: 'Thomas Evans', initials: 'TE', color: 'bg-cherish-green' },
      recipients: [
        { name: 'Gary Lombardo', username: '@gary.lombardo', initials: 'GL', color: 'bg-cherish-purple' }
      ],
      amount: 50,
      hashtags: ['stellar-partnership'],
      message: 'thank you for being a stellar partner and helping drive our Q4 success',
      timeAgo: '12h ago',
      likes: 8,
      comments: [
        {
          author: { name: 'Robert Schmitt', initials: 'RS', color: 'bg-cherish-orange' },
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
      author: { name: 'Eddie Rosado', initials: 'ER', color: 'bg-cherish-red' },
      recipients: [
        { name: 'Juan Moreno', username: '@juan.moreno', initials: 'JM', color: 'bg-cherish-yellow' },
        { name: 'CJ Ziegler', username: '@cj.ziegler', initials: 'CZ', color: 'bg-cherish-green' },
        { name: 'Zachary Schriock', username: '@zachary.schriock', initials: 'ZS', color: 'bg-cherish-purple' },
        { name: 'Taissa Araujo', username: '@taissa.araujo', initials: 'TA', color: 'bg-cherish-orange' },
        { name: 'Robert Schmitt', username: '@robert.schmitt', initials: 'RS', color: 'bg-cherish-red-light' },
        { name: 'Derick Rodriguez', username: '@derick.rodriguez', initials: 'DR', color: 'bg-cherish-green-light' }
      ],
      amount: 10,
      hashtags: ['be-so-good-they-can-not-ignore-you'],
      message: 'Sooooooo good work on the new feature launch! 🚀',
      timeAgo: '21h ago',
      likes: 15,
      isLiked: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cherish-yellow-light via-white to-cherish-yellow-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-cherish-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center shadow-lg">
                  <TrophyIcon className="w-6 h-6 text-cherish-dark" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-cherish-dark">ABC Organization</h1>
                  <p className="text-xs text-cherish-gray-600">Recognition Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-cherish-dark font-semibold border-b-2 border-cherish-yellow pb-1 transition-all hover:border-cherish-yellow-mono">Home</a>
              <a href="#" className="text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors font-medium">Rewards</a>
              <div className="flex items-center space-x-1 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors cursor-pointer font-medium">
                <span>Analytics</span>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-cherish-gray-600 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-yellow-light">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-cherish-gray-600 hover:text-cherish-orange transition-colors rounded-xl hover:bg-cherish-orange-light/20 relative">
                <BellIcon className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cherish-red rounded-full animate-pulse"></div>
              </button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Navigation Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-cherish-gray-100">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-cherish-yellow-light hover:to-cherish-yellow-light/50 transition-all cursor-pointer group">
                  <BuildingOfficeIcon className="w-5 h-5 text-cherish-gray-600 group-hover:text-cherish-yellow-mono transition-colors" />
                  <span className="font-semibold text-cherish-dark group-hover:text-cherish-yellow-mono transition-colors">Company</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-cherish-yellow/20 to-cherish-yellow-mono/20 border border-cherish-yellow/30 cursor-pointer">
                  <UsersIcon className="w-5 h-5 text-cherish-yellow-mono" />
                  <span className="font-semibold text-cherish-yellow-mono">Team</span>
                  <div className="ml-auto w-2 h-2 bg-cherish-yellow-mono rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-cherish-green-light/20 hover:to-cherish-green-light/10 transition-all cursor-pointer group">
                  <UserIcon className="w-5 h-5 text-cherish-gray-600 group-hover:text-cherish-green transition-colors" />
                  <span className="font-semibold text-cherish-dark group-hover:text-cherish-green transition-colors">For You</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-cherish-orange-light/20 hover:to-cherish-orange-light/10 transition-all cursor-pointer group">
                  <PlusIcon className="w-5 h-5 text-cherish-gray-600 group-hover:text-cherish-orange transition-colors" />
                  <span className="font-semibold text-cherish-dark group-hover:text-cherish-orange transition-colors">Add feed</span>
                </div>
              </div>
            </div>

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
                    avatar={member.color}
                    stats={{ given: 0, received: 1 }}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-cherish-gray-50 transition-all cursor-pointer group">
                      <div className={`w-12 h-12 ${member.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                        {member.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-cherish-dark text-sm group-hover:text-cherish-yellow-mono transition-colors">{member.name}</p>
                        <p className="text-xs text-cherish-gray-500">{member.days}</p>
                      </div>
                      <button className="p-2 text-cherish-gray-400 hover:text-cherish-yellow-mono transition-colors rounded-xl hover:bg-cherish-yellow-light">
                        <SparklesIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </ProfileHoverCard>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Post Creation */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-8 border border-cherish-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cherish-purple to-cherish-purple-light rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                  BC
                </div>
                <div className="flex-1">
                  <button 
                    onClick={() => setShowPostModal(true)}
                    className="w-full bg-cherish-gray-50 hover:bg-cherish-gray-100 border-0 rounded-2xl px-6 py-4 text-cherish-gray-600 hover:text-cherish-dark focus:outline-none focus:ring-2 focus:ring-cherish-yellow transition-all text-left"
                  >
                    Start a post... ✨
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <CoinDisplay amount={427} type="coin" size="md" animated />
                  <button 
                    onClick={() => setShowRecognitionModal(true)}
                    className="bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono hover:from-cherish-yellow-mono hover:to-cherish-yellow text-cherish-dark px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Give recognition
                  </button>
                </div>
              </div>
                  </div>

            {/* Moments in motion */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-8 border border-cherish-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cherish-orange to-cherish-orange-light rounded-2xl flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cherish-dark">Moments in motion</h3>
                </div>
                <ChevronDownIcon className="w-5 h-5 text-cherish-gray-400 hover:text-cherish-orange transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-8">
              {recognitionPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl shadow-lg p-6">
                  {/* Author and Recipients */}
                  <div className="flex items-start space-x-3 mb-4">
                    <ProfileHoverCard
                      name={post.author.name}
                      username={`@${post.author.name.toLowerCase().replace(' ', '.')}`}
                      location="Remote"
                      department="Engineering"
                      avatar={post.author.color}
                      stats={{ given: 15, received: 8 }}
                    >
                      <div className={`w-12 h-12 ${post.author.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-transform flex-shrink-0`}>
                        {post.author.initials}
                      </div>
                    </ProfileHoverCard>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <ProfileHoverCard
                          name={post.author.name}
                          username={`@${post.author.name.toLowerCase().replace(' ', '.')}`}
                          location="Remote"
                          department="Engineering"
                          avatar={post.author.color}
                          stats={{ given: 15, received: 8 }}
                        >
                          <span className="font-bold text-cherish-dark hover:text-cherish-yellow-mono cursor-pointer transition-colors">
                            {post.author.name}
                          </span>
                        </ProfileHoverCard>
                        <span className="text-cherish-gray-500 text-sm">gave recognition to</span>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {post.recipients.slice(0, 3).map((recipient, idx) => (
                            <ProfileHoverCard
                              key={idx}
                              name={recipient.name}
                              username={recipient.username}
                              location="Remote"
                              department="Engineering"
                              avatar={recipient.color}
                              stats={{ given: 8, received: 12 }}
                            >
                              <div className={`w-8 h-8 ${recipient.color} rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:scale-110 transition-transform`}>
                                {recipient.initials}
                              </div>
                            </ProfileHoverCard>
                          ))}
                          {post.recipients.length > 3 && (
                            <div className="w-8 h-8 bg-cherish-gray-200 rounded-xl flex items-center justify-center text-cherish-gray-600 font-bold text-xs">
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
                            avatar={recipient.color}
                            stats={{ given: 8, received: 12 }}
                          >
                            <span className="inline-block bg-cherish-yellow-light text-cherish-yellow-dark px-2 py-1 rounded-md border border-cherish-yellow-dark/30 hover:bg-cherish-yellow-mono hover:text-white cursor-pointer transition-all duration-200 text-xs font-medium">
                              {recipient.username}
                            </span>
                          </ProfileHoverCard>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-cherish-dark font-medium mb-4 text-lg leading-relaxed">
                    {post.message}
                  </p>

                  {/* Amount and Hashtags */}
                  <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span className="bg-cherish-green text-white px-3 py-1 rounded-full text-sm font-semibold">+{post.amount}</span>
                    {post.hashtags.map((tag, idx) => (
                      <span key={idx} className="bg-cherish-gray-100 text-cherish-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-cherish-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="mb-4 pl-4 border-l-2 border-cherish-gray-100">
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className="flex items-start space-x-3 mb-3">
                          <ProfileHoverCard
                            name={comment.author.name}
                            username={`@${comment.author.name.toLowerCase().replace(' ', '.')}`}
                            location="Remote"
                            department="Engineering"
                            avatar={comment.author.color}
                            stats={{ given: 8, received: 5 }}
                          >
                            <div className={`w-8 h-8 ${comment.author.color} rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:scale-110 transition-transform flex-shrink-0`}>
                              {comment.author.initials}
                            </div>
                          </ProfileHoverCard>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <ProfileHoverCard
                                name={comment.author.name}
                                username={`@${comment.author.name.toLowerCase().replace(' ', '.')}`}
                                location="Remote"
                                department="Engineering"
                                avatar={comment.author.color}
                                stats={{ given: 8, received: 5 }}
                              >
                                <span className="font-semibold text-cherish-dark hover:text-cherish-yellow-mono cursor-pointer transition-colors text-sm">
                                  {comment.author.name}
                                </span>
                              </ProfileHoverCard>
                              <span className="text-cherish-gray-500 text-xs">{comment.timeAgo}</span>
                            </div>
                            <p className="text-cherish-dark text-sm mb-2">{comment.message}</p>
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="bg-cherish-green text-white px-2 py-1 rounded-full text-xs font-semibold">+{comment.amount}</span>
                              {comment.hashtags.map((tag, tagIdx) => (
                                <span key={tagIdx} className="bg-cherish-gray-100 text-cherish-gray-700 px-2 py-1 rounded-full text-xs font-medium border border-cherish-gray-300">
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
                  <div className="flex items-center justify-between pt-4 border-t border-cherish-gray-100">
                    <p className="text-cherish-gray-500 text-sm">{post.timeAgo}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-cherish-gray-500 hover:text-cherish-red transition-colors">
                        <span className="text-sm">♥</span>
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-cherish-gray-500 hover:text-cherish-blue transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm">Comment</span>
                      </button>
                      <button className="flex items-center space-x-1 text-cherish-gray-500 hover:text-cherish-green transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm">Add-on</span>
                      </button>
                      <button className="text-cherish-gray-500 hover:text-cherish-yellow-mono transition-colors">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Rewards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-cherish-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cherish-dark">Rewards</h3>
                <CoinDisplay amount={2524} type="cart" size="lg" animated />
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cherish-green-light/20 to-cherish-green/20 rounded-3xl flex items-center justify-center border-2 border-cherish-green/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-cherish-green to-cherish-green-light rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    +10
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cherish-red-light/20 to-cherish-red/20 rounded-3xl flex items-center justify-center border-2 border-cherish-red/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-cherish-red to-cherish-red-light rounded-2xl flex items-center justify-center shadow-lg">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-cherish-yellow to-cherish-yellow-mono hover:from-cherish-yellow-mono hover:to-cherish-yellow text-cherish-dark font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                🛍️ Shop rewards
              </button>
                </div>

            {/* Celebrations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-cherish-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cherish-dark">🎉 Celebrations</h3>
                <button className="text-cherish-gray-400 hover:text-cherish-orange transition-colors p-2 rounded-xl hover:bg-cherish-gray-100">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-bold text-cherish-gray-700 uppercase tracking-wide">Recent</p>
                {celebrations.map((celebration, index) => (
                  <ProfileHoverCard
                    key={index}
                    name={celebration.name}
                    username={`@${celebration.name.toLowerCase().replace(' ', '.')}`}
                    location="San Francisco"
                    department="Product"
                    avatar={celebration.color}
                    stats={{ given: 3, received: 7 }}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-cherish-gray-50 transition-all cursor-pointer group">
                      <div className={`w-12 h-12 ${celebration.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                        {celebration.initials}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-cherish-dark text-sm group-hover:text-cherish-yellow-mono transition-colors">{celebration.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cherish-red rounded-full animate-pulse"></div>
                          <p className="text-xs text-cherish-gray-600">{celebration.event} on {celebration.date}</p>
                        </div>
                      </div>
                    </div>
                  </ProfileHoverCard>
                ))}
                
                <button className="w-full text-center text-sm text-cherish-yellow-mono hover:text-cherish-yellow transition-colors py-3 font-semibold">
                  Explore all this month →
                </button>
                  </div>
                </div>

            {/* Trending */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-cherish-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cherish-dark">📈 Trending</h3>
                <button className="text-cherish-gray-400 hover:text-cherish-green transition-colors p-2 rounded-xl hover:bg-cherish-gray-100">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-cherish-gray-700 uppercase tracking-wide mb-4">Company values</p>
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-cherish-yellow/10 to-cherish-yellow-mono/10 border border-cherish-yellow/20">
                      <span className="text-cherish-yellow-mono font-semibold text-sm">#be-so-good-they-can-not-ignore-you</span>
                      <p className="text-xs text-cherish-gray-600 mt-1">593 mentions</p>
                    </div>
                    
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-cherish-green/10 to-cherish-green-light/10 border border-cherish-green/20">
                      <span className="text-cherish-green font-semibold text-sm">#its-us-vs-the-problem</span>
                      <p className="text-xs text-cherish-gray-600 mt-1">415 mentions</p>
                      </div>
                    
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-cherish-orange/10 to-cherish-orange-light/10 border border-cherish-orange/20">
                      <span className="text-cherish-orange font-semibold text-sm">#work-hard-live-well</span>
                      <p className="text-xs text-cherish-gray-600 mt-1">412 mentions</p>
                    </div>
                  </div>

                  <button className="w-full text-center text-sm text-cherish-yellow-mono hover:text-cherish-yellow transition-colors py-3 mt-4 font-semibold">
                    Show more ↓
                  </button>
                      </div>
                
                <div className="border-t border-cherish-gray-200 pt-6">
                  <p className="text-sm font-bold text-cherish-gray-700 uppercase tracking-wide mb-4">Custom tags</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-cherish-gray-50 transition-colors">
                      <span className="text-cherish-yellow-mono font-medium text-sm">#teamwork</span>
                      <span className="text-xs text-cherish-gray-500 bg-cherish-gray-100 px-2 py-1 rounded-full">14</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-cherish-gray-50 transition-colors">
                      <span className="text-cherish-green font-medium text-sm">#better-together</span>
                      <span className="text-xs text-cherish-gray-500 bg-cherish-gray-100 px-2 py-1 rounded-full">10</span>
                  </div>

                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-cherish-gray-50 transition-colors">
                      <span className="text-cherish-orange font-medium text-sm">#volunteer-day</span>
                      <span className="text-xs text-cherish-gray-500 bg-cherish-gray-100 px-2 py-1 rounded-full">8</span>
                    </div>
                  </div>
                  
                  <button className="w-full text-center text-sm text-cherish-green hover:text-cherish-green-light transition-colors py-3 mt-4 font-semibold">
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
      
      <RecognitionModal 
        isOpen={showPostModal} 
        onClose={() => setShowPostModal(false)} 
        availablePoints={427}
      />
    </div>
  )
}