import { useState, useEffect } from 'react'
import { BadgeAlert } from 'lucide-react'
import FormSection from '../ui/FormSection'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import useFileServiceApi from '../../hooks/useFileServiceApi'

function YourPictures() {
  const api = useFileServiceApi()

  const [apiImages, setApiImages] = useState([])
  const [localImages, setLocalImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Combine both sources
  const allImages = [...apiImages, ...localImages];

  // Map main and additional image slots
  const mainImages = [1, 2, 3, 4].map(type => allImages.find(img => img.profileImageType === type) || null);
  const additionalImages = [5, 6, 7, 8, 9, 10].map(type => allImages.find(img => img.profileImageType === type) || null);

  useEffect(() => {
    fetchImages();
  }, [])

  // Function to fetch images from API
  const fetchImages = () => {
    setLoading(true)
    api.get('v1/profile-images')
      .then(res => {
        setApiImages(res.data)
      })
      .catch(err => {
        console.error('ERR_FETCH_IMAGES: ', err)
      })
      .finally(() => setLoading(false))
  }

  // Image upload handler
  function handleImageSelect(file, type) {
    if (!file) return;
    const newImage = {
      fileUrl: URL.createObjectURL(file),
      file,
      profileImageType: type,
      profileImageStatus: 'ReadyToUpload',
    };
    setLocalImages(prev => [...prev, newImage]);
  }

  // Handle successful upload or deletion
  function handleUploadSuccess(type, uploadedImageData) {
    // Remove the local image for this type
    setLocalImages(prev => prev.filter(img => img.profileImageType !== type));
    
    if (uploadedImageData === null) {
      // Handle deletion - remove from apiImages
      setApiImages(prev => prev.filter(img => img.profileImageType !== type));
    } else if (uploadedImageData) {
      // Handle upload - add/update the uploaded image in apiImages
      setApiImages(prev => {
        const filtered = prev.filter(img => img.profileImageType !== type);
        return [...filtered, uploadedImageData];
      });
    }
  }

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      {/* MAIN PICTURES */}
      <FormSection title="Main Pictures" showSaveButton={false}>
        <p className='text-sm text-gray-500'>
          <BadgeAlert className="inline mb-1 mr-1" size={16} />
          Solo pics where you are wearing sunglasses, or group pics, will be rejected.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))
            : mainImages.map((image, idx) => (
                <ImagePlaceholder
                  key={idx + 1}
                  imageObject={image}
                  onImageSelect={!image ? (file) => handleImageSelect(file, idx + 1) : undefined}
                  onUploadSuccess={(uploadedImageData) => handleUploadSuccess(idx + 1, uploadedImageData)}
                />
              ))}
        </div>
      </FormSection>

      {/* ADDITIONAL PICTURES */}
      <FormSection title="Additional pictures" showSaveButton={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))
            : additionalImages.map((image, idx) => (
                <ImagePlaceholder
                  key={idx + 5}
                  imageObject={image}
                  onImageSelect={!image ? (file) => handleImageSelect(file, idx + 5) : undefined}
                  onUploadSuccess={(uploadedImageData) => handleUploadSuccess(idx + 5, uploadedImageData)}
                />
              ))}
        </div>
      </FormSection>
    </div>
  )
}

export default YourPictures
