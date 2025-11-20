import { AnnoyedIcon, FrownIcon, SmileIcon } from 'lucide-react'
import React, { useState } from 'react'
import SuggestedModel from '../../models/SuggestedModel'

const Suggestions = ({ username, description }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="border rounded-md px-4 py-4 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* User Avatar & Info */}
          <div className="flex">
            <div className="h-12 w-12 rounded-full bg-primary/90 text-white flex items-center justify-center font-semibold text-lg shadow-sm">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{username}</h3>

              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1 max-w-full sm:max-w-md">
                {description}
              </p>

              {description.length > 80 && (
                <button
                  className="text-primary cursor-pointer text-sm mt-1 hover:underline"
                  onClick={() => setIsOpen(true)}
                >
                  View more
                </button>
              )}
            </div>
          </div>

          {/* Reaction Icons */}
          <div className="flex items-center justify-start sm:justify-end">
            <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 shadow-sm">
              <SmileIcon
                className="transition-transform duration-200 cursor-pointer hover:scale-110"
                size={26}
              />
              <FrownIcon
                className="transition-transform duration-200 cursor-pointer hover:scale-110"
                size={26}
              />
              <AnnoyedIcon
                className="transition-transform duration-200 cursor-pointer hover:scale-110"
                size={26}
              />
            </div>
          </div>
          
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <SuggestedModel
          onClose={() => setIsOpen(false)}
          username={username}
          description={description}
        />
      )}
    </>
  )
}

export default Suggestions
