import React from 'react'

const Inbox = ({
  username,
  description
}) => {
  return (
    <>
      <div className="p-4">
        <ul className="flex flex-col gap-2">
          
          {/* Item 1 */}
          <li className="border p-5 flex gap-5 justify-between items-center">
            <h1 className="text-xl font-extrabold line-clamp-1 text-primary">{username}</h1>

            <p className="flex-1 mx-4 truncate">
              {description}
            </p>

            <p className="text-gray-400 text-sm whitespace-nowrap">
              5 Jan
            </p>
          </li>

        </ul>
      </div>
    </>
  )
}

export default Inbox
