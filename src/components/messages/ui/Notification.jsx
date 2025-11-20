import React from 'react'
import { CircleUserRound } from 'lucide-react'

const mockNotifications = [
  {
    id: 1,
    title: 'Rook',
    date: 'Jun 5',
    summary:
      'We released a big update with lot of features!',
    href: '#',
  },
  {
    id: 1,
    title: 'Rook',
    date: 'Jun 5',
    summary:
      'We released a big update with lot of features!',
    href: '#',
  },
  {
    id: 1,
    title: 'Rook',
    date: 'Jun 5',
    summary:
      'We released a big update with lot of features!',
    href: '#',
  },
  {
    id: 1,
    title: 'Rook',
    date: 'Jun 5',
    summary:
      'We released a big update with lot of features!',
    href: '#',
  },
]

const Notification = () => {
  return (
    <div className="w-full max-w-4xl">
      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <article
            key={n.id}
            aria-labelledby={`notif-${n.id}-title`}
            className="
              flex items-start gap-3 p-4 rounded-lg 
              bg-white dark:bg-gray-800 
              border border-gray-100 dark:border-gray-700 
              shadow-sm
            "
          >
            <div>
                <CircleUserRound
                  className="w-5 h-5 text-indigo-300 dark:text-indigo-300"
                  aria-hidden="true"
                />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    id={`notif-${n.id}-title`}
                    className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {n.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {n.summary}
                  </p>
                </div>

                <time className="ml-4 text-xs text-gray-400">{n.date}</time>
              </div>

              <div className="mt-1">
                <a
                  href={n.href}
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Read more
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