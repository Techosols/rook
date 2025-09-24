import { useState, useRef, useEffect } from 'react';
import { ImageUp, UserCheck, Trash2, Image, InfoIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';
import { toast } from 'react-toastify';
import useFileServiceApi from '../../hooks/useFileServiceApi';
import useAuthenticatedApi from '../../hooks/useAuthenticatedApi';


function ImagePlaceholder({ onImageSelect, onUploadSuccess, className = '', hint = '', imageObject }) {

  console.log("Rendering ImagePlaceholder", imageObject);

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
    // console.log('Removing image:', imageObject);
    // onImageSelect && onImageSelect(null);


    setIsDeleting(true);
    try {
      console.log('Removing image:', imageObject);
      const res = await api.post('v1/actions/record', {
        "object": "event",
        "type": "user.image-deleted",
        "data": {
          "externalId": imageObject ? imageObject.fileExternalId : null,
          "occurredAt": new Date().toISOString()
        }
      });
      console.log('Delete response:', res);
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
          profileImageStatus: 'Pending', // or whatever status the upload creates
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
      {console.log("Rendering ImagePlaceholder", image)}
      {image ? (
        <div className='group hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex flex-col items-center relative selection-none'>

          <img src={image} alt={user?.name} className=' w-50 h-40 object-cover ' />
          <div className='flex items-center gap-2 mt-2 '>
            {/* Upload/Approve buttons only enabled for ReadyToUpload */}
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
            >
              <ImageUp className='' />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={
                !allowImageUpload ||
                !imageObject?.file ||
                imageObject?.profileImageStatus !== 'ReadyToUpload' ||
                autoUploadingImage
              }
            >
              <UserCheck className='' />
            </Button>
            {/* Delete only enabled for uploaded images (not ReadyToUpload) */}
            <Button
              size="sm"
              onClick={handleRemoveImage}
              disabled={
                isDeleting ||
                autoUploadingImage ||
                imageObject?.profileImageStatus === 'ReadyToUpload'
              }
              loading={isDeleting}
            >
              <Trash2 className='' />
            </Button>
          </div>

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
