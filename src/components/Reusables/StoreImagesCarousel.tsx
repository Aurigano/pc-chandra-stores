import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoreImagesCarouselProps {
  images: string[];
  title?: string;
  width?: number;
}

const StoreImagesCarousel: React.FC<StoreImagesCarouselProps> = ({ 
  images,
  title = "Store Images",
  width = 910 // Default width that works well
}) => {
  return (
    <div className="p-6 w-full">
      {title && <h2 className="text-lg font-medium text-gray-800 mb-4">{title}</h2>}
      
      <div className="relative w-full overflow-hidden px-2">
        {/* Carousel Navigation Buttons */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
          onClick={() => {
            const carousel = document.getElementById('store-images-carousel');
            if (carousel) {
              carousel.scrollBy({ left: -220, behavior: 'smooth' });
            }
          }}
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
          onClick={() => {
            const carousel = document.getElementById('store-images-carousel');
            if (carousel) {
              carousel.scrollBy({ left: 220, behavior: 'smooth' });
            }
          }}
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Carousel Container */}
        <div 
          id="store-images-carousel"
          className="flex overflow-x-auto pb-4 hide-scrollbar snap-x"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            width: `${width}px`,
            maxWidth: '100%'
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[200px] h-[200px] mr-4 last:mr-0 rounded-lg overflow-hidden snap-start"
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
  );
};

export default StoreImagesCarousel; 