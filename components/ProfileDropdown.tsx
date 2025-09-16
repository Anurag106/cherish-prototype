'use client'

import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  UserIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  SpeakerWaveIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface ProfileDropdownProps {
  onNavigate?: (page: string) => void;
}

export default function ProfileDropdown({ onNavigate }: ProfileDropdownProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-10 h-10 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center text-cherish-dark font-bold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer hover:shadow-xl">
          BC
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
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-cherish-gray-100 rounded-3xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-cherish-gray-200">
          {/* Profile Header */}
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cherish-yellow to-cherish-yellow-mono rounded-2xl flex items-center justify-center text-cherish-dark font-bold text-xl shadow-lg">
                BC
              </div>
              <div>
                <h3 className="text-lg font-bold text-cherish-dark">Biplob Chakraborty</h3>
                <p className="text-sm text-cherish-gray-600">@biplob.chakraborty</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-cherish-green rounded-full"></div>
                  <span className="text-xs text-cherish-gray-500">Active now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigation('profile')}
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <UserIcon className="mr-3 h-5 w-5" />
                  View profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigation('announcements')}
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <SpeakerWaveIcon className="mr-3 h-5 w-5" />
                  Announcements
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigation('bookmarks')}
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <BookmarkIcon className="mr-3 h-5 w-5" />
                  Bookmarks
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigation('profile-settings')}
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <CogIcon className="mr-3 h-5 w-5" />
                  Profile settings
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="/admin"
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <ShieldCheckIcon className="mr-3 h-5 w-5" />
                  Admin settings
                </a>
              )}
            </Menu.Item>
          </div>

          {/* Log Out */}
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleNavigation('logout')}
                  className={`${
                    active ? 'bg-cherish-red-light/10 text-cherish-red' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
