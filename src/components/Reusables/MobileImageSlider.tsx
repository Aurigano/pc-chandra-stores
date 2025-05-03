import React, { useState, useEffect, useRef } from 'react';

interface MobileImageSliderProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onImageClick?: () => void;
}

const MobileImageSlider: React.FC<MobileImageSliderProps> = ({
  images,
  currentIndex,
  onIndexChange,
  onImageClick
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [localIndex, setLocalIndex] = useState(currentIndex);
  const [animating, setAnimating] = useState(false);

  // Update slider width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Sync localIndex with currentIndex
  useEffect(() => {
    setLocalIndex(currentIndex);
    setDragOffset(0);
  }, [currentIndex]);

  // Handle touch and drag events
  const onTouchStart = (e: React.TouchEvent) => {
    if (animating) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !touchStart || animating) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate drag offset
    const delta = currentTouch - touchStart;
    
    // Add resistance at the edges
    if ((currentIndex === 0 && delta > 0) || 
        (currentIndex === images.length - 1 && delta < 0)) {
      setDragOffset(delta * 0.3); // Add resistance
    } else {
      setDragOffset(delta);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !isDragging || animating) return;
    
    setIsDragging(false);
    
    if (touchEnd) {
      const distance = touchStart - touchEnd;
      const threshold = sliderWidth * 0.2; // 20% of slider width threshold for swipe
      
      if (Math.abs(distance) > threshold) {
        setAnimating(true);
        
        if (distance > 0 && currentIndex < images.length - 1) {
          // Swipe left -> next image
          setLocalIndex(currentIndex + 1);
          
          // Wait for animation to complete before updating the actual index
          setTimeout(() => {
            onIndexChange(currentIndex + 1);
            setAnimating(false);
            setDragOffset(0);
          }, 300); // Match the duration in the CSS transition
          
        } else if (distance < 0 && currentIndex > 0) {
          // Swipe right -> previous image
          setLocalIndex(currentIndex - 1);
          
          setTimeout(() => {
            onIndexChange(currentIndex - 1);
            setAnimating(false);
            setDragOffset(0);
          }, 300);
          
        } else {
          // Can't go beyond first/last
          setAnimating(true);
          setDragOffset(0);
          setTimeout(() => {
            setAnimating(false);
          }, 300);
        }
      } else {
        // Not enough distance, bounce back
        setAnimating(true);
        setDragOffset(0);
        setTimeout(() => {
          setAnimating(false);
        }, 300);
      }
    } else {
      setDragOffset(0);
    }
  };

  // Handle tap navigation
  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Prevent navigation if we were dragging or during animation
    if (isDragging || Math.abs(dragOffset) > 10 || animating) return;
    
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    
    if (clickX < screenWidth / 3) {
      // Left third of screen - go previous
      if (currentIndex > 0) {
        setAnimating(true);
        setLocalIndex(currentIndex - 1);
        
        setTimeout(() => {
          onIndexChange(currentIndex - 1);
          setAnimating(false);
        }, 300);
      }
    } else if (clickX > (screenWidth * 2) / 3) {
      // Right third of screen - go next
      if (currentIndex < images.length - 1) {
        setAnimating(true);
        setLocalIndex(currentIndex + 1);
        
        setTimeout(() => {
          onIndexChange(currentIndex + 1);
          setAnimating(false);
        }, 300);
      }
    } else {
      // Center of screen - toggle UI if handler provided
      if (onImageClick) {
        onImageClick();
      }
    }
  };

  return (
    <div 
      className="w-full h-full overflow-hidden relative" 
      ref={sliderRef}
      onClick={handleTap}
    >
      <div 
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ 
          transform: `translateX(${-localIndex * 100}%) translateX(${isDragging ? dragOffset : 0}px)`,
          pointerEvents: animating ? 'none' : 'auto'
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="max-h-full max-w-full object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
      
      {/* Tap navigation indicators (optional) */}
      <div className="absolute inset-0 z-[-1] pointer-events-none flex">
        <div className="w-1/3 h-full bg-transparent" />
        <div className="w-1/3 h-full bg-transparent" />
        <div className="w-1/3 h-full bg-transparent" />
      </div>
      
      {/* Navigation hints - moved higher up */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">
          Tap edges or swipe to navigate
        </div>
      </div>
    </div>
  );
};

export default MobileImageSlider; 