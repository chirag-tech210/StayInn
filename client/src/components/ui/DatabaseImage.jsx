import React, { useState } from 'react';

const DatabaseImage = ({ src, alt = '', className = '', fallbackSrc = null, ...rest }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  // If it's a database image (starts with /api/images), use the full URL
  const imageSrc = src?.startsWith('/api/images') 
    ? `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${src}`
    : src;

  if (imageError && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        {...rest}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...rest}
      />
    </div>
  );
};

export default DatabaseImage; 