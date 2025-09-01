import React from 'react'

function Matches() {
  const [open, SetOpen] = useState (false)
  return (
    <section>
      <div className='bg-background dark:bg-background-dark dark:text-white'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
        <button onClick={() => SetOpen (!open) }></button>
      {open &&(
         <ul>
          <a href=""><li>Matches</li></a>
          <a href=""><li>Connections</li></a>
          <a href=""><li>Connection Requests by You</li></a>
          <a href=""><li>Connection Requests to You</li></a>
          <a href=""><li>Bookmarked by You</li></a>
          <a href=""><li>Bookmarked by You + Accepting</li></a>
          <a href=""><li>Connections</li></a>
          <a href=""><li>Who Bookmarked You?</li></a>
          <a href=""><li>Profiles Viewed by You</li></a>
          <a href=""><li>Who Viewed Your Profile?</li></a>
          <a href=""><li>Blocked by You</li></a>
          <a href=""><li>Ignored by You</li></a>
          <a href=""><li>Random Matches</li></a>
         </ul>
      )}
      </div>
    </div>
    
    </section>
  )
}

export default Matches