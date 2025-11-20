import React from 'react'
import { AnnoyedIcon, FrownIcon, SmileIcon, X } from 'lucide-react'

const SuggestedModel = ({ username, description, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden">
        {/* username */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-primary">
            {username}
          </h2>
          
        {/* Closure cross button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-primary transition cursor-pointer"
          >
            <X size={25} />
          </button>
        </div>

        {/* full description */}
        <div className="px-6 py-5 max-h-72 overflow-y-auto text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </div>

        {/* Reaction Icons & Close Button */}
        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-2">
              <SmileIcon
                className="transition-all duration-200 cursor-pointer hover:scale-110"
                size={28}
              />
              <FrownIcon
                className="transition-all duration-200 cursor-pointer hover:scale-110"
                size={28}
              />
              <AnnoyedIcon
                className="transition-all duration-200 cursor-pointer hover:scale-110"
                size={28}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-primary text-white rounded-lg shadow hover:bg-primary-dark cursor-pointer transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default SuggestedModel
