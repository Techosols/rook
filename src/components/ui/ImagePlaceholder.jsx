import { useState, useRef } from 'react';
import { ImageUp, UserCheck, Trash2, Image } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from './Button';


function ImagePlaceholder({ onImageSelect, className = '' }) {

  const { user } = useAuth0();

  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

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
      onImageSelect && onImageSelect(e.dataTransfer.files[0]);
      setImage(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect && onImageSelect(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    onImageSelect && onImageSelect(null);
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const handleImageUpload = () => {
    alert('Image upload functionality to be implemented');
  }

  return (
    <>
      {image ? (
        <div className='group hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-xl flex flex-col items-center'>
          <img src={image} alt={user?.name} className=' w-50 h-40 object-contain ' />
          <div className='flex items-center gap-2 mt-2 '>
            <Button size="sm" onClick={handleImageUpload}  disabled={true}><ImageUp className='' /></Button>
            <Button size="sm" variant="secondary" onClick={handleImageUpload}  disabled={true}><UserCheck className='' /></Button>
            <Button size="sm" variant="destructive" onClick={handleRemoveImage}><Trash2 className=''  /></Button>
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
          <p className="text-gray-500 dark:text-gray-300 mb-1 text-center">Drag & drop an image here, or <span className="text-primary underline">click to upload</span></p>
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
