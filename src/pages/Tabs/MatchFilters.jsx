import React, {useState} from 'react'

function MatchFilters() {
  const [open, SetOpen] = useState (false)
  return (
    <section>
      <div className='bg-background dark:bg-background-dark dark:text-white h-[700px]'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
        <button onClick={() => SetOpen (!open)}></button>
        {open && (
          <ul>
            <a href=""><li>Location, Stats, etc.</li></a>
            <a href=""><li>Ethnicities, Religions</li></a>
            <a href=""><li>Gender, Orientation</li></a>
            <a href=""><li>Politics, Physical Activity</li></a>
            <a href=""><li>Occupations</li></a>
          </ul>
        )}
      </div>
    </div>
    </section>
  )
}

export default MatchFilters