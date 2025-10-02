import React from 'react'
import { ChevronRight } from 'lucide-react'

function AuthenticatedTabSidebar({ tabs, onTabClick, active }) {
  return (
    <div className='flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50'>
      

      {/* Tabs */}
      <div className="space-y-1">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`
              group relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02]
              ${tab.value === active 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }
            `} 
            onClick={() => onTabClick(tab.value)}
          >
            {/* Tab Content */}
            <div className="flex items-center space-x-3">
              {/* Active Indicator */}
              <div className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${tab.value === active ? 'bg-white' : 'bg-transparent'}
              `} />
              
              {/* Tab Label */}
              <span className={`
                font-medium text-sm transition-all duration-200
                ${tab.value === active ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
              `}>
                {tab.label}
              </span>
            </div>

            {/* Arrow Icon */}
            <ChevronRight className={`
              w-4 h-4 transition-all duration-200 transform
              ${tab.value === active 
                ? 'text-white opacity-100 translate-x-0' 
                : 'text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
              }
            `} />

            {/* Active Background Glow */}
            {tab.value === active && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl -z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthenticatedTabSidebar
