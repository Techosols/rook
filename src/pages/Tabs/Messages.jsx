import React, {useState} from 'react'

function Messages() {
  const [open, SetOpen] = useState (false)
  return (
   <section>
     <div className='bg-background dark:bg-background-dark dark:text-white h-[700px]'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
       <button onClick={() => SetOpen(!open)}></button>
       {open && (
        <ul>
          <a href=""><li>Chats</li></a>
          <a href=""><li>Messages</li></a>
          <a href=""><li>Profile Suggestions for You</li></a>
          <a href=""><li>Profile Suggestions by You</li></a>
          <a href=""><li>Messages from Rook</li></a>
          <a href=""><li>Rook Notifications</li></a>
        </ul>
       )}
      </div>
    </div>
   </section>
  )
}

export default Messages