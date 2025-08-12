import React from 'react'
import { BadgeHelpIcon } from 'lucide-react'
import { Link } from 'react-router-dom';

function NotFound() {

    let path = window.location.pathname;

    path = path.replace('/', '');

  return (
    <div className='grid place-items-center h-screen bg-background dark:bg-background-dark dark:text-white'>
        <div className='flex flex-col items-center space-y-4'>
            <BadgeHelpIcon className='w-40 h-40 text-primary dark:text-primary-dark'  />
            <h3 className='text-3xl text-primary dark:text-primary-dark font-bold'>Page not found</h3>
            <p>We could not found <span className='text-primary dark:text-primary-dark'>{path} </span> page for you. please try a different url</p>
            <div className='flex items-center justify-center'>
                <Link to='/' className='text-primary dark:text-primary-dark hover:underline'>Go to Home</Link>
                <span className='mx-2'>|</span>
                <Link to='/contact' className='text-primary dark:text-primary-dark hover:underline'>Contact Us</Link>
                <span className='mx-2'>|</span>
                <Link to='/faq' className='text-primary dark:text-primary-dark hover:underline'>FAQ</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound