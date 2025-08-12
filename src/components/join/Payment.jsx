import React from 'react'

function Payment() {
  return (
   <section>
      <div>
      <ul>
        <li className='text-center my-2'>Your card will be charged $10 today. This covers the cost of safety screening and the first month of membership.</li>
        <li className='text-center my-2'>After the first month, your card will be charged $5 every month, until you cancel.</li>
        <li className='text-center my-2'>You can cancel anytime, in your account settings.</li>
      </ul>
      </div>
     <div className='border w-[800px] mx-auto my-4'>
     <div className='flex justify-center items-center my-2 gap-4'>
       <h1 className='text-center'>Payment info</h1>
       <input type="text" placeholder='Card number here' />
      </div>
      <div className='flex justify-center items-center my-2 gap-4'>
      <input type="text" placeholder='Exp: MM/YY' />
       <input type="text" placeholder='CVV' />
      </div>
      <div>
        <h1 className='mt-2 text-center'>In the next step you will log in, using a Google/Microsoft/Apple email address.</h1>
        <button className='py-3 px-8 bg-primary dark:bg-primary-dark rounded-full text-white w-full sm:w-auto cursor-pointer'>CONFIRM & Continue</button>
      </div>
     </div>
   </section>
  )
}

export default Payment