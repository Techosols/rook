import React from 'react'

function LegalInfo() {
  return (
    <div className='flex flex-col items-center justify-center h-50 bg-background dark:bg-background-dark p-4 dark:text-white'>
        <div className='flex flex-col items-center justify-center mt-4'>
            <div className='flex flex-col md:flex-row md:space-x-4'>
                <p className=''>Legal Name</p>
                <input 
                    type="text" 
                    placeholder='First Name' 
                    className='border border-gray-300 rounded-md p-2 dark:bg-background-dark dark:text-white'
                />
                <input 
                    type="text" 
                    placeholder='Last Name' 
                    className='border border-gray-300 rounded-md p-2 dark:bg-background-dark dark:text-white'
                />
            </div>
            <div className=''>

            </div>

        </div>
    </div>
  )
}

export default LegalInfo