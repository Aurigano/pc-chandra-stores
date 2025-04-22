import React from 'react';

interface AdProps {
  imageUrl: string;
  altText: string;
  linkUrl: string;
}

interface AdBannerProps {
  ads: AdProps[];
}

const AdBanner: React.FC<AdBannerProps> = ({ ads }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {ads.map((ad, index) => (
          <div 
            key={index} 
            className="bg-white overflow-hidden shadow-md flex-1 transition-transform hover:scale-[1.02]"
          >
            <a 
              href={ad.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={ad.imageUrl}
                alt={ad.altText}
                className="w-full h-auto"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdBanner; 