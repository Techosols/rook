import React from 'react'
import GoogleIcon from "@mui/icons-material/Google";

function SignupOption({ onClick }) {
  return (
    <div>
      <div className='flex items-center justify-center h-50 bg-background dark:bg-background-dark p-4 dark:text-white'>
        <button className='flex items-center gap-2 bg-primary dark:bg-primary-dark text-white py-2 px-4 rounded cursor-pointer hover:rounded-lg' onClick={onClick}>
          <GoogleIcon />
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  )
}

export default SignupOption
