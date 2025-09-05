import React from 'react'

function AuthenticatedTabSidebar(tabs) {
  return (
    <div className='flex flex-col '>
      {tabs.map(tab => {
        <div key={tab.id} className=''>
            {tab.title}
        </div>
      })}
    </div>
  )
}

export default AuthenticatedTabSidebar
