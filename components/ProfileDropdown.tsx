'use client'

import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  UserIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  BellIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ProfileDropdown() {
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
                <Link
                  href="/profile"
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <UserIcon className="mr-3 h-5 w-5" />
                  View Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/admin"
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <ShieldCheckIcon className="mr-3 h-5 w-5" />
                  Go to Admin
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <CogIcon className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/notifications"
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <BellIcon className="mr-3 h-5 w-5" />
                  Notifications
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/analytics"
                  className={`${
                    active ? 'bg-cherish-yellow-light text-cherish-dark' : 'text-cherish-gray-700'
                  } group flex items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <ChartBarIcon className="mr-3 h-5 w-5" />
                  Analytics
                </Link>
              )}
            </Menu.Item>
          </div>

          {/* Sign Out */}
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-cherish-red-light/10 text-cherish-red' : 'text-cherish-gray-700'
                  } group flex w-full items-center px-6 py-3 text-sm font-medium transition-colors`}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
