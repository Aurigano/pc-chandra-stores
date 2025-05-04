import CommandSearch from '@/components/Reusables/Searchbar';
import { Button } from '@/components/ui/button';
import React from 'react';
import CityCard from '@/components/Reusables/CityCard';
import AdBanner from '@/components/Reusables/AdBanner';
import DelhiIcon from '@/assets/delhi.svg?react';
import JaipurIcon from '@/assets/jaipur.svg?react';
import HyderabadIcon from '@/assets/hyderabad.svg?react';
import MumbaiIcon from '@/assets/mumbai.svg?react';
import BengaluruIcon from '@/assets/bangalore.svg?react';
import KolkataIcon from '@/assets/kolkata.svg?react';
import { useNavigate } from 'react-router-dom';
import { useShowroomStore } from '@/store/showroomStore';
import useScrollToTop from '@/hooks/useScrollToTop';

const StoreLocator: React.FC = () => {
  useScrollToTop();
  
  // Mock data for reference
  // const commands = [
  //   { value: "new-delhi", label: "New Delhi" },
  //   { value: "jaipur", label: "Jaipur" },
  //   { value: "hyderabad", label: "Hyderabad" },
  //   { value: "bengaluru", label: "Bengaluru" },
  //   { value: "kolkata", label: "Kolkata" },
  //   { value: "mumbai", label: "Mumbai" },
  // ];

  // const cities = [
  //   { id: "new-delhi", name: "New Delhi", icon: <DelhiIcon height={50} width={'auto'} /> },
  //   { id: "jaipur", name: "Jaipur", icon: <JaipurIcon height={50} width={'auto'} /> },
  //   { id: "hyderabad", name: "Hyderabad", icon: <HyderabadIcon height={50} width={'auto'} /> },
  //   { id: "bengaluru", name: "Bengaluru", icon: <BengaluruIcon height={50} width={'auto'} /> },
  //   { id: "kolkata", name: "Kolkata", icon: <KolkataIcon height={50} width={'auto'} /> },
  //   { id: "mumbai", name: "Mumbai", icon: <MumbaiIcon height={50} width={'auto'} /> },
  // ];

  const navigate = useNavigate();
  const { showrooms } = useShowroomStore();

  // Cities to show
  const citiesToShow = ['Kolkata', 'Bengaluru', 'Ahmedabad', 'Agartala', 'Asansol', 'Silchar'];

  // Map city names to their corresponding icons
  const cityIcons: Record<string, React.ReactNode> = {
    'Kolkata': <KolkataIcon height={50} width={'auto'} />,
    'Bengaluru': <BengaluruIcon height={50} width={'auto'} />,
    'Ahmedabad': <DelhiIcon height={50} width={'auto'} />,
    'Agartala': <JaipurIcon height={50} width={'auto'} />,
    'Asansol': <HyderabadIcon height={50} width={'auto'} />,
    'Silchar': <MumbaiIcon height={50} width={'auto'} />,
  };

  // Create commands for search using the specified cities
  const commands = citiesToShow.map(city => ({
    value: city.toLowerCase().replace(/\s+/g, '-'),
    label: city
  }));
  
  // List of cities with their icons
  const cityCards = citiesToShow.map(city => ({
    id: city.toLowerCase().replace(/\s+/g, '-'),
    name: city,
    icon: cityIcons[city] || <DelhiIcon height={50} width={'auto'} /> // Fallback to Delhi icon
  }));
  
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
      imageUrl: '/assets/ad1.png',
      altText: 'Wedding Season Offers',
      linkUrl: '/promotions/wedding'
    }
  ];
  
  const handleSelect = (value: string) => {
    navigate(`/storelocator/${value}`);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-[#AF1F2D] text-2xl sm:text-3xl md:text-[32px] font-medium text-center mb-3 sm:mb-4 mt-6 sm:mt-8">
        Store Locator
      </h1>
      <p className="text-[#878787] text-sm sm:text-base text-center mb-4 sm:mb-6">
        Available with {showrooms.length} stores all around India in popular cities.
      </p>
      
      <div className="flex justify-center items-center my-4 sm:my-6">
        <div className="flex flex-col sm:flex-row items-center w-full max-w-[1080px] gap-3 sm:gap-4">
          <div className="w-full max-w-[640px] sm:max-w-[740px] md:max-w-[840px]">
            <CommandSearch commands={commands} onSelect={handleSelect} />
          </div>
          <Button className="w-full sm:w-[180px] md:w-[230px] h-[50px] sm:h-[60px] relative sm:-top-[2px]">
            Search
          </Button>
        </div>
      </div>
      
      <div className="my-8 sm:my-12 md:my-[80px] max-w-[1080px] mx-auto">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {cityCards.map(city => (
            <CityCard 
              key={city.id}
              cityId={city.id}
              cityName={city.name}
              icon={city.icon}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8 sm:mb-12 md:mb-[80px] max-w-[1080px] mx-auto">
        <AdBanner ads={advertisements} />
      </div>
    </div>
  );
};

export default StoreLocator; 