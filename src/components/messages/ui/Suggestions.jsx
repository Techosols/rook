import { AnnoyedIcon, FrownIcon, SmileIcon, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SuggestedModel from '../../models/SuggestedModel'
import { getDateAndMonth } from '../../../utils/functions'

const Suggestions = ({ username, description, timeStamp, category, readOnly, result }) => {
 const [selectedReaction, setSelectedReaction] = useState(null)

  // Convert API result → internal id
  const normalize = (value) => {
    if (!value) return null
    return value.toLowerCase().replace(" ", "")
  }

  // Load saved reaction ONLY for "By You"
  useEffect(() => {
    if (readOnly && result) {
      setSelectedReaction(normalize(result))
    }
  }, [readOnly, result])

  const [isOpen, setIsOpen] = useState(false)
  const [hoveredReaction, setHoveredReaction] = useState(null)

  const reactions = [
    { id: 'like', icon: SmileIcon, label: 'Like', color: 'text-green-500' },
    { id: 'neutral', icon: FrownIcon, label: 'Neutral', color: 'text-yellow-500' },
    { id: 'dislike', icon: AnnoyedIcon, label: 'Dislike', color: 'text-red-500' }
  ]

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl px-5 py-4 mb-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* User Avatar & Info */}
          <div className="flex items-start flex-1 min-w-0">
            {/* Avatar */}
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
              {username.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="ml-4 flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{username} - <span className='text-sm text-primary'>{category}</span></h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 max-w-full sm:max-w-md mt-1">
                {description}
              </p>

              {description.length > 80 && (
                <button
                  className="text-primary cursor-pointer text-xs font-semibold mt-2 hover:text-primary/80 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => setIsOpen(true)}
                >
                  View more <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
          {/* Reaction Icons */}
          <div className="flex flex-col gap-2 items-end justify-start sm:justify-end">
            <div className="flex-shrink-0 flex flex-col items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary whitespace-nowrap">
                    {getDateAndMonth(timeStamp)}
                  </span>
                </div>
            <div className="flex items-center gap-2">
              {reactions.map((reaction) => {
                const Icon = reaction.icon

                // Only show the matched result when readOnly
                if (readOnly && selectedReaction !== reaction.id) return null

                return (
                  <div key={reaction.id} className="relative group/tooltip">
                    <button
                      disabled={readOnly}
                      onClick={() => !readOnly && setSelectedReaction(reaction.id)}
                      onMouseEnter={() => !readOnly && setHoveredReaction(reaction.id)}
                      onMouseLeave={() => !readOnly && setHoveredReaction(null)}
                      className={`
                        p-1.5 rounded-full transition-all duration-200
                        ${selectedReaction === reaction.id
                          ? reaction.color
                          : hoveredReaction === reaction.id
                            ? reaction.color
                            : 'text-gray-500 dark:text-gray-400'
                        }
                        ${readOnly
                          ? 'cursor-no-drop opacity-70'
                          : 'cursor-pointer hover:scale-125 hover:bg-white/50 dark:hover:bg-gray-600/50'
                        }
                      `}
                      title={reaction.label}
                    >
                      <Icon size={22} />
                    </button>

                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-gray-900 dark:bg-gray-950 text-white text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                        {reaction.label}
                      </div>
                    </div>
                  </div>
                )
              })}
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
