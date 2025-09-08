import React from 'react'
import Button from '../ui/Button'

function FormSection({children, onSave, loading, title}) {
  return (
    <div className='p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-background dark:bg-background-dark rounded shadow space-y-4 dark:border dark:border-primary-dark dark:rounded-md'>
        <h2 className='text-2xl font-semibold dark:text-white'>{title}</h2>
        <hr className='border-gray-300 dark:border-gray-600' />
        {children}
        <Button onClick={onSave} text={"Save"} loading={loading} active={true} />
    </div>
  )
}

export default FormSection;
