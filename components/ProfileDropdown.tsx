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
import ColorfulAvatar from './ColorfulAvatar'

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
        <Menu.Button className="hover:scale-105 transition-transform cursor-pointer">
          <ColorfulAvatar name="Biplob Chakraborty" size="md" />
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
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-primary-100 rounded-3xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-primary-200">
          {/* Profile Header */}
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <ColorfulAvatar name="Biplob Chakraborty" size="xl" />
              <div>
                <h3 className="text-lg font-bold text-primary-900">Biplob Chakraborty</h3>
                <p className="text-sm text-primary-600">@biplob.chakraborty</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                  <span className="text-xs text-primary-500">Active now</span>
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
                    active ? 'bg-brand-50 text-primary-900' : 'text-primary-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
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
                    active ? 'bg-brand-50 text-primary-900' : 'text-primary-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
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
                    active ? 'bg-brand-50 text-primary-900' : 'text-primary-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
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
                    active ? 'bg-brand-50 text-primary-900' : 'text-primary-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
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
                    active ? 'bg-brand-50 text-primary-900' : 'text-primary-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
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
                    active ? 'bg-red-50 text-red-600' : 'text-primary-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-105`}
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
