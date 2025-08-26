import React from 'react'

function Messages() {
  return (
    <div className='bg-background dark:bg-background-dark dark:text-white h-[700px]'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
        <h1 className='text-2xl font-bold mb-4'>Chats</h1>
        <p className='text-gray-700 dark:text-gray-300'>
          Here you can chat with other rook members.
        </p>
      </div>
    </div>
  )
}

export default Messages