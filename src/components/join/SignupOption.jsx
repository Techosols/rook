import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';

function SignupOption({onClick}) {
  return (
    <div className='flex flex-col items-center justify-center h-50 bg-background dark:bg-background-dark p-4 dark:text-white'>
        <p>Please sign into the email address that you would like to attach to your Rook membership. All notification from Rook will go to this email address</p>
        <div className='flex flex-col items-center justify-center mt-4'>
            <button className="py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white w-full sm:w-auto cursor-pointer space-x-2 flex items-center" onClick={onClick}>
              <GoogleIcon />
              <span>Google</span>
            </button>
        </div>
    </div>
  )
}

export default SignupOption