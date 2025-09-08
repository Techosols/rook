import React from 'react'
import { BadgeAlert } from 'lucide-react'
import FormSection from '../ui/FormSection'
import ImagePlaceholder from '../ui/ImagePlaceholder'

function YourPictures() {
  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Main Pictures">
        <p className='text-sm text-gray-500'> <span><BadgeAlert className="inline mb-1 mr-1" size={16} /></span>Solo pics where you are wearing sunglasses, or group pics, will be rejected.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <ImagePlaceholder />
          <ImagePlaceholder />
          <ImagePlaceholder />
          <ImagePlaceholder />
        </div>
      </FormSection>
      <FormSection title="Additional pictures">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {[...Array(6).keys()].map(i => (
          <ImagePlaceholder key={i} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default YourPictures
