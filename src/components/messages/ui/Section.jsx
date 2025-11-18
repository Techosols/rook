import React from 'react'

function Section({ children, title, description}) {
    return (
        <div className='p-4 rounded-lg shadow-sm' >
            <h2 className='text-2xl font-semibold mb-2 text-primary'>{title}</h2>
            {description && <p className='text-gray-600 mb-4'>{description}</p>}
            <hr className='mb-4 text-gray-200' />
            {children}
        </div>
    )
}

export default Section
