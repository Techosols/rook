import React from 'react'


function ImagePlaceholder({ onImageSelect, className = '' }) {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);

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
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect && onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors duration-200 ${dragActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-background-dark'} cursor-pointer hover:border-primary ${className}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current && inputRef.current.click()}
      style={{ minHeight: 180 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.5V8m0 0l-4-4m4 4l4-4M12 16v-4m0 0l-4 4m4-4l4 4" />
      </svg>
      <p className="text-gray-500 dark:text-gray-300 mb-1 text-center">Drag & drop an image here, or <span className="text-primary underline">click to upload</span></p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

export default ImagePlaceholder
