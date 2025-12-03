import React from 'react'

const Inbox = ({
  username,
  description,
  handleToggle
}) => {
  return (
    <>
      <div>
        <ul className="flex flex-col">
          
          {/* Items */}
          <li className="border-b p-2 flex gap-5 justify-between items-center cursor-pointer" onClick={handleToggle}>
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
