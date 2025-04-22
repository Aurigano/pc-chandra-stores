import CommandSearch from '@/components/Reusables/Searchbar';
import { Button } from '@/components/ui/button';
import React from 'react';
import CityCard from '@/components/Reusables/CityCard';
import AdBanner from '@/components/Reusables/AdBanner';
import DelhiIcon from '@/assets/delhi.svg?react';
import JaipurIcon from '@/assets/jaipur.svg?react';
import HyderabadIcon from '@/assets/hyderabad.svg?react';
import BengaluruIcon from '@/assets/bangalore.svg?react';
import KolkataIcon from '@/assets/kolkata.svg?react';
import MumbaiIcon from '@/assets/mumbai.svg?react';

const StoreLocator: React.FC = () => {
  const commands = [
    { value: "new-delhi", label: "New Delhi" },
    { value: "jaipur", label: "Jaipur" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "bengaluru", label: "Bengaluru" },
    { value: "kolkata", label: "Kolkata" },
    { value: "mumbai", label: "Mumbai" },
  ];
  
  // List of cities with their icons
  const cities = [
    { id: "new-delhi", name: "New Delhi", icon: <DelhiIcon height={50} width={'auto'} /> },
    { id: "jaipur", name: "Jaipur", icon: <JaipurIcon height={50} width={'auto'} /> },
    { id: "hyderabad", name: "Hyderabad", icon: <HyderabadIcon height={50} width={'auto'} /> },
    { id: "bengaluru", name: "Bengaluru", icon: <BengaluruIcon height={50} width={'auto'} /> },
    { id: "kolkata", name: "Kolkata", icon: <KolkataIcon height={50} width={'auto'} /> },
    { id: "mumbai", name: "Mumbai", icon: <MumbaiIcon height={50} width={'auto'} /> },
  ];
  
  // Advertisement data
  const advertisements = [
    {
      imageUrl: '/assets/ad1.png',
      altText: 'Special Discount on Gold Jewelry',
      linkUrl: '/promotions/gold-discount'
    },
    {
      imageUrl: '/assets/ad2.png',
      altText: 'New Diamond Collection',
      linkUrl: '/collections/diamond'
    },
    {
      imageUrl: '/assets/ad1.png', // Using ad1 again as placeholder for the third ad
      altText: 'Wedding Season Offers',
      linkUrl: '/promotions/wedding'
    }
  ];
  
  const handleSelect = (value: string) => {
    // We can use this to track selection if needed for other purposes
    console.log("Selected:", value);
    // Note: Navigation is now handled directly in the CommandSearch component
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      <h1 className="text-[#AF1F2D] text-[32px] font-medium text-center mb-4">
        Store Locator
      </h1>
      <p className="text-[#878787] text-center mb-6">Available with 69 store all around India in popular cities.</p>
      
      <div className="flex justify-center items-center my-6">
        <div className="flex items-center gap-4">
          <div className="w-[840px]">
            <CommandSearch commands={commands} onSelect={handleSelect} />
          </div>
          <Button className="w-[230px] h-[60px] relative -top-[2px]">
            Search
          </Button>
        </div>
      </div>
      
      <div className="my-[80px] max-w-[1080px] mx-auto">
        <div className="flex gap-4 justify-between">
          {cities.map(city => (
            <CityCard 
              key={city.id}
              cityId={city.id}
              cityName={city.name}
              icon={city.icon}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-[80px] max-w-[1080px] mx-auto">
        <AdBanner ads={advertisements} />
      </div>
    </div>
  );
};

export default StoreLocator; 