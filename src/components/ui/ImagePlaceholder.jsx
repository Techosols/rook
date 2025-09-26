import { useState, useRef, useEffect } from 'react';
import { ImageUp, UserCheck, Trash2, Image, InfoIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';
import { toast } from 'react-toastify';
import useFileServiceApi from '../../hooks/useFileServiceApi';
import useAuthenticatedApi from '../../hooks/useAuthenticatedApi';


function ImagePlaceholder({ onImageSelect, onUploadSuccess, className = '', hint = '', imageObject }) {

  const { user } = useAuth0();

  const api = useFileServiceApi();
  const authApi = useAuthenticatedApi();

  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(imageObject ? imageObject.fileUrl : null);
  const [allowImageUpload, setAllowImageUpload] = useState(false);
  const [allowImageUploadMessage, setAllowImageUploadMessage] = useState('');
  const [autoUploadingImage, setAutoUploadingImage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const inputRef = useRef(null);

  useEffect(() => {
    authApi.get('v1/settings').then((res) => {
      setAllowImageUpload(res.data.allowProfileImageUploads);
      setAllowImageUploadMessage(res.data.disallowProfileImageUploadsMessage);
    });
  }, []);

  // Sync local image state with imageObject prop
  useEffect(() => {
    setImage(imageObject ? imageObject.fileUrl : null);
  }, [imageObject]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Image size must be less than 5MB.');
        return;
      }
      onImageSelect && onImageSelect(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Image size must be less than 5MB.');
        return;
      }
      onImageSelect && onImageSelect(file);
      //setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = async () => {
    setIsDeleting(true);
    try {
      const res = await api.post('v1/actions/record', {
        "object": "event",
        "type": "user.image-deleted",
        "data": {
          "externalId": imageObject ? imageObject.fileExternalId : null,
          "occurredAt": new Date().toISOString()
        }
      });
      if (res.status === 200) {
        toast.success('Your image was deleted successfully');
        setImage(null);
        // Notify parent to remove this image from state
        if (onUploadSuccess) onUploadSuccess(null);
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      toast.error('Failed to delete Image');
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to handle image upload
  const handleImageUpload = async (imageType, status) => {
    if (!allowImageUpload) {
      toast.info(allowImageUploadMessage || 'Image uploads are currently disabled. Please try again later or contact support.');
      return;
    }

    if (!imageObject?.file) {
      toast.error('No file selected for upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageObject.file);
    formData.append('profileImageType', imageType);
    formData.append('profileImageStatus', status);

    setAutoUploadingImage(true);
    try {
      const res = await api.post(
        `v1/actions/upload/profile-image/${imageType}/status/${status}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (res.status === 202) {
        toast.success('Image uploaded successfully');
        // Create updated image data with new status
        const updatedImageData = {
          ...imageObject,
          profileImageStatus: 'Pending', 
          fileExternalId: res.data?.fileExternalId || imageObject.fileExternalId,
          uploadedAt: new Date().toISOString()
        };
        // Notify parent to update just this image
        if (onUploadSuccess) onUploadSuccess(updatedImageData);
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        toast.warn('Internal server error. Please try again later or contact support.');
      } else {
        toast.error('Failed to upload image.');
      }
      console.error('Err_img_upload:', err);
    } finally {
      setAutoUploadingImage(false);
    }
  };

  return (
    <>
      {image ? (
        <div className='group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]'>
          {/* Status Badge */}
          {imageObject?.profileImageStatus && (
            <div className="absolute top-3 right-3 z-10">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                imageObject.profileImageStatus === 'ReadyToUpload' 
                  ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' 
                  : imageObject.profileImageStatus === 'Pending'
                  ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30'
                  : imageObject.profileImageStatus === 'Rejected'
                  ? 'bg-red-500/20 text-red-600 border border-red-500/30'
                  : 'bg-green-500/20 text-green-600 border border-green-500/30'
              }`}>
                {imageObject.profileImageStatus === 'ReadyToUpload' ? 'Ready' : imageObject.profileImageStatus}
              </span>
            </div>
          )}

          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img 
              src={image} 
              alt={user?.name} 
              className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105' 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Action Buttons */}
          <div className='p-4 bg-gray-50 dark:bg-gray-800/50'>
            <div className='flex items-center justify-center gap-3'>
              {/* Upload button only enabled for ReadyToUpload */}
              <Button
                size="sm"
                loading={autoUploadingImage}
                disabled={
                  !allowImageUpload ||
                  !imageObject?.file ||
                  imageObject?.profileImageStatus !== 'ReadyToUpload' ||
                  autoUploadingImage
                }
                onClick={() => handleImageUpload(imageObject?.profileImageType, 'new')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <ImageUp className='w-4 h-4' />
              </Button>
              {/* UserCheck button enabled for ReadyToUpload or Rejected */}
              <Button
                size="sm"
                variant="secondary"
                disabled={
                  !allowImageUpload ||
                  (imageObject?.profileImageStatus === 'ReadyToUpload' && !imageObject?.file) ||
                  (imageObject?.profileImageStatus !== 'ReadyToUpload' && imageObject?.profileImageStatus !== 'Rejected') ||
                  autoUploadingImage
                }
                onClick={() => {
                  // Add your UserCheck logic here
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <UserCheck className='w-4 h-4' />
              </Button>
              {/* Delete button enabled for uploaded images (not ReadyToUpload) or Rejected */}
              <Button
                size="sm"
                onClick={handleRemoveImage}
                disabled={
                  isDeleting ||
                  autoUploadingImage ||
                  (imageObject?.profileImageStatus === 'ReadyToUpload')
                }
                loading={isDeleting}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
          </div>

          {/* Loading Overlay */}
          {(autoUploadingImage || isDeleting) && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {autoUploadingImage ? 'Uploading...' : 'Deleting...'}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={` group flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors duration-200 ${dragActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-background-dark'} cursor-pointer hover:border-primary ${className}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current && inputRef.current.click()}
          style={{ minHeight: 180 }}
        >
          <Image className="w-10 h-10 mb-2 text-gray-400 group-hover:text-primary group-hover:opacity-70" />
          {hint ? <p className="text-gray-500 dark:text-gray-300 mb-2 text-center text-sm"> {hint} <br /><span className='text-primary underline'>Click to upload Image</span></p> : <p className="text-gray-500 dark:text-gray-300 mb-1 text-center text-sm">Drag & drop an image here, or <span className="text-primary underline">click to upload</span></p>}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
}

export default ImagePlaceholder
