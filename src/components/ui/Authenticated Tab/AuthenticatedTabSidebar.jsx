import React from 'react'

function AuthenticatedTabSidebar({ tabs, onTabClick, active }) {
  return (
    <div className='flex flex-col gap-1'>
      {tabs.map(tab => (
        <div key={tab.id} className={` p-1 rounded-md hover:cursor-pointer hover:bg-primary hover:dark:bg-primary-dark hover:text-white ${tab.value === active ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark dark:text-white'}`} onClick={() => onTabClick(tab.value)}>
            {tab.label}
        </div>
      ))}
    </div>
  )
}

export default AuthenticatedTabSidebar
