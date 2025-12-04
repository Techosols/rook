import React from 'react'
import { Bell, ChevronRight } from 'lucide-react'

const mockNotifications = [
  {
    id: 1,
    title: 'Rook',
    date: 'Jun 5',
    summary:
      'We released a big update with lot of features!',
    href: '#',
    type: 'update'
  },
  
]

const Notification = () => {
  return (
    <div className="w-full max-w-4xl">
      <div className="space-y-3">
        { mockNotifications.map((n) => (
          <article
            key={n.id}
            aria-labelledby={`notif-${n.id}-title`}
            className="
              flex items-start gap-4 p-4 rounded-lg 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              shadow-md hover:shadow-lg
              transition-all duration-200
              hover:border-primary/30 dark:hover:border-primary/40
              group
            "
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-500/30 flex items-center justify-center">
                <Bell
                  className="w-5 h-5 text-primary dark:text-primary"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3
                    id={`notif-${n.id}-title`}
                    className="text-sm font-bold text-gray-900 dark:text-white"
                  >
                    {n.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {n.summary}
                  </p>
                </div>

                {/* Date Badge */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary whitespace-nowrap">
                    {n.date}
                  </span>
                </div>
              </div>

              {/* Read More Link */}
              <div className="mt-3">
                <a
                  href={n.href}
                  className="inline-flex items-center text-sm font-semibold text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 transition-colors duration-200 group-hover:gap-1"
                >
                  Read more
                  <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Notification
