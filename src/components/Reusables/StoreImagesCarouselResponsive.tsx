import React, { useState, useEffect, useRef } from 'react';
import ArrowPtr from '@/assets/icons/arrowptr.svg?react';
import ImageGalleryOverlay from './ImageGalleryOverlay';

interface StoreImagesCarouselProps {
  images: string[];
  title?: string;
}

const StoreImagesCarousel: React.FC<StoreImagesCarouselProps> = ({ 
  images,
  title = "Store Images"
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Check if scrolling is possible in either direction
  const checkScrollability = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      setCanScrollLeft(carousel.scrollLeft > 0);
      setCanScrollRight(carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 5);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollability);
      // Check initial state
      checkScrollability();
      return () => carousel.removeEventListener('scroll', checkScrollability);
    }
  }, []);

  // Handle scroll actions
  const scroll = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = 220 * (direction === 'left' ? -1 : 1);
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle image click to open the gallery
  const openGallery = (index: number) => {
    console.log('Opening gallery');
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  // Handle closing the gallery
  const closeGallery = () => {
    console.log('Closing gallery');
    setGalleryOpen(false);
  };

  return (
    <>
      <div className="p-2 sm:p-6 w-full mt-2 sm:mt-0">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-medium text-gray-800">{title}</h2>}
          
          {/* Carousel Navigation Buttons - Top Right */}
          <div className="flex space-x-2">
            <button 
              className={`p-1 rounded-full ${canScrollLeft ? 'text-[#AF1F2D] hover:bg-red-50' : 'text-gray-300 cursor-not-allowed'}`}
              onClick={() => canScrollLeft && scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ArrowPtr className="w-4 h-4" />
            </button>
            
            <button 
              className={`p-1 rounded-full ${canScrollRight ? 'text-[#AF1F2D] hover:bg-red-50' : 'text-gray-300 cursor-not-allowed'}`}
              onClick={() => canScrollRight && scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ArrowPtr className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
        
        <div className="relative w-full overflow-hidden">
          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            id="store-images-carousel"
            className="flex overflow-x-hidden pb-4 hide-scrollbar snap-x w-full"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[200px] h-[200px] mr-4 last:mr-0 rounded-lg overflow-hidden snap-start cursor-pointer"
                onClick={() => openGallery(index)}
              >
                <img 
                  src={image} 
                  alt={`Store view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Overlay */}
      {galleryOpen && (
        <ImageGalleryOverlay 
          images={images}
          initialIndex={selectedImageIndex}
          onClose={closeGallery}
        />
      )}
    </>
  );
};

export default StoreImagesCarousel; 