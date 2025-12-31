
const Popup = () => {
  return (
    <div className='bg-gray-300 dark:bg-gray-700 p-4 rounded-lg text-start absolute left-32 top-[-50px] w-80 z-50 shadow-2xl border'>
      <h1 className='py-2'>This User has logged in from <br /> the following locations</h1> <hr />
      <div className='py-2'>
        <div className='flex justify-between'>
            <h1>Pakistan</h1>
            <h1 className='text-sm text-primary font-extrabold'>12/27/2025</h1>
        </div>
        <div className='flex justify-between'>
            <h1>USA</h1>
            <h1 className='text-sm text-primary font-extrabold'>12/21/2025</h1>
        </div>
        </div>
    </div>
  )
}

export default Popup
