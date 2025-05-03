import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import ArrowPtr from '@/assets/icons/arrowptr.svg?react';
import MobileImageSlider from './MobileImageSlider';

interface ImageGalleryOverlayProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImageGalleryOverlay: React.FC<ImageGalleryOverlayProps> = ({
  images,
  initialIndex,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, navigate]);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Semi-transparent background - separate element for clarity */}
      <div className="absolute inset-0 bg-[#000000CC]" />
      
      {/* Close button - separate div for better hit area */}
      <div 
        className="absolute top-4 right-4 z-[51] cursor-pointer rounded-full bg-black hover:bg-white group p-2"
        onClick={handleCloseClick}
      >
        <X size={24} className="text-white group-hover:text-[#AF1F2D]" />
      </div>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white text-sm z-[51]">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image container */}
      <div className="relative z-[51] flex items-center justify-center p-0 w-full h-full">
        {isMobile ? (
          /* Mobile Image Slider */
          <MobileImageSlider 
            images={images}
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            onImageClick={() => {}} // Optional click handler for center area
          />
        ) : (
          /* Desktop Image Viewer */
          <div 
            id="image-parent"
            ref={imageRef}
            className="relative inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Navigation arrows - only on desktop */}
      {!isMobile && (
        <>
          <button
            className="absolute left-4 p-3 text-white hover:bg-white group hover:bg-opacity-90 rounded-full z-[51] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate('prev');
            }}
          >
            <ArrowPtr className="w-6 h-6 group-hover:text-[#AF1F2D]" />
          </button>

          <button
            className="absolute right-4 p-3 text-white hover:bg-white group hover:bg-opacity-90 rounded-full z-[51] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate('next');
            }}
          >
            <ArrowPtr className="w-6 h-6 rotate-180 group-hover:text-[#AF1F2D]" />
          </button>
        </>
      )}

      {/* Thumbnail navigation - stop propagation to prevent closing */}
      <div 
        className="absolute bottom-4 left-0 right-0 flex justify-center z-[51]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex space-x-2 p-2 bg-black bg-opacity-50 rounded-lg overflow-x-auto max-w-full">
          {images.map((image, index) => (
            <button
              key={index}
              className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-[#AF1F2D]' : 'opacity-60'
              } hover:opacity-100 transition-opacity cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryOverlay; 